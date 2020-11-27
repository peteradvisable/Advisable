import React from "react";
import { Chat } from "@styled-icons/heroicons-outline";
import { useModal, Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";
import { useNotifications } from "components/Notifications";
import MessageModal from "@guild/components/MessageModal";
import { useApolloClient } from "@apollo/client";
import useViewer from "src/hooks/useViewer";

function MessagePostAction({ post }) {
  const modal = useModal();
  const viewer = useViewer();
  const client = useApolloClient();
  const notifications = useNotifications();
  const firstName = post.author.firstName;

  const handleMessage = () => {
    if (viewer?.guild) {
      modal.show();
    } else {
      const cta = document.getElementById("joinGuild");
      cta?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = () => {
    client.cache.modify({
      id: client.cache.identify(post),
      fields: {
        engagementsCount(count) {
          return count + 1;
        },
      },
    });

    notifications.notify(
      `Your message has been sent to ${post.author.firstName}`,
    );
  };

  return (
    <>
      <MessageModal
        recipient={post.author}
        post={post}
        modal={modal}
        onSend={handleSend}
      />
      <Tooltip placement="top" content={`Message ${firstName}`}>
        <Box
          css={`
            outline: none;
          `}
        >
          <PostAction
            color="cyan700"
            bg="neutral100"
            icon={<Chat />}
            onClick={handleMessage}
          />
        </Box>
      </Tooltip>
    </>
  );
}

export default MessagePostAction;
