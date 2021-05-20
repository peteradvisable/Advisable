import React from "react";
import { Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text }) {
  return (
    <Text
      fontWeight={350}
      fontSize="18px"
      lineHeight="24px"
      marginBottom={6}
      autoLink
    >
      {renderLineBreaks(text)}
    </Text>
  );
}
