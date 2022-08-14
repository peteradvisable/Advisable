import React from "react";
import { Helmet } from "react-helmet";
import StickyBox from "react-sticky-box";
import { useLocation, useNavigate } from "react-router-dom";
import { useBackground, useModal } from "@advisable/donut";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import NotFound, { isNotFound } from "src/views/NotFound";
import ArticleContent from "./components/ArticleContent";
import ArticleEvents from "./components/ArticleEvents";
import Footer from "src/components/Footer";
import CompanyDetails from "./components/CompanyDetails";
import Results from "./components/Results";
import SpecialistSection from "./components/SpecialistSection";
import KeyTakeaways from "./components/KeyTakeaways";
import FavoriteArticleButton from "src/views/Feed/components/FavoriteArticleButton";
import ShareArticleButton from "./components/ShareArticleButton";
import EditCaseStudyButton from "./components/EditCaseStudyButton";
import CircularButton from "src/components/CircularButton";
import ConnectModal from "src/components/ConnectModal";
import { X } from "@styled-icons/heroicons-solid";
import { useArticle } from "./queries";
import ScrollIndicator from "./components/ScrollIndicator";
import SpecialistBar from "./components/SpecialistBar";

export default function CaseStudyArticle() {
  useBackground("beige");
  const { data, loading, error } = useArticle();
  const location = useLocation();
  const navigate = useNavigate();
  const { backgroundLocation } = location.state || {};
  const contactModal = useModal();

  if (loading && !data) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const article = data?.caseStudy;
  const { specialist } = article;

  return (
    <ErrorBoundary>
      {data?.caseStudy && (
        <Helmet>
          <title>Advisable | {data.caseStudy?.title}</title>
        </Helmet>
      )}
      {data?.caseStudy && <ArticleEvents article={data?.caseStudy} />}
      <div className="z-10 rounded-full bg-white absolute right-3 top-3 inline-flex gap-2 p-2">
        <ScrollIndicator />
        <EditCaseStudyButton article={data.caseStudy} />
        <ShareArticleButton slug={data.caseStudy.slug} />
        <FavoriteArticleButton article={data.caseStudy} />
        {backgroundLocation && (
          <CircularButton
            aria-label="Close modal"
            icon={X}
            onClick={() => navigate(backgroundLocation)}
          />
        )}
      </div>
      <ConnectModal
        modal={contactModal}
        specialist={specialist}
        article={article}
      />
      <div className="flex mx-auto w-full xl:max-w-[1320px] pb-36 px-6 lg:px-10 xl:px-14">
        <div className="hidden lg:block min-w-[272px] w-[272px] xl:min-w-[348px] xl:w-[348px] pt-12 pr-6 xl:pr-12">
          <StickyBox offsetTop={60} offsetBottom={60}>
            <SpecialistSection article={data.caseStudy} modal={contactModal} />
          </StickyBox>
        </div>
        <div className="lg:pl-6 xl:pl-12 py-20 relative w-full border-solid border-neutral100 lg:border-l">
          <SpecialistBar
            modal={contactModal}
            specialist={data.caseStudy.specialist}
          />
          <h1 className="text-3xl md:text-4xl font-serif font-[800] tracking-tight text-blue900 mb-4 max-w-[720px]">
            {data.caseStudy.title}
          </h1>
          <div className="md:flex gap-14">
            <div>
              <p className="leading-7 text-neutral900 mb-10">
                {data.caseStudy.subtitle}
              </p>
              <KeyTakeaways insights={data.caseStudy.insights} />
            </div>
            <div className="md:w-[280px] shrink-0 pt-2">
              <Results results={data.caseStudy.resultsContent?.results} />
              <CompanyDetails caseStudy={data.caseStudy} />
            </div>
          </div>
          <hr className="my-16" id="article-content-start" />
          {loading ? (
            <Loading />
          ) : (
            <ArticleContent caseStudy={data.caseStudy} />
          )}
        </div>
      </div>
      <Footer />
    </ErrorBoundary>
  );
}