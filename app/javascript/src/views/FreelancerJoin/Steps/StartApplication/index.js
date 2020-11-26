import React from "react";
import { Form, Formik } from "formik";
import queryString from "query-string";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router";
import useSteps from "src/hooks/useSteps";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Box, Card, Text, Input, Button } from "@advisable/donut";
import OrbitsBackground from "../../OrbitsBackground";
import validationSchema from "./validationSchema";
import STEPS from "../.";
import Description from "./Description";
import { GET_PROJECT } from "../queries";

export default function StartApplication() {
  const { nextStep } = useSteps(STEPS);
  const history = useHistory();
  const location = useLocation();
  const project_id = queryString.parse(location.search)?.pid;
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: project_id },
  });

  if (project_id && loading) return <>loading</>;
  // Clean query string if pid is wrong
  if (project_id && error) history.replace(history.pathname);

  const initialValues = {
    fullName: "",
    email: "",
  };
  const handleSubmit = () => {
    history.push(nextStep.path);
  };
  return (
    <>
      <OrbitsBackground step={1} />
      <Box as={motion.div} exit py="xl" zIndex={2} position="relative">
        <Card padding="2xl" width={650} marginX="auto">
          <Box mb={8}>
            <Description project={data?.project} />
            {project_id && error && (
              <Text color="red400" pt={2}>
                The project you&apos;ve tried to apply is not available.
              </Text>
            )}
          </Box>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
              <Box mb="m">
                <FormField
                  as={Input}
                  name="fullName"
                  placeholder="Dwight Schrutt"
                  label="Full Name"
                />
              </Box>
              <Box mb="2xl">
                <FormField
                  as={Input}
                  name="email"
                  placeholder="dwight@dundermifflin.com"
                  label="Email"
                />
              </Box>
              <Box display="flex">
                <SubmitButton size="l" variant="dark">
                  Get Started
                </SubmitButton>
                <Box ml="auto" display="flex" flexDirection="column">
                  <Text>Already have an account?</Text>
                  <Button
                    onClick={() => history.push("/login")}
                    size="m"
                    variant="ghost"
                    ml="auto"
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Form>
          </Formik>
        </Card>
      </Box>
    </>
  );
}
