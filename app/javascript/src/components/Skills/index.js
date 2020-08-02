import React from "react";
import { Box } from "@advisable/donut";
import styled from "styled-components";
import colors from "../../colors";

const Skill = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin-right: 8px;
  padding: 5px 12px;
  margin-bottom: 8px;
  border-radius: 15px;
  align-items: center;
  display: inline-flex;
  color: ${colors.neutral.s9};
  background: ${colors.neutral.s2};
`;

export default ({ skills, ...props }) => {
  return (
    <Box {...props}>
      {skills.map((skill, i) => (
        <Skill key={i}>{skill.name}</Skill>
      ))}
    </Box>
  );
};
