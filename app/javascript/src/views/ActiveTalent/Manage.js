import React from "react";
import { filter } from "lodash";
import { Text, Tabs } from "@advisable/donut";
import TalentCard from "./TalentCard";
import { Cards } from "./styles";
import Empty from "./Empty";
import EmptyState from "../../components/EmptyState";

export default ({ onClick, applications }) => {
  const active = filter(applications, { status: "Working" });
  const finished = filter(applications, { status: "Stopped Working" });

  return (
    <>
      <Text
        as="h1"
        mb="m"
        fontSize="xxl"
        color="neutral.8"
        fontWeight="semibold"
        letterSpacing="-0.03em"
      >
        Manage Talent
      </Text>
      <Tabs>
        <Tabs.Tab title="Active Talent">
          <Cards>
            {active.map(application => (
              <TalentCard
                key={application.id}
                application={application}
                onClick={() => onClick(application)}
              />
            ))}
            {active.length === 0 && <Empty />}
          </Cards>
        </Tabs.Tab>
        <Tabs.Tab title="Finished">
          <Cards>
            {finished.map(application => (
              <TalentCard
                key={application.id}
                application={application}
                onClick={() => onClick(application)}
              />
            ))}
            {finished.length === 0 && (
              <EmptyState
                heading="No finished projects"
                text="You have not finished working with any specialists yet. Once you do they will show up here."
              />
            )}
          </Cards>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
