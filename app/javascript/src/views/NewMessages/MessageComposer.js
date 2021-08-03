import React, { useMemo, useRef, useState } from "react";
import { theme, Box, Stack } from "@advisable/donut";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { ArrowCircleRight } from "@styled-icons/heroicons-solid/ArrowCircleRight";
import useAttachments from "./useAttachments";
import AddAttachmentsButton from "./AddAttachmentsButton";
import Attachment from "./components/Attachment";
import { useSendMessage } from "./queries";

const StyledMessageComposer = styled.div`
  width: 100%;
  overflow: hidden;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 32px rgba(0, 0, 0, 0.08);

  textarea {
    margin: 0;
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    padding: 16px;
    font-size: 17px;
    font-weight: 450;
    letter-spacing: -0.01rem;
    height: auto !important;
    font-family: TTHoves, sans-serif;
    border-bottom: 1px solid ${theme.colors.neutral100};

    &::placeholder {
      color: ${theme.colors.neutral400};
    }
  }
`;

const ComposerButton = styled.button`
  height: 32px;
  border: none;
  cursor: pointer;
  appearance: none;
  border-radius: 16px;
  align-items: center;
  display: inline-flex;

  span {
    padding: 0 8px;
    font-size: 15px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    width: 20px;
  }
`;

const StyledMessageButton = styled(ComposerButton)`
  color: white;
  background: #2b59ff;

  &:not(:disabled):hover {
    background: #0027b0;
  }

  &:not(:disabled):active {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;

const MIN_ROWS = 2;
const MAX_ROWS = 10;
export default function MessageComposer({ conversation }) {
  const container = useRef(null);
  const textarea = useRef(null);
  const [send] = useSendMessage(conversation);
  const {
    attachments,
    signedIds,
    uploading,
    clearAttachments,
    addAttachments,
    removeAttachment,
    completeUpload,
  } = useAttachments();
  const [value, setValue] = useState("");

  const hasValue = useMemo(() => {
    return value.trim().replace(/^\s+|\s+$/g, "").length > 0;
  }, [value]);

  const hasAttachments = useMemo(() => attachments.length > 0, [attachments]);
  const canSend = useMemo(() => {
    const hasContent = hasValue || hasAttachments;
    return hasContent && !uploading;
  }, [uploading, hasValue, hasAttachments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSend) return;

    setValue("");
    clearAttachments();

    await send({
      variables: {
        input: {
          conversation: conversation.id,
          content: value.trim().replace(/^\s+|\s+$/g, ""),
          attachments: signedIds,
        },
      },
    });
  };

  const handleClick = (e) => {
    if (e.target === container.current) {
      textarea.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.metaKey) {
      handleSubmit(e);
    }
  };

  return (
    <StyledMessageComposer onClick={handleClick} ref={container}>
      <TextareaAutosize
        value={value}
        minRows={MIN_ROWS}
        maxRows={MAX_ROWS}
        ref={(tag) => (textarea.current = tag)}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a message..."
      />

      {hasAttachments && (
        <Stack px={4} divider="neutral100">
          {attachments.map((a) => (
            <Attachment
              key={a.id}
              attachment={a}
              completeUpload={completeUpload}
              onRemove={() => removeAttachment(a.id)}
            />
          ))}
        </Stack>
      )}

      <Box
        height="52px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
      >
        <StyledMessageButton disabled={!canSend} onClick={handleSubmit}>
          <span>Send</span>
          <ArrowCircleRight />
        </StyledMessageButton>
        <AddAttachmentsButton onSelect={addAttachments} />
      </Box>
    </StyledMessageComposer>
  );
}
