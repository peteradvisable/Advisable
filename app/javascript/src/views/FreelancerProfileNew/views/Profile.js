import React, { useLayoutEffect } from "react";
import { Box, Stack, useTheme } from "@advisable/donut";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import CoverImage from "../components/CoverImage";
import Sidebar from "../components/Sidebar";
import { useProfileData } from "../queries";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import { Switch } from "react-router";

export default function Profile() {
  const { loading, data, error } = useProfileData();
  const { setTheme } = useTheme();

  useLayoutEffect(() => {
    setTheme((t) => ({ ...t, background: "white" }));
    return () => setTheme((t) => ({ ...t, background: "default" }));
  }, [setTheme]);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  const { reviews, caseStudies } = data.specialist;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={{ _: "center", l: "stretch" }}
      width={{ l: "1024px", xl: "1136px" }}
      mx="auto"
      pb={10}
    >
      <CoverImage
        src={data.specialist.coverPhoto}
        size={["xs", "s", "m", "l", "xl"]}
      />
      <Box
        display="flex"
        flexDirection={{ _: "column", l: "row" }}
        px={{ xs: 7, s: 9, l: 11, xl: 14 }}
        maxWidth={{ s: "700px", l: "none" }}
      >
        <Sidebar data={data} />
        <Stack mt={{ _: 16, m: 12, l: 13 }} width="100%" spacing={11}>
          {caseStudies.length ? (
            <CaseStudies caseStudies={caseStudies} />
          ) : null}
          {reviews.length ? <Testimonials reviews={reviews} /> : null}
        </Stack>
      </Box>
    </Box>
  );
}
