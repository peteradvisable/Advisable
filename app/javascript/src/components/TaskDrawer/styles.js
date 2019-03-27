import { rgba } from "polished";
import styled, { css, keyframes } from "styled-components";
import colors from "../../colors";
import { Status } from "../Status/styles";

const placeholderColor = color => css`
  &::-webkit-input-placeholder {
    color: ${color};
  }
  &::-moz-placeholder {
    color: ${color};
  }
  &:-ms-input-placeholder {
    color: ${color};
  }
  &:-moz-placeholder {
    color: ${color};
  }
`;

export const TaskDrawer = styled.div`
  height: 100vh;
  position: relative;

  ${Status} {
    margin-top: 8px;
    margin-left: 8px;
    margin-bottom: 8px;
  }
`;

export const Title = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  height: auto;
  outline: none;
  overflow: auto;
  color: #0a163f;
  font-size: 21px;
  font-weight: 500;
  line-height: 24px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  transition: border-color 200ms;

  &:hover {
    background: #f5f6f9;
  }

  &:focus {
    background: #f5f6f9;
    border: 2px solid ${colors.blue.base};
  }

  ${placeholderColor(colors.neutral.s5)}
`;

export const TaskDetails = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  margin: 0 8px 30px 8px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
`;

export const Detail = styled.div`
  padding: 8px;
  margin-left: -8px;
  padding-left: 50px;
  position: relative;
  margin-right: 60px;
  border-radius: 6px;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    background: #f5f6f9;
  }
`;

export const Popout = styled.div`
  z-index: 1;
  width: 300px;
  padding: 20px;
  background: white;
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 4px 60px ${rgba(colors.neutral.s9, 0.25)},
    0 2px 8px ${rgba(colors.neutral.s9, 0.1)};
`;

export const DetailIcon = styled.div`
  top: 50%;
  left: 8px;
  width: 30px;
  height: 30px;
  user-select: none;
  position: absolute;
  border-radius: 50%;
  background: ${rgba(colors.blue.base, 0.075)};
  transform: translateY(-50%);
`;

export const DetailLabel = styled.h5`
  color: #7f87a5;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  letter-spacing: 0.005em;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  color: #0a163f;
  font-size: 15px;
  font-weight: 500;
`;

export const Label = styled.label`
  color: #0a163f;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  margin: 0 8px 4px 8px;
`;

export const Description = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  resize: none;
  height: auto;
  outline: none;
  overflow: auto;
  color: #0a163f;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 6px;
  margin-bottom: 16px;
  border: 2px solid transparent;
  transition: border-color 200ms;
  ${placeholderColor(colors.neutral.s5)}

  &:hover {
    background: #f5f6f9;
  }

  &:focus {
    background: #f5f6f9;
    border: 2px solid ${colors.blue.base};
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Confirmation = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${rgba("#FFFFFF", 0.75)};
  animation: ${fadeIn} 400ms;
`;

const slideInUp = keyframes`
from {
  opacity: 0;
  transform: scale(0.9) translate3d(0, 10px, 0);
}

to {
  opacity: 1;
  transform: scale(1) translate3d(0, 0, 0);
}
`;

export const ConfirmationContainer = styled.div`
  padding: 30px;
  max-width: 320px;
  background: white;
  border-radius: 8px;
  position: absolute;
  text-align: center;
  animation: ${slideInUp} 300ms;
  box-shadow: 0 8px 60px ${rgba(colors.neutral.s8, 0.2)},
    0 2px 6px ${rgba(colors.neutral.s8, 0.15)};

  p {
    font-size: 15px;
    line-height: 19px;
    margin-bottom: 20px;
    color: ${colors.neutral.s9};
  }
`;
