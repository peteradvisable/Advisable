import React from "react";
import notFound from "src/illustrations/not_found.svg";
import { Box, Text } from "@advisable/donut";

export default function NotFound() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={6}>
        <img src={notFound} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        Page not found
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        We couldn&apos;t find the page you were looking for.
      </Text>
    </Box>
  );
}
