import React from "react";
import { graphql, Mutation } from "react-apollo";
import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import Back from "src/components/Back";
import Card from "src/components/Card";
import Text from "src/components/Text";
import Divider from "src/components/Divider";
import Spacing from "src/components/Spacing";
import Heading from "src/components/Heading";
import OfferForm from "./components/Form";
import { currencySymbol } from 'src/utilities/currency';
import LoadingCandidates from "../../components/LoadingCandidates";
import FETCH_DATA from "./graphql/fetchData.graphql";
import CREATE_OFFER from "./graphql/createOffer.graphql";

const Offer = ({ match, history, loading, data }) => {
  if (data.loading) return <LoadingCandidates />;
  if (data.error) return null;

  const goBack = () =>
    history.push(`/projects/${match.params.projectID}/introduced`);

  return (
    <div>
      <Spacing bottom="xs" onClick={goBack}>
        <Back />
      </Spacing>
      <Spacing bottom="xs">
        <Heading size="l">
          Offer for {data.project.application.specialist.name}
        </Heading>
      </Spacing>
      <Spacing bottom="xl">
        <Text size="l">{data.project.name}</Text>
      </Spacing>
      <Mutation mutation={CREATE_OFFER}>
        {createOffer => (
          <OfferForm
            onCancel={goBack}
            currency={currencySymbol(data.project.currency)}
            onSubmit={values => {
              createOffer({
                variables: {
                  input: {
                    ...values,
                    rate: Number(values.rate.replace(/[^0-9\.-]+/g, "")),
                    rateLimit: values.rateLimit
                      ? Number(values.rateLimit.replace(/[^0-9\.-]+/g, ""))
                      : null,
                    applicationId: data.project.application.id
                  }
                }
              }).then(goBack);
            }}
            initialValues={{
              type: "Fixed",
              rateType: "Fixed",
              deliverables: [""]
            }}
          />
        )}
      </Mutation>
    </div>
  );
};

export default graphql(FETCH_DATA, {
  options: ({ match }) => ({
    variables: {
      projectID: match.params.projectID,
      applicationID: match.params.applicationID
    }
  })
})(Offer);
