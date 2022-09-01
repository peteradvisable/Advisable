import React, { cloneElement } from "react";
import { Link } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import CandidateIllustration from "src/illustrations/zest/candidate";
import SearchIllustration from "src/illustrations/zest/search";
import Card from "./Card";

const optionClasses = composeStyles({
  base: `
    transition-all
    shadow-xl hover:shadow-2xl
    hover:-translate-y-1
    bg-white
    rounded-lg
    p-5 md:p-8
    cursor-pointer

    flex
    items-center
    flex-row md:flex-col
    gap-2
  `,
});

function AccountOption({ illustration, title, subtext }) {
  return (
    <div className={optionClasses()}>
      <div className="place-items-center w-[150px] h-[180px] hidden md:grid">
        {cloneElement(illustration)}
      </div>
      <div className="md:text-center flex-1">
        <h5 className="text-lg font-medium">{title}</h5>
        <div className="text-[15px] text-neutral700">{subtext}</div>
      </div>
    </div>
  );
}

export default function Intro() {
  return (
    <Card>
      <h2 className="font-semibold text-2xl md:text-3xl tracking-tight leading-none mb-4 text-blue900 max-w-[480px]">
        What kind of account do you want to create?
      </h2>
      <div className="flex gap-8 justify-center">
        <Link to="/join/client" className="rounded-lg">
          <AccountOption
            title="Client"
            subtext="Explore and hire"
            illustration={
              <SearchIllustration
                primaryColor="var(--color-rose-200)"
                secondaryColor="var(--color-neutral900)"
              />
            }
          />
        </Link>
        <Link to="/join/freelancer" className="rounded-lg">
          <AccountOption
            title="Freelancer"
            subtext="Create case studies"
            illustration={
              <CandidateIllustration
                primaryColor="var(--color-teal-300)"
                secondaryColor="var(--color-teal-900)"
              />
            }
          />
        </Link>
      </div>
    </Card>
  );
}