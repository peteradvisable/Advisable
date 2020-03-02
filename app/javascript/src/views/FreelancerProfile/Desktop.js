// Renders the desktop version of the freelancer profile
import React from "react";
import { Link } from "react-router-dom";
import { Box, Icon, RoundedButton, useBreakpoint } from "@advisable/donut";
import About from "./About";
import Reviews from "./Reviews";
import Masonry from "./Masonry";
import NoProjects from "./NoProjects";
import ProjectCard from "./ProjectCard";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";
import ProjectFilters from "./ProjectFilters";
import useFilteredProjects from "./useFilteredProjects";

function FreelancerProfileDesktop({ data }) {
  const id = data.specialist.id;
  const isLargeScreen = useBreakpoint("lUp");
  const projects = useFilteredProjects(data);

  return (
    <Box maxWidth={1250} px="m" mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <ProfileImage data={data} />
        <RoundedButton
          mt="l"
          mb="l"
          size="l"
          as={Link}
          fullWidth
          to={`/request_consultation/${id}`}
          prefix={<Icon icon="message-circle" />}
        >
          Request Consultation
        </RoundedButton>
        <About data={data} />
        <ProfileSkills data={data} />
      </Box>
      <Box pl="80px" width="100%">
        <Box mb="l">
          <ProjectFilters data={data} />
          {projects.length === 0 && <NoProjects />}
          <Masonry columns={isLargeScreen ? 2 : 1}>
            {projects.map(we => (
              <ProjectCard
                key={we.id}
                project={we}
                specialistId={data.specialist.id}
              />
            ))}
          </Masonry>
        </Box>
        <Reviews data={data} />
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
