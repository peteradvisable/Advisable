// Loads the empty state for the manage talent view
import React from "react";
import { Box, Text } from "@advisable/donut";
import illustration from "./illustration.png";

export default function ActiveTalentEmpty() {
  return (
    <div style={{ textAlign: "center" }}>
      <Box py="xl">
        <img src={illustration} width={250} alt="" />
      </Box>
      <div style={{ maxWidth: 460, margin: "0 auto" }}>
        <Text fontWeight="semibold" color="neutral800" mb="xs">
          No active bookings
        </Text>
        <Text fontSize="s" mb="l" lineHeight="s" color="neutral700">
          It looks like you haven&apos;t hired any freelancers yet. Once you
          start a project with a freelancer you will be able to manage their
          work from here.
        </Text>
      </div>
    </div>
  );
}
