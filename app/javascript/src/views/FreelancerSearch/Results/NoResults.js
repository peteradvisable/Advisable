import React from "react";
import RequestCallButton from "../RequestCallButton";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { Circle, Box, Text, Icon, RoundedButton } from "@advisable/donut";

const NoResults = () => {
  const location = useLocation();

  return (
    <Box textAlign="center" maxWidth={500} mx="auto">
      <Circle mb="m" bg="blue.1" size={60}>
        <Icon icon="search" color="blue.7" />
      </Circle>
      <Text fontSize="l" fontWeight="semibold" mb="xs">
        No results
      </Text>
      <Text mb="m" lineHeight="m" fontSize="s" color="neutral.8">
        We couldn't find any "{location.state.search.skill}" freelancers. Make
        another search or request a call with an Advisable project manager and
        we’ll identify the perfect person for you.
      </Text>
      <RoundedButton
        mr="s"
        as={RouterLink}
        variant="secondary"
        to="/freelancer_search"
        prefix={<Icon icon="search" />}
      >
        Make another search
      </RoundedButton>
      <RequestCallButton>Request a call</RequestCallButton>
    </Box>
  );
};

export default NoResults;
