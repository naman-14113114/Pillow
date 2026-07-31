import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { AccountActions } from "@/components/AccountActions";
import { IntegrationPage } from "@/components/IntegrationPage";
import { formatMoney } from "@/data/store";
import {
  createSupabaseAdmin,
  createSupabaseServer,
  getAdminEmails,
  isSupabaseConfigured,
} from "@/lib/supabase-server";

type AccountMode = "profile" | "settings" | "orders" | "admin";

type ProfileRow = {
  full_name: string | null;
  phone: string | null;
};

type OrderRow = {
  id: string;
  order_number: string;
  customer_email: string;
  financial_status: string | null;
  fulfilment_status: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  currency: string;
  total_cents: number;
  created_at: string;
};

const stagingCopy: Record<AccountMode, [string, string, string]> = {
  profile: [
    "Your profile",
    "Your Juujo details.",
    "Manage your customer profile and connect eligible PlusBase orders to the same email address.",
  ],
  settings: [
    "Account settings",
    "Privacy and sign-in controls.",
    "Update account details and sign-in preferences after Juujo Supabase is connected.",
  ],
  orders: [
    "Order history",
    "Every Juujo order in one place.",
    "Paid PlusBase orders will be mirrored securely and matched to the customer account email.",
  ],
  admin: [
    "Juujo admin",
    "Orders, customers and support.",
    "This route requires a signed-in email listed in ADMIN_EMAILS before customer or order data is displayed.",
  ],
};

const accountPaths: Record<AccountMode, string> = {
  profile: "/my-profile",
  settings: "/account-settings",
  orders: "/order-history",
  admin: "/admin",
};

function OrderTable({ orders, admin = false }: { orders: OrderRow[]; admin?: boolean }) {
  if (!orders.length) {
    return (
      <div className="account-empty-state">
        <strong>No orders found.</strong>
        <span>Orders appear here after a PlusBase webhook has been verified and mirrored.</span>
      </div>
    );
  }

  return (
    <div className="account-order-table" role="region" aria-label="Juujo orders">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            {admin && <th>Customer</th>}
            <th>Date</th>
            <th>Payment</th>
            <th>Fulfilment</th>
            <th>Total</th>
            <th>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.order_number}</td>
              {admin && <td>{order.customer_email}</td>}
              <td>
                {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                  new Date(order.created_at),
                )}
              </td>
              <td>{order.financial_status || "Pending"}</td>
              <td>{order.fulfilment_status || "Unfulfilled"}</td>
              <td>{formatMoney(order.total_cents)}</td>
              <td>
                {order.tracking_url ? (
                  <a href={order.tracking_url} rel="noopener noreferrer">
                    {order.tracking_number || "Track"}
                  </a>
                ) : (
                  "Pending"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function AccountDashboard({ mode }: { mode: AccountMode }) {
  const [eyebrow, title, description] = stagingCopy[mode];

  if (!isSupabaseConfigured()) {
    return (
      <IntegrationPage eyebrow={eyebrow} title={title} description={description} />
    );
  }

  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    redirect(`/sign-in?next=${encodeURIComponent(accountPaths[mode])}`);
  }

  if (mode === "admin") {
    if (!getAdminEmails().includes(user.email.toLowerCase())) {
      return (
        <main className="route-shell integration-page">
          <ShieldAlert aria-hidden="true" />
          <span className="route-kicker">Restricted route</span>
          <h1>Administrator access required.</h1>
          <p>This signed-in account is not listed in the Juujo admin allowlist.</p>
          <Link className="primary-button" href="/my-profile">
            Return to profile <ArrowRight />
          </Link>
        </main>
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return (
        <IntegrationPage
          eyebrow={eyebrow}
          title={title}
          description="Admin identity is verified. Order access activates when the server-only Supabase service role key is connected."
        />
      );
    }

    const admin = createSupabaseAdmin();
    const { data } = await admin
      .from("orders")
      .select(
        "id,order_number,customer_email,financial_status,fulfilment_status,tracking_number,tracking_url,currency,total_cents,created_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);

    return (
      <main className="route-shell account-dashboard">
        <span className="route-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>Showing the latest verified mirrored orders. PlusBase remains the payment authority.</p>
        <OrderTable orders={(data || []) as OrderRow[]} admin />
      </main>
    );
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("full_name,phone")
    .eq("id", user.id)
    .maybeSingle();
  const profile = (profileData || {}) as Partial<ProfileRow>;

  if (mode === "settings") {
    return (
      <main className="route-shell account-dashboard">
        <span className="route-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <AccountActions
          userId={user.id}
          email={user.email}
          initialName={profile.full_name || ""}
          initialPhone={profile.phone || ""}
        />
      </main>
    );
  }

  if (mode === "orders") {
    const { data } = await supabase
      .from("orders")
      .select(
        "id,order_number,customer_email,financial_status,fulfilment_status,tracking_number,tracking_url,currency,total_cents,created_at",
      )
      .order("created_at", { ascending: false });

    return (
      <main className="route-shell account-dashboard">
        <span className="route-kicker">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <OrderTable orders={(data || []) as OrderRow[]} />
      </main>
    );
  }

  return (
    <main className="route-shell account-dashboard">
      <span className="route-kicker">{eyebrow}</span>
      <h1>{profile.full_name || "Your Juujo account"}</h1>
      <p>{user.email}</p>
      <div className="account-summary-grid">
        <div>
          <span>Name</span>
          <strong>{profile.full_name || "Not set"}</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>{profile.phone || "Not set"}</strong>
        </div>
        <div>
          <span>Order matching</span>
          <strong>Matched by account email</strong>
        </div>
      </div>
      <div className="account-dashboard-actions">
        <Link className="primary-button" href="/order-history">
          View orders <ArrowRight />
        </Link>
        <Link className="secondary-button" href="/account-settings">
          Account settings
        </Link>
      </div>
    </main>
  );
}
