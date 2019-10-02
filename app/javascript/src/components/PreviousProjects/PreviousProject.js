import React, { useState } from "react";
import { truncate } from "lodash";
import { Text, Box } from "@advisable/donut";
import Button from "src/components/Button";
import Review from "src/components/Review";
import Spacing, { Padding } from "src/components/Spacing";
import Divider from "src/components/Divider";
import PreviousProjectModal from "src/components/PreviousProjectModal";
import ProjectValidationStatus from "src/components/ProjectValidationStatus";
import { ProjectTitle } from "./styles";
import ProjectValidationPrompt from "../ProjectValidationPrompt";
import useViewer from "../../hooks/useViewer";

const companyName = project => {
  if (project.__typename === "Project") return project.user.companyName;
  return project.clientName;
};

const title = project => {
  return `${project.primarySkill} at ${companyName(project)}`;
};

const PreviousProject = ({ previousProject, specialistId }) => {
  const [isOpen, setOpen] = useState(false);
  const viewer = useViewer();
  const { project, reviews } = previousProject;

  const openProject = e => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <React.Fragment>
      <PreviousProjectModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id={project.airtableId}
        type={project.__typename}
        specialistId={specialistId}
      />
      <Padding size="xl">
        <Text fontSize="l" fontWeight="medium" mb="xs" color="blue.5">
          <ProjectTitle href="#" onClick={openProject}>
            {title(project)}
          </ProjectTitle>
        </Text>

        <Spacing marginBottom="m">
          <ProjectValidationStatus status={project.validationStatus} />
        </Spacing>

        {viewer.isSpecialist && project.validationStatus === "Pending" && (
          <Box mb="m">
            <ProjectValidationPrompt project={project} />
          </Box>
        )}

        <Text mb="l" fontSize="s" lineHeight="s" color="neutral.7">
          {truncate(project.description, { length: 380, separator: " " })}
        </Text>

        {reviews.length > 0 && (
          <Spacing paddingBottom="xl">
            {reviews.map(review => (
              <Review
                key={review.id}
                review={review}
                companyName={companyName(project)}
              />
            ))}
          </Spacing>
        )}

        <Button styling="outlined" onClick={openProject}>
          View project details
        </Button>
      </Padding>
      <Divider />
    </React.Fragment>
  );
};

export default PreviousProject;
