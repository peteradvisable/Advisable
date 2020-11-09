import React from "react";
import { gql } from "@apollo/client";
import { Text, Card, Button, Box } from "@advisable/donut";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";
import PaymentMethod from "../../components/PaymentMethod";
import UpdatePaymentMethod from "../../components/UpdatePaymentMethod";

export const GET_PAYMENT_METHOD = gql`
  query paymentMethod {
    viewer {
      ... on User {
        id
        paymentMethod {
          last4
          brand
          expMonth
          expYear
        }
      }
    }
  }
`;

const CardDetails = ({ nextStep }) => {
  const [newCard, setNewCard] = React.useState(false);
  const paymentMethodQuery = useQuery(GET_PAYMENT_METHOD);

  if (paymentMethodQuery.loading) return <Loading />;

  if (paymentMethodQuery.data.viewer.paymentMethod && newCard === false) {
    return (
      <Card padding="l">
        <Text
          mb="xs"
          fontSize="xxl"
          color="neutral800"
          fontWeight="bold"
          letterSpacing="-0.02em"
        >
          Payment Method
        </Text>
        <Text color="neutral700" lineHeight="s" mb="l">
          Would you like to use your existing card details or add a new card?
        </Text>
        <Box mb="l">
          <PaymentMethod
            paymentMethod={paymentMethodQuery.data.viewer.paymentMethod}
          />
        </Box>
        <Button
          size="l"
          variant="subtle"
          width="100%"
          mb="xs"
          onClick={() => setNewCard(true)}
        >
          Add a new card
        </Button>
        <Button type="button" size="l" width="100%" onClick={nextStep}>
          Continue with this card
        </Button>
      </Card>
    );
  }

  return (
    <Card padding="xl">
      <Text
        mb="m"
        fontSize="4xl"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Add payment method
      </Text>
      <UpdatePaymentMethod
        onSuccess={() => {
          nextStep();
        }}
      />
    </Card>
  );
};

export default CardDetails;
