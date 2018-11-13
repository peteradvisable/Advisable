import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import PaymentDetails from "./PaymentDetails";
import validationSchema from "./validationSchema";
import { Total, Label, Amount } from "./styles";

function Deposit({ match, history }) {
  const [stripe, setStripe] = useState(null);
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        console.log("loaded");
        setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
      });
    }
  }, []);

  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/terms`);

  return (
    <div>
      <Text>
        In order to begin recruitment on a project, we ask for a security
        deposit. This deposit is fully-refundable if you choose not to go ahead
        with the project and deductible from your first payment to the
        freelancer if you do go ahead with it.
      </Text>
      <Total>
        <Amount>€100</Amount>
        <Label>Total</Label>
      </Total>
      <Formik onSubmit={values => {}} validationSchema={validationSchema}>
        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <StripeProvider stripe={stripe}>
              <Elements>
                <PaymentDetails />
              </Elements>
            </StripeProvider>
            <ButtonGroup>
              <Button type="button" styling="outlined" size="l" onClick={goBack}>
              Back
              </Button>
              <Button type="submit" size="l" styling="primary">
                Continue
              </Button>
            </ButtonGroup>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Deposit;
