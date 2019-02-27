import * as React from "react";
import { ApplicationType } from "../../../types";
import {
  Invitation,
  Background,
  Content,
  Title,
  Rate,
  Description,
  Button
} from "./styles";

interface Props {
  application: ApplicationType;
}

const InvitationComponent = ({ application }: Props) => {
  return (
    <Invitation>
      <Content>
        <Title>{application.project.primarySkill}</Title>
        <Rate>{application.project.estimatedBudget}</Rate>
        <Description>{application.project.description}</Description>
      </Content>
      <Button>
        View Details
        <svg width="11" height="10" viewBox="0 0 11 10">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.74224e-08 4.5L10 4.5V5.5L0 5.5L8.74224e-08 4.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7071 5L6.35355 9.35355L5.64645 8.64645L9.29289 5L5.64645 1.35355L6.35355 0.646446L10.7071 5Z"
          />
        </svg>
      </Button>
      <Background />
    </Invitation>
  );
};

export default InvitationComponent;
