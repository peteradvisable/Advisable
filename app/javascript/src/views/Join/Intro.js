import React, { cloneElement } from "react";
import { Link } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import CandidateIllustration from "src/illustrations/zest/candidate";
import SearchIllustration from "src/illustrations/zest/search";
import GridLines from "src/components/GridLines";
import Card from "./Card";

const optionClasses = composeStyles({
  base: `
    transition-all
    hover:-translate-y-1
    bg-white
    rounded-lg
    w-full
    py-8
    cursor-pointer
    shadow-sm

    flex
    items-center
    flex-row sm:flex-col
  `,
});

function AccountOption({ to, illustration, title, subtext }) {
  return (
    <Link to={to} className="rounded-lg z-10">
      <div className={optionClasses()}>
        <div className="place-items-center w-[148px] h-[148px] mb-6 hidden sm:grid">
          {cloneElement(illustration)}
        </div>
        <div className="sm:text-center flex-1 mb-4">
          <h5 className="text-lg font-medium">{title}</h5>
          <div className="text-[15px] leading-5 text-neutral700">{subtext}</div>
        </div>
      </div>
    </Link>
  );
}

export default function Intro() {
  return (
    <>
      <Card>
        <div className="overflow-hidden relative p-10 pb-32 bg-blue-100 bg-gradient-to-br from-indigo-900 to-violet-900">
          <GridLines color="rgb(255 255 255 / .1)" highlight="#FFFFFF" />
          <div className="relative z-10">
            <h1 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white">
              What kind of account do you want to create?
            </h1>
            <p className="text-lg text-indigo-50 max-w-[400px]">
              Do you want to either explore case studies and hire freelancers or
              be a freelancer?
            </p>
          </div>
        </div>
        <div className="grid grid-flow-col auto-cols-fr px-10 pb-10 gap-8 -mt-24">
          <AccountOption
            title="Client account"
            subtext="Explore and hire"
            to="/join/client"
            illustration={
              <SearchIllustration
                primaryColor="var(--color-rose-200)"
                secondaryColor="var(--color-neutral900)"
              />
            }
          />
          <AccountOption
            title="Freelancer account"
            subtext="Find best clients"
            to="/join/freelancer"
            illustration={
              <CandidateIllustration
                primaryColor="var(--color-teal-300)"
                secondaryColor="var(--color-teal-900)"
              />
            }
          />
        </div>
      </Card>
    </>
  );
}
