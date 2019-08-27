import gql from "graphql-tag";
import { viewerFields } from "../../../graphql/queries/viewer";
import { SpecialistFields } from "../getProfile";

export default gql`
  ${viewerFields}
  ${SpecialistFields}

  mutation createFreelancerAccount($input: CreateFreelancerAccountInput!) {
    createFreelancerAccount(input: $input) {
      token
      viewer {
        ...ViewerFields
        ...SpecialistFields
      }
    }
  }
`;
