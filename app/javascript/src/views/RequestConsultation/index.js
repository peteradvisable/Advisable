// Renders the steps for requesting a consultation with a specialist.
import React from "react";
import { useQuery } from "react-apollo";
import {
  useParams,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  generatePath,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Card } from "@advisable/donut";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import Topic from "./Topic";
import Skills from "./Skills";
import fetchSpecialist from "./fetchSpecialist";
import Availability from "./Availability";
import CompanyInformation from "./CompanyInformation";
import Sidebar from "./Sidebar";
import Complete from "./Complete";

export const STEPS = [
  {
    label: "Skills",
    path: "/consultation/:specialistId/skills",
    component: Skills,
  },
  {
    label: "Company Details",
    path: "/consultation/:specialistId/details",
    component: CompanyInformation,
  },
  {
    label: "Availability",
    path: "/consultation/:specialistId/availability",
    component: Availability,
  },
  {
    label: "Topic",
    path: "/consultation/:specialistId/topic",
    component: Topic,
  },
  {
    path: "/consultation/:specialistId/sent",
    component: Complete,
  },
];

const RequestConsultation = () => {
  const history = useHistory();
  const location = useLocation();
  const { specialistId } = useParams();
  const { data, loading, error } = useQuery(fetchSpecialist, {
    variables: { id: specialistId },
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (error?.graphQLErrors[0].extensions.code === "notFound") {
    return <NotFound />;
  }

  if (loading) return <Loading />;

  const handleNextStep = index => nextLocation => {
    const nextStep = STEPS[index + 1];
    if (nextStep) {
      const nextPath = generatePath(nextStep.path, {
        specialistId,
      });
      history.push({
        ...location,
        pathname: nextPath,
        ...nextLocation,
      });
    }
  };

  return (
    <Box maxWidth={960} margin="0 auto" py="l" display="flex">
      <Box width={250} mr="l" flexShrink={0}>
        <Sidebar data={data} />
      </Box>
      <Box width="100%" position="relative">
        <AnimatePresence initial={false}>
          <Switch location={location} key={location.pathname}>
            {STEPS.map((step, i) => (
              <Route
                key={step.path}
                path={step.path}
                render={route => (
                  <motion.div
                    key={step.path}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      position: "absolute",
                      opacity: 0,
                      y: -80,
                    }}
                  >
                    <Card padding="l" elevation="m">
                      <step.component
                        {...route}
                        data={data}
                        nextStep={handleNextStep(i)}
                      />
                    </Card>
                  </motion.div>
                )}
              />
            ))}
            <Route
              render={() => {
                return (
                  <motion.div exit={{}}>
                    <Redirect
                      to={generatePath(STEPS[0].path, { specialistId })}
                    />
                  </motion.div>
                );
              }}
            />
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default RequestConsultation;
