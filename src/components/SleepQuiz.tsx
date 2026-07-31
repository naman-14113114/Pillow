"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BedDouble, Check } from "lucide-react";
import { useMemo, useState } from "react";

const questions = [
  {
    question: "How do you spend most of the night?",
    options: [
      ["side", "Mostly on my side", 2],
      ["back", "Mostly on my back", 0],
      ["mixed", "I change position", 1],
    ],
  },
  {
    question: "How would you describe your shoulder frame?",
    options: [
      ["small", "Smaller or narrower", 0],
      ["average", "Average", 1],
      ["broad", "Broad", 2],
    ],
  },
  {
    question: "What kind of mattress do you use?",
    options: [
      ["soft", "Soft, I sink in", 0],
      ["medium", "Medium", 1],
      ["firm", "Firm, I stay on top", 2],
    ],
  },
  {
    question: "What do you do with your current pillow?",
    options: [
      ["fold", "Fold or stack it", 2],
      ["fine", "Keep it as it is", 1],
      ["remove", "Sometimes remove it", 0],
    ],
  },
] as const;

export function SleepQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const finished = step >= questions.length;
  const score = useMemo(
    () => Object.values(answers).reduce((total, value) => total + value, 0),
    [answers],
  );
  const result = score >= 5 ? "High" : "Regular";

  if (finished) {
    return (
      <div className="quiz-result">
        <span>
          <Check />
        </span>
        <p className="route-kicker">Your suggested contour</p>
        <h2>{result}</h2>
        <p>
          {result === "High"
            ? "Your answers suggest that extra shoulder clearance may feel more natural."
            : "Your answers suggest that a lower, gentler contour may be the better starting point."}
        </p>
        <Link
          className="primary-button"
          href={`/products/juujo-cloudalign-pillow?height=${result.toLowerCase()}`}
        >
          Shop {result} <ArrowRight />
        </Link>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            setAnswers({});
            setStep(0);
          }}
        >
          Retake quiz
        </button>
      </div>
    );
  }

  const current = questions[step];
  return (
    <div className="quiz-card">
      <div className="quiz-progress">
        <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>
      <BedDouble aria-hidden="true" />
      <p className="route-kicker">
        Question {step + 1} of {questions.length}
      </p>
      <h2>{current.question}</h2>
      <div className="quiz-options">
        {current.options.map(([id, label, value]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setAnswers((currentAnswers) => ({
                ...currentAnswers,
                [step]: value,
              }));
              setStep((currentStep) => currentStep + 1);
            }}
          >
            {label} <ArrowRight />
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          className="quiz-back"
          type="button"
          onClick={() => setStep((currentStep) => currentStep - 1)}
        >
          <ArrowLeft /> Previous
        </button>
      )}
    </div>
  );
}
