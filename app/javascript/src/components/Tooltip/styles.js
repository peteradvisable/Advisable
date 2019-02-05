import { rgba} from "polished";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const TooltipWrapper = styled.span`
  outline: none;
  cursor: default;
`

export const TooltipOverlay = styled.div`
  color: white;
  z-index: 500;
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  line-height: 20px;
  border-radius: 8px;
  background: #0E173A;
  letter-spacing: 0.01rem;
  animation: ${fadeIn} 300ms;
  padding: 10px 12px 12px 12px;
  box-shadow: 0 1px 10px ${rgba("#0E173A", 0.1)};
  pointer-events: ${props => props.pointerEvents || "none"};
`