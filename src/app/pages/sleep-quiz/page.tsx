import type { Metadata } from "next";
import { SleepQuiz } from "@/components/SleepQuiz";

export const metadata: Metadata = {
  title: "Pillow Height Quiz",
  description:
    "Answer four questions to choose a Regular or High CloudAlign contour.",
};

export default function Page() {
  return (
    <main className="quiz-route">
      <div className="quiz-route-copy">
        <span className="route-kicker">Find your contour</span>
        <h1>A better starting height in four questions.</h1>
        <p>
          We use your sleep position, shoulder frame, mattress and current
          pillow habits to suggest Regular or High.
        </p>
      </div>
      <SleepQuiz />
    </main>
  );
}
