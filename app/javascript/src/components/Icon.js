import React from "react";
import styled from 'styled-components';
import feather from "feather-icons";

export const Icon = styled.span`
  svg {
    display: block;
    margin: 0 auto;
    vertical-align: middle;
  }
`

export default ({ icon, ...props }) => {
  const html = {
    __html: feather.icons[icon].toSvg(props)
  };
  return <Icon className='Icon' dangerouslySetInnerHTML={html} />;
};
