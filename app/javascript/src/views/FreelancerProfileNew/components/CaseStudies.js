import React from "react";
import { Box, Stack } from "@advisable/donut";
import SectionTitle from "./SectionTitle";
import CaseStudy from "./CaseStudy";

export default function CaseStudies({ caseStudies }) {
  const cards = caseStudies.map((cs) => (
    <CaseStudy caseStudy={cs} key={cs.id} />
  ));

  return (
    <Box>
      <SectionTitle>Case Studies</SectionTitle>
      <Stack spacing={6} mt={3}>
        {cards}
      </Stack>
    </Box>
  );
}
