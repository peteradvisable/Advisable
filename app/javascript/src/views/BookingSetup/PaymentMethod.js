import React from "react";
import { ArrowRight } from "@styled-icons/feather";
import { object, string } from "yup";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import useViewer from "src/hooks/useViewer";
import {
  Card,
  Box,
  Text,
  Radio,
  RadioGroup,
  Button,
  Paragraph,
  Link,
} from "@advisable/donut";
import UPDATE_PAYMENT_METHOD from "./updateProjectPaymentMethod";
import RequiresTeamManager from "./RequiresTeamManager";

const validationSchema = object({
  paymentMethod: string().required("Please select a payment method"),
});

const PaymentMethod = ({ data }) => {
  const viewer = useViewer();
  const history = useHistory();

  const [updatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);
  const specialist = data.application.specialist;

  const initialValues = {
    paymentMethod: data.viewer.projectPaymentMethod || "",
  };

  const handleSubmit = async (values) => {
    await updatePaymentMethod({
      variables: {
        input: {
          paymentMethod: values.paymentMethod,
        },
      },
    });

    if (values.paymentMethod === "Bank Transfer") {
      history.push(`/book/${data.application.id}/invoice_settings`);
      return;
    }

    history.push(`/book/${data.application.id}/card_details`);
  };

  if (!viewer.isTeamManager) {
    return <RequiresTeamManager data={data} />;
  }

  return (
    <Card>
      <Box padding="xl">
        <Text
          mb="2xs"
          fontSize="4xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Setup Payments
        </Text>
        <Paragraph fontSize="lg" marginBottom="sm">
          It look’s like you haven’t added a project payment method yet
        </Paragraph>
        <Paragraph marginBottom="xl">
          Before you start working with {specialist.firstName}, we need to know
          how to collect payment for them. Please select your preferred project
          payment method below.
        </Paragraph>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <RadioGroup mb="xl">
                <Field
                  as={Radio}
                  type="radio"
                  name="paymentMethod"
                  label="Payments with Card"
                  value="Card"
                  description="We will collect payment by charging your card"
                />
                <Field
                  as={Radio}
                  type="radio"
                  name="paymentMethod"
                  label="Pay via bank transfer"
                  value="Bank Transfer"
                  disabled={!data.viewer.bankTransfersEnabled}
                  description="We will collect payment via invoice"
                />
              </RadioGroup>
              {!data.viewer.bankTransfersEnabled && (
                <Text fontSize="sm" color="neutral700" mb="l" lineHeight="s">
                  Please contact{" "}
                  <Link.External href="mailto:payments@advisable.com">
                    payments@advisable.com
                  </Link.External>{" "}
                  to enable bank transfers for larger payments.
                </Text>
              )}
              {formik.errors.paymentMethod ? (
                <Text color="red600" mb="l">
                  {formik.errors.paymentMethod}
                </Text>
              ) : undefined}
              <Button
                size="l"
                type="submit"
                suffix={<ArrowRight />}
                loading={formik.isSubmitting}
              >
                Continue
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default PaymentMethod;
