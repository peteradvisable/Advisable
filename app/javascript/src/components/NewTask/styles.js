import { darken } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const NewTaskIcon = styled.span`
  width: 26px;
  height: 26px;
  color: white;
  margin-right: 8px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  position: relative;

  svg {
    z-index: 1;
  }

  &::after {
    content: "";
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    background: ${theme.colors.blue500};
    transition: transform 200ms cubic-bezier(0, 0.4, 0.3, 1.2);
  }
`;

export const NewTask = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 15px;
  appearance: none;
  appearance: none;
  font-weight: 500;
  align-items: center;
  display: inline-flex;
  background: transparent;
  color: ${theme.colors.blue500};

  &:hover {
    color: ${darken(0.2, theme.colors.blue500)};

    ${NewTaskIcon}::after {
      transform: scale(1.12);
    }
  }
`;
