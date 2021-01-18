import React from "react";
import { Box, Circle, DialogDisclosure } from "@advisable/donut";
import Review from "src/components/Review";
import { Pencil, Exclamation } from "@styled-icons/heroicons-outline";
import ProjectValidationPrompt from "src/components/ProjectValidationPrompt";
import {
  StyledBadge,
  StyledMessage,
  StyledTitle,
  StyledButtonsPannel,
  StyledButton,
} from "./styles";

function Validated({ project }) {
  return project.reviews.length > 0 && project.reviews[0]?.comment ? (
    <Review review={project.reviews[0]} />
  ) : null;
}

function Pending({ project }) {
  return <ProjectValidationPrompt project={project} />;
}

function DraftCTA({ project, modal }) {
  return (
    <StyledButtonsPannel>
      <DialogDisclosure
        as={StyledButton}
        {...modal.atPath(`/previous_projects/${project.id}`)}
      >
        Continue
      </DialogDisclosure>
    </StyledButtonsPannel>
  );
}

function Status({ CTA, ...props }) {
  return (
    <StyledBadge variant={props.variant} prefix={props.icon}>
      <Box display="flex" p={3}>
        <Box>
          <Circle size={40} mr={3}>
            {props.icon}
          </Circle>
        </Box>
        <Box>
          <StyledTitle
            mb={0.5}
            fontSize="md"
            fontWeight="medium"
            lineHeight="m"
          >
            {props.label}
          </StyledTitle>
          <StyledMessage fontSize="sm" lineHeight="xs">
            {props.message}
          </StyledMessage>
          {CTA && <CTA {...props} />}
        </Box>
      </Box>
    </StyledBadge>
  );
}

const STATUSES = {
  Validated: {
    component: Validated,
  },
  Draft: {
    component: Status,
    variant: "neutral",
    label: "Draft Project",
    message:
      "This project has not been published and will not be visible on your profile. Continue editing to post it to your profile.",
    icon: <Pencil />,
    CTA: DraftCTA,
  },
  Pending: {
    component: Pending,
  },
  "Validation Failed": {
    component: Status,
    variant: "red",
    label: "Validation Failed",
    message:
      "Unfortunately the client was unable to verify this project. It will not be visible to others until it is validated. You can update the project and request validation again or remove the project.",
    icon: <Exclamation />,
  },
};

function ProjectStatus({ project, modal }) {
  const status = (project.draft && "Draft") || project.validationStatus;
  const config = STATUSES[status];

  return (
    <Box mt={5} pt={6} pb={2} borderTop="1px solid" borderTopColor="neutral100">
      <config.component
        project={project}
        modal={modal}
        review={project.reviews?.[0]}
        {...config}
      />
    </Box>
  );
}

export default ProjectStatus;
