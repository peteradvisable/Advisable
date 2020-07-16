import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ArrowRight } from "@styled-icons/feather";
import { Formik, Form, Field } from "formik";
import { Text, Error } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import BulletPointInput from "components/BulletPointInput";
import { UPDATE_PROJECT } from "./queries";
import { JobSetupStepHeader, JobSetupStepSubHeader } from "./styles";

export default function JobDescription({ data }) {
  const { id } = useParams();
  const history = useHistory();
  const [updateProject] = useMutation(UPDATE_PROJECT);

  const initialValues = {
    goals: data.project.goals,
  };

  const handleSubmit = async (values, formik) => {
    const response = await updateProject({
      variables: {
        input: {
          id,
          ...values,
        },
      },
    });

    if (response.errors) {
      formik.setStatus("Failed to update description, please try again.");
    } else {
      history.push(`/jobs/${id}/location`);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <JobSetupStepHeader mb="xs">
            Briefly describe the projects you need them to work on?
          </JobSetupStepHeader>
          <JobSetupStepSubHeader mb="l">
            This is to give the freelancer an idea of what they will be working
            on. You will be able to define more in depth tasks once you start
            working together.
          </JobSetupStepSubHeader>
          <Field
            name="goals"
            as={BulletPointInput}
            marginBottom="l"
            placeholder="e.g Building a Facebook advertising campaign for launching our new product"
            onChange={(items) => formik.setFieldValue("goals", items)}
          />
          <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          {formik.status && <Error marginTop="m">{formik.status}</Error>}
        </Form>
      )}
    </Formik>
  );
}
