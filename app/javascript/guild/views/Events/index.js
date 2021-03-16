import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Text, Box, Button, Stack, useModal } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import BottomScrollListener from "react-bottom-scroll-listener";
import { Plus } from "@styled-icons/heroicons-outline";
import { EVENTS_QUERY } from "./queries.js";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import FeaturedEvent from "./components/FeaturedEvent";
import EventsList from "./components/EventsList";
import Loading from "./components/Loading";
import NoResults from "@guild/components/NoResults";
import FormstackModal from "./components/FormstackModal";

const Events = () => {
  const modal = useModal();
  const viewer = useViewer();
  const history = useHistory();
  const historyPopped = history.action === "POP";

  const { data, loading, fetchMore } = useQuery(EVENTS_QUERY, {
    fetchPolicy: historyPopped ? "cache-first" : "network-only",
    nextFetchPolicy: historyPopped ? "cache-first" : "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });
  const hasNextPage = data?.events.pageInfo.hasNextPage || false;
  const endCursor = data?.events.pageInfo.endCursor;
  const events = data?.events.edges.map((e) => e.node) || [];

  const [featuredEvent, ...latestEvents] = events;

  const onReachedBottom = () => {
    if (!loading && hasNextPage) {
      fetchMore({ variables: { cursor: endCursor } });
    }
  };

  const handleCreateEvent = () => modal.show();

  return (
    <ErrorBoundary>
      <BottomScrollListener
        onBottom={onReachedBottom}
        debounce={0}
        offset={80}
      />

      <Box
        mx="auto"
        mt="9"
        paddingX={{ _: "3" }}
        maxWidth={["100%", "100%", "1056px"]}
      >
        <Stack spacing="xl">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Text fontSize="4xl" color="neutral900">
              Events
            </Text>
            <Button
              fontWeight="medium"
              prefix={<Plus />}
              aria-label="Create Event"
              onClick={handleCreateEvent}
              css={`
                background-color: #234ee4;
              `}
            >
              Create Event
            </Button>
          </Box>

          {loading && !events.length ? <Loading /> : null}
          {featuredEvent && <FeaturedEvent event={featuredEvent} />}
          <EventsList events={latestEvents} />
        </Stack>

        {!loading && events.length > 0 && !hasNextPage ? (
          <Box py="12" textAlign="center">
            <Text color="neutral500">
              You have reached the end of the events list.
            </Text>
          </Box>
        ) : null}

        {!loading && events.length === 0 && (
          <NoResults message="There are no upcoming Events" />
        )}
      </Box>
      <FormstackModal
        modal={modal}
        label="Create Event"
        src={`https://advisable.formstack.com/forms/guild_event_form?id=${viewer.id}`}
      />
    </ErrorBoundary>
  );
};

export default Events;
