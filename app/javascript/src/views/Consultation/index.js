import React from "react";
import { Box } from "@advisable/donut";
import { useQuery } from "react-apollo";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import GET_CONSULTATION from "./getConsultation";
import PendingConsultation from "./PendingConsultation";
import DeclinedConsultation from "./DeclinedConsultation";

const Consultation = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(GET_CONSULTATION, {
    variables: { id },
  });

  if (loading) return <Loading />;

  const status = data.consultation.status;

  let content;
  switch (status) {
    case "Specialist Rejected": {
      content = <DeclinedConsultation data={data} />;
      break;
    }
    default: {
      content = <PendingConsultation data={data} />;
      break;
    }
  }

  return (
    <Box width="90%" maxWidth={600} mx="auto" py="l">
      {content}
    </Box>
  );
};

export default Consultation;
