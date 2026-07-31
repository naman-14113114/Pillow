create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  plusbase_order_id text unique not null,
  order_number text unique not null,
  customer_email text not null,
  customer_id uuid references auth.users(id) on delete set null,
  financial_status text,
  fulfilment_status text,
  tracking_number text,
  tracking_url text,
  currency text not null default 'GBP',
  total_cents integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_email text,
  selection jsonb not null,
  attribution jsonb not null default '{}'::jsonb,
  plusbase_checkout_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  media jsonb not null default '[]'::jsonb,
  source_name text not null,
  source_review_id text,
  is_verified_juujo_purchase boolean not null default false,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.checkout_sessions enable row level security;
alter table public.reviews enable row level security;

create policy "profiles own read"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles own update"
on public.profiles for update
using (auth.uid() = id);

create policy "profiles own insert"
on public.profiles for insert
with check (auth.uid() = id);

create policy "orders own read"
on public.orders for select
using (
  auth.uid() = customer_id
  or lower(customer_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

create policy "checkout sessions own read"
on public.checkout_sessions for select
using (
  auth.uid() = customer_id
  or lower(customer_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

create policy "reviews public approved read"
on public.reviews for select
using (status = 'approved');

create policy "reviews signed in create"
on public.reviews for insert
with check (auth.uid() = customer_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, coalesce(new.email, ''), new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
