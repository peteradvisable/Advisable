// Renders the primary header for the app
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import React, { Fragment } from "react";
import { Header as Wrapper, Spacer, Logo, Hamburger } from "./styles";
import logo from "./logo.svg";
import CurrentUser from "./CurrentUser";
import { useMobile } from "../../components/Breakpoint";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";
import VIEWER from "../../graphql/queries/viewer";

const Header = ({ history }) => {
  const isMobile = useMobile();
  const [navOpen, setNavOpen] = React.useState(false);

  const handleLogout = async apolloClient => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    await apolloClient.clearStore();
    apolloClient.resetStore();
    history.push("/login");
  };

  return (
    <Fragment>
      <Spacer />
      <Wrapper>
        <Query query={VIEWER}>
          {query => (
            <React.Fragment>
              <Hamburger onClick={() => setNavOpen(true)}>
                <div />
                <div />
                <div />
              </Hamburger>
              <Logo to="/">
                <img src={logo} alt="" />
              </Logo>
              <ClientNavigation
                data={query.data}
                navOpen={navOpen}
                onCloseNav={() => setNavOpen(false)}
                onLogout={() => handleLogout(query.client)}
              />
              <FreelancerNavigation
                navOpen={navOpen}
                onLogout={() => handleLogout(query.client)}
                onCloseNav={() => setNavOpen(false)}
              />
              {!isMobile && !query.loading && (
                <CurrentUser
                  user={query.data.viewer}
                  onLogout={() => handleLogout(query.client)}
                />
              )}
            </React.Fragment>
          )}
        </Query>
      </Wrapper>
    </Fragment>
  );
};

export default withRouter(Header);
