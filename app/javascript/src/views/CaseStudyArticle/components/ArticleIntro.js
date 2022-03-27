import React from "react";

const NUM_TO_WORD = ["first", "second", "third", "fourth", "fifth", "sixth"];

function Achievements({ caseStudy }) {
  const achievements = caseStudy.sections
    .find((s) => s.type === "outcome")
    .contents.find((c) => c.__typename === "Results").results;
  return (
    <div>
      {achievements.map((achievement, index) => (
        <div
          key={`achievement-${index}`}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-3xl">{index + 1}</span>
          <div>
            <span className="text-xs font-semibold  uppercase">
              {NUM_TO_WORD[index]} achievement
            </span>
            <p className="text-xl">{achievement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArticleIntro({ caseStudy }) {
  return (
    <div>
      <h1 className="text-5xl font-extrabold">{caseStudy.title}</h1>
      <Achievements caseStudy={caseStudy} />
    </div>
  );
}