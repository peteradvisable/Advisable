import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { Text, Button, Box } from "@advisable/donut";
import Checkbox from "../../components/Checkbox";
import TextField from "../../components/TextField";
import VALIDATE_PROJECT from "./validateProject";
import createValidationSchema from "./validationSchema";

const VerifyProject = ({ project, match }) => {
  const [validate] = useMutation(VALIDATE_PROJECT);
  const contactName = `${project.contactFirstName} ${project.contactLastName}`;

  const handleSubmit = async values => {
    await validate({
      variables: {
        input: {
          id: match.params.id,
          email: values.email,
        },
      },
    });
  };

  return (
    <>
      <Text
        mb="s"
        as="h2"
        fontSize="xxl"
        color="blue.9"
        lineHeight="xl"
        fontWeight="semibold"
      >
        Verify {project.primarySkill} project with {project.specialist.name}
      </Text>
      <Text size="s" lineHeight="s" mb="l">
        To validate this project, please enter a corporate email address for{" "}
        {contactName} from {project.clientName} or an email address associated
        with the personal LinkedIn account of {contactName}. We'll then send the
        details to this email address for validation.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: "", accept: false }}
        validationSchema={createValidationSchema(project)}
      >
        {formik => (
          <Form>
            <Box mb="s">
              <TextField
                autoFocus
                type="email"
                name="email"
                label="Email Address"
                placeholder="Email Address"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.submitCount > 0 && formik.errors.email}
              />
            </Box>
            <Checkbox
              name="accept"
              value={formik.values.accept}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 && formik.errors.accept}
              label="I consent to be contacted to verify this project at the above email address."
            />
            <Button
              mt="m"
              intent="success"
              appearance="primary"
              loading={formik.isSubmitting}
            >
              Send verification details
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default VerifyProject;
