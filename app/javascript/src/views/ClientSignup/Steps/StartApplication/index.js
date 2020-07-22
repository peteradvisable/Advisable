import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import queryString from "query-string";
import { useStartClientApplication } from "../../queries";
import { Formik, Form } from "formik";
import { useLocation, useHistory, Redirect } from "react-router";
import SubmitButton from "../../../../components/SubmitButton";
import FormField from "src/components/FormField";
import { Text, Input, Stack } from "@advisable/donut";
import Loading from "../../../../components/Loading";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Provide your First Name, please."),
  lastName: Yup.string(),
  email: Yup.string().email().required("Provide your email, please."),
});

function StartApplication({ RedirectToNextStep }) {
  const [startClientApplication, { error, data }] = useStartClientApplication();
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState();

  // Check query params
  useEffect(() => {
    const queryStringParams =
      location.search && queryString.parse(location.search, { decode: true });
    queryStringParams &&
      validationSchema
        .validate(queryStringParams)
        .then(() => {
          // Valid query params. Start client application
          startClientApplication({ variables: { ...queryStringParams } });
          setEmail(queryStringParams.email);
        })
        .catch((err) => {
          // Not valid query string params. Clear them
          console.error("Your query params are not valid", err);
          history.push(location.pathname);
        });
  }, [history, location.pathname, location.search, startClientApplication]);

  // Loading while handling query string
  if (location.search) return <Loading />;
  // Handle mutation errors
  if (error) return <Redirect to="/login" />;
  // Handle mutation data on response
  if (data) {
    const applicationId = data.startClientApplication.clientApplication.id;
    return <RedirectToNextStep state={{ applicationId, email }} />;
  }

  // Formik
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const handleSubmit = (values) => {
    startClientApplication({ variables: { ...values } });
    setEmail(values.email);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <>
          <Text
            as="h2"
            mb="m"
            color="blue.8"
            fontSize="xxxl"
            lineHeight="xxxl"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            Start your application
          </Text>
          <Form>
            <Stack spacing="m" mb="l">
              <FormField
                as={Input}
                name="firstName"
                placeholder="First Name"
                label="First Name"
              />
              <FormField
                as={Input}
                name="lastName"
                placeholder="Last Name"
                label="Last Name"
              />
              <FormField
                as={Input}
                name="email"
                placeholder="ospencer@umbrellacorp.com"
                label="Email"
              />
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

StartApplication.propTypes = {
  RedirectToNextStep: PropTypes.elementType,
};

export default StartApplication;
