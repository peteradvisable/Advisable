import styled from 'styled-components';
import MaskedInput from 'react-text-mask'
import { withSpacing } from 'src/components/Spacing';

export let Wrapper = styled.div`
  width: ${props => props.block ? "100%" : "auto"};
`

Wrapper = withSpacing(Wrapper)

export const Input = styled(MaskedInput)`
  width: 100%;
  height: 36px;
  border: none;
  outline: none;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  background: #F4F7FC;
  letter-spacing: -0.03em;
  transition: background 300ms;

  &::-webkit-inner-spin-button {
    opacity: 0;
    -webkit-appearance: none;
  }

  &:focus {
    background: #ECF1FA;
  }

  &::-webkit-input-placeholder {
    color: #a4add1;
  }
  &::-moz-placeholder {
    color: #a4add1;
  }
  &:-ms-input-placeholder {
    color: #a4add1;
  }
  &:-moz-placeholder {
    color: #a4add1;
  }
`

export const Textarea = Input.withComponent('textarea').extend`
  resize: none;
  min-height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
`
