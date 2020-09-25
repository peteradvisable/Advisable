import React from "react";
import { get } from "lodash-es";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import JobOpportunity from "./JobOpportunity";
import NotFound from "../NotFound";
import ApplicationsClosed from "../ApplicationsClosed";
import { GET_APPLICATION } from "./queries";

let JobOpportunityContainer = ({ history, match }) => {
  const { loading, data, error } = useQuery(GET_APPLICATION, {
    variables: {
      id: match.params.projectId,
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

  return <JobOpportunity history={history} application={data.application} />;
};

export default JobOpportunityContainer;
