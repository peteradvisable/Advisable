import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Text, Button } from "@advisable/donut";
import illustration from "./illustration.png";

const ApplicationSent = ({ match }) => {
  let { applicationId } = match.params;

  return (
    <Box maxWidth={450} mx="auto" py="l" textAlign="center">
      <Card padding={{ _: "xl", m: "xxl" }}>
        <Box mb="l">
          <img
            alt=""
            src={illustration}
            style={{ width: "90%", maxWidth: "300px" }}
          />
        </Box>
        <Text fontSize="xxl" fontWeight="semibold" color="blue.9" mb="xs">
          Application sent!
        </Text>
        <Text lineHeight="m" color="neutral.8" mb="l">
          Your application has been sent. We will let you know when you get a
          response.
        </Text>

        <Text fontSize="xs" lineHeight="s" color="nuetral.6" mb="m">
          In the meantime you can review and update your application.
        </Text>

        <Button
          as={Link}
          variant="subtle"
          to={`/invites/${applicationId}/apply`}
        >
          Update Application
        </Button>
      </Card>
    </Box>
  );
};

export default ApplicationSent;
