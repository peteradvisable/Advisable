import styled from "styled-components";
import { Box, theme } from "@advisable/donut";
import { flex } from "@guild/styles";
import ClampLines from "react-clamp-lines";

const { space, colors } = theme;

export const NotificationDropdown = styled(Box)`
  right: 24px;
  z-index: 2;
  top: 74px;
  width: 442px;
  height: 75vh;
  padding: 24px;
  background: white;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
  transition: opacity 250ms cubic-bezier(0, 1, 0.4, 1),
    transform 250ms cubic-bezier(0.18, 1.25, 0.4, 1);

  opacity: ${(props) => (props.open ? "1" : "0")};
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0.7)")};

  ${flex.spaceChildrenVertical(space.s)}
  overflow: scroll;
`;

export const NotificationItem = styled(Box)`
  display: flex;
  max-width: 392px;
  height: 118px;
  background: ${colors.ghostWhite};
  align-items: center;

  /* ${flex.spaceChildrenHorizontal(theme.space.s)} */
`;

export const CommentNotificationBody = styled(ClampLines)`
  color: ${colors.catalinaBlue100};
  font-size: 14px;
`;
