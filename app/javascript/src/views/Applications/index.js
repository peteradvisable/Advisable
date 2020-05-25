// Renders the freelancers applications view.
import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Box, Alert } from "@advisable/donut";
import { useQuery } from "@apollo/react-hooks";
import { RefreshCcw } from "@styled-icons/feather";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import FETCH_DATA from "./fetchData";
import AccountOnHold from "./AccountOnHold";
import OpenApplications from "./OpenApplications";
import ApplicationInvitations from "./ApplicationInvitations";

const Applications = () => {
  const history = useHistory();
  const { loading, data } = useQuery(FETCH_DATA);

  if (loading) return <Loading />;

  const viewer = data.viewer;
  const onHold = viewer.applicationStage === "On Hold";
  const fullApplicationPending = viewer.applicationStage === "Full Application";

  const invitations = viewer.applications.filter(
    (a) => a.status === "Invited To Apply",
  );
  const applications = viewer.applications.filter(
    (a) => a.status !== "Invited To Apply",
  );
  const hasInvitations = invitations.length > 0;

  if (hasInvitations && (onHold || fullApplicationPending)) {
    return <Redirect to={`/invites/${invitations[0].id}`} />;
  }

  if (onHold && invitations.length === 0) {
    return <AccountOnHold />;
  }

  if (fullApplicationPending) {
    return <Redirect to="/apply" />;
  }

  const handleViewInvitation = (id) => {
    history.push(`/invites/${id}`);
  };

  return (
    <Layout>
      <Layout.Main>
        {onHold && (
          <Box mb="l">
            <Alert
              mb="m"
              icon={<RefreshCcw />}
              title="Your account is currently on hold"
            >
              We evaluate and accept freelancers as they apply for projects.
            </Alert>
          </Box>
        )}
        <ApplicationInvitations
          onHold={onHold}
          loading={loading}
          onViewInvitation={handleViewInvitation}
          applications={loading ? [] : invitations}
        />
        <OpenApplications
          onHold={onHold}
          loading={loading}
          specialist={viewer}
          applications={loading ? [] : applications}
          featuredURL={
            loading
              ? null
              : encodeURI(
                  `https://advisable.com/request_feature_invitation?field75221875=${viewer.email}&sid=${viewer.airtableId}`,
                )
          }
        />
      </Layout.Main>
    </Layout>
  );
};

export default Applications;
