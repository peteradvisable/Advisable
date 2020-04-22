import React from "react";
import { get } from "lodash-es";
import { useQuery } from "@apollo/react-hooks";
import Loading from "./Loading";
import JobListing from "./JobListing";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import GET_APPLICATION from "./fetchProject";

let JobListingContainer = ({ history, match }) => {
  const { loading, data, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: match.params.applicationId,
    },
  });

  if (loading) return <Loading />;

  if (error) {
    const code = get(error, "graphQLErrors[0].extensions.code");
    if (code === "recordNotFound") {
      return <NotFound />;
    }
  }

  const open = get(data, "application.project.applicationsOpen");
  if (!open) return <ApplicationsClosed />;

  return <JobListing history={history} application={data.application} />;
};

export default JobListingContainer;
