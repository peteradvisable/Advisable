import React from "react";
import { Spring } from "react-spring";
import Text from "src/components/Text";
import Avatar from "src/components/Avatar";
import Button from "src/components/Button";
import Questions from "./Questions";
import CandidateAttribute from "./CandidateAttribute";
import RejectModal from "../RejectModal";
import RequestIntroductionModal from "../RequestIntroductionModal";
import {
  Card,
  Name,
  Location,
  Description,
  Preview,
  MoreInfo,
  CandidateWrapper,
  CandidateHeader,
  CandidateAvatar,
  CandidateContent,
  NameAndLocation,
  CandidateFooter,
  CandidateAttributes
} from "./styles";

class Candidate extends React.Component {
  state = {
    expanded: false,
    modal: null
  };

  clickToExpand = () => {
    // Prevent expanding or collapsing if the user is selecting text.
    const selection = window.getSelection();
    if(selection.toString().length === 0) {
      this.setState({ expanded: !this.state.expanded })
    }
  }

  render() {
    const { application } = this.props;

    return (
      <div style={this.props.style}>
        <Card>
          <RequestIntroductionModal
            isOpen={this.state.modal === "introduction"}
            application={application}
            onClose={() => {
              this.setState({ modal: null });
            }}
          />
          <RejectModal
            isOpen={this.state.modal === "reject"}
            application={application}
            onClose={() => {
              this.setState({ modal: null });
            }}
          />
          <CandidateContent
            onClick={this.clickToExpand}
          >
            <CandidateHeader>
              <Avatar name={application.specialist.name} />
              <NameAndLocation>
                <Name>{application.specialist.name}</Name>
                <Location>
                  {application.specialist.city},{" "}
                  {application.specialist.country}
                </Location>
              </NameAndLocation>
            </CandidateHeader>
            <CandidateAttributes>
              <CandidateAttribute
                label="Hourly rate"
                value={application.rate}
              />
              <CandidateAttribute
                label="Available to start"
                value={application.availability}
              />
              <CandidateAttribute
                label="Ability to travel"
                value={application.specialist.travel}
              />
              <CandidateAttribute
                label="Linkedin"
                value={
                  <a target="_blank" href={application.specialist.linkedin}>
                    View Profile
                  </a>
                }
              />
            </CandidateAttributes>

            <Preview expanded={this.state.expanded}>
              <Description>
                <Text>{application.introduction}</Text>
              </Description>
            </Preview>

            <Spring
              from={{ height: 0, opacity:0 }}
              to={{
                height: this.state.expanded ? "auto" : 0,
                opacity: this.state.expanded ? 1 : 0,
              }}
            >
              {styles => (
                <MoreInfo style={styles}>
                  <Questions questions={application.questions} />
                  <div style={{width: '100%'}}>
                    <Text>Skills</Text>
                    {application.specialist.skills.join(", ")}
                  </div>
                </MoreInfo>
              )}
            </Spring>
          </CandidateContent>

          {application.status === "Applied" && (
            <CandidateFooter>
              <Button
                onClick={() => this.setState({ modal: "introduction" })}
                primary
              >
                Request Intro
              </Button>
              <Button onClick={() => this.setState({ modal: "reject" })}>
                Reject
              </Button>
            </CandidateFooter>
          )}
        </Card>
      </div>
    );
  }
}

export default Candidate;
