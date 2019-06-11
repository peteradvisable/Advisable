// Renders the sidebar in the freelancer active application view.
import React from "react";
import Sticky from "react-stickynode";
import { useTranslation } from "react-i18next";
import Back from "../../components/Back";
import Text from "../../components/Text";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Padding from "../../components/Spacing/Padding";
import VideoButton from "../../components/VideoButton";
import AttributeList from "../../components/AttributeList";
import { useMobile } from "../../components/Breakpoint";
import currency from "../../utilities/currency";
import useTalkMessenger from "../../hooks/useTalkMessenger";

const Component = ({ data, tutorial }) => {
  const isMobile = useMobile();
  const { t } = useTranslation();
  const application = data.application;
  const messenger = useTalkMessenger({
    conversation: application.id,
    participants: [application.project.user],
  });

  const handleNewMessage = () => {
    messenger.open();
  };

  return (
    <Layout.Sidebar>
      <Sticky top={98} enabled={!isMobile}>
        <Padding bottom="xl">
          <Back to="/clients">All Clients</Back>
        </Padding>
        <Heading level={3}>{application.project.primarySkill}</Heading>
        <Text>{application.project.user.companyName}</Text>
        <Padding top="xl">
          <Button
            block
            icon="message-circle"
            styling="primary"
            onClick={handleNewMessage}
          >
            Message {application.project.user.firstName}
          </Button>
        </Padding>
        <Padding top="l" bottom="xl">
          <AttributeList>
            {Boolean(application.rate) && (
              <AttributeList.Item
                label="Hourly Rate"
                value={currency(parseFloat(application.rate) * 100.0)}
              />
            )}
            {Boolean(application.projectType === "Flexible") && (
              <AttributeList.Item
                label="Monthly Limit"
                value={`${application.monthlyLimit} hours`}
              />
            )}
            <AttributeList.Item
              label="Project Type"
              value={application.projectType}
            />
          </AttributeList>
        </Padding>
        <Padding bottom="xl">
          <VideoButton onClick={tutorial.start}>
            {t(`tutorials.${tutorial.name}.prompt`)}
          </VideoButton>
        </Padding>
      </Sticky>
    </Layout.Sidebar>
  );
};

export default Component;
