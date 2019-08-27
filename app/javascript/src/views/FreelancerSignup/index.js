import React from "react";
import { useQuery } from "react-apollo";
import { useTheme, Box } from "@advisable/donut";
import { Switch, Route } from "react-router-dom";
import Logo from "../../components/Logo";
import { Container, Main, Content } from "./styles";
import Skills from "./Skills";
import Confirm from "./Confirm";
import Sidebar from "./Sidebar";
import WorkHistory from "./WorkHistory";
import BuildProfile from "./BuildProfile";
import AccountDetails from "./AccountDetails";
import FreelancingPreferences from "./FreelancingPreferences";
import GET_SPECIALIST from "./getProfile";

const STEPS = [
  {
    path: "/",
    exact: true,
    component: Skills,
  },
  {
    path: "/account",
    component: AccountDetails,
  },
  {
    path: "/confirm",
    component: Confirm,
  },
  {
    path: "/preferences",
    component: FreelancingPreferences,
  },
  {
    path: "/profile",
    component: BuildProfile,
  },
  {
    path: "/work",
    component: WorkHistory,
  },
];

// Renders the freelancer signup flow.
const FreelancerSignup = ({ location }) => {
  const { updateTheme } = useTheme();
  const { loading, data, errors } = useQuery(GET_SPECIALIST);

  React.useLayoutEffect(() => {
    updateTheme({ background: "white" });
    return () => updateTheme({ background: "default" });
  }, []);

  if (loading) return <>loading...</>;

  return (
    <Container>
      <Main>
        <Content>
          <Box mt="l" mb="xxl">
            <Logo />
          </Box>
          <Switch>
            {STEPS.map(step => (
              <Route
                key={step.path}
                path={`/freelancers/signup${step.path}`}
                exact={step.exact}
                render={route => {
                  const Component = step.component;
                  return <Component {...route} specialist={data.viewer} />;
                }}
              />
            ))}
          </Switch>
        </Content>
      </Main>
      <Sidebar specialist={data.viewer} />
    </Container>
  );
};

export default FreelancerSignup;
