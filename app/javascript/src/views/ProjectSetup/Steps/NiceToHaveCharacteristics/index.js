import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Button, Text } from "@advisable/donut";
import BulletPointInput from "components/BulletPointInput";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function NiceToHaveCharacteristics({ project, match, history }) {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/must_have`);

  useEffect(() => {
    if (project.requiredCharacteristics.length === 0) {
      history.replace("must_have");
    }
  }, [history, project.requiredCharacteristics]);

  return (
    <Fragment>
      <Text marginBottom="l">
        Please list any skills and experience that would be an added bonus for
        candidates to have, but are not required
      </Text>
      <Formik
        initialValues={{
          characteristics: project.optionalCharacteristics,
        }}
        onSubmit={async (values) => {
          const id = match.params.projectID;
          await mutate({
            variables: {
              input: {
                id,
                ...values,
              },
            },
          });
          history.push(`/project_setup/${id}/questions`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <BulletPointInput
              marginBottom="xl"
              name="optionalCharacteristics"
              value={formik.values.characteristics}
              placeholder="+ Add a characteristic"
              error={formik.submitCount > 0 && formik.errors.characteristics}
              onChange={(characteristics) =>
                formik.setFieldValue("characteristics", characteristics)
              }
            />
            <Button
              mr="xs"
              type="button"
              size="l"
              variant="subtle"
              onClick={goBack}
            >
              Back
            </Button>
            <Button size="l" type="submit" loading={formik.isSubmitting}>
              Continue
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}
