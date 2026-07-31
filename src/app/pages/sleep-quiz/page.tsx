import type { Metadata } from "next";
import { SleepQuiz } from "@/components/SleepQuiz";

export const metadata: Metadata = {
  title: "Pillow Height Quiz",
  description:
    "Answer four questions to choose a Regular or High CloudAlign contour.",
};

export default function Page() {
  return (
    <main className="quiz-page-full">
      <section className="quiz-route">
        <div className="quiz-route-copy">
          <span className="route-kicker">Find your contour</span>
          <h1>A better starting height in four questions.</h1>
          <p>
            We use your sleep position, shoulder frame, mattress and current
            pillow habits to suggest Regular or High.
          </p>
          <div className="quiz-measurements">
            <span>
              <strong>Regular</strong>
              8.9 cm contour
            </span>
            <span>
              <strong>High</strong>
              10.9 cm contour
            </span>
          </div>
        </div>
        <SleepQuiz />
      </section>
      <section className="quiz-explainer">
        <img
          src="/assets/gallery/size-guide.png"
          alt="Regular and High CloudAlign contour height guide"
          width="1200"
          height="1200"
        />
        <div>
          <span className="route-kicker">What changes the recommendation?</span>
          <h2>Your shoulder gap matters more than your height alone.</h2>
          <p>
            Side sleepers and broader frames usually need more space between
            the mattress and head. A softer mattress lets the shoulder sink
            further, which can reduce the pillow height needed.
          </p>
          <p>
            The quiz gives a practical starting point rather than a medical
            recommendation. Comfort is personal, so use the result alongside
            your current pillow habits.
          </p>
        </div>
      </section>
    </main>
  );
}
