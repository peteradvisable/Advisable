import * as React from "react";
import { get } from "lodash";
import { Box } from "@advisable/donut";
import { graphql, withApollo } from "react-apollo";
import { matchPath } from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import TaskDrawer from "../../components/TaskDrawer";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import FixedTutorial from "../../components/Tutorial/FixedProjectTutorial";
import FlexibleTutorial from "../../components/Tutorial/FlexibleProjectTutorial";
import useTutorial from "../../hooks/useTutorial";
import GET_ACTIVE_APPLICATION from "./getActiveApplication";
import StoppedWorkingNotice from "./StoppedWorkingNotice";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

let Booking = ({ data, match, history, location, client }) => {
  if (data.loading) return <Loading />;
  if (!data.application) return <NotFound />;
  let status = get(data, "application.status");
  if (["Working", "Stopped Working"].indexOf(status) === -1) {
    return <NotFound />;
  }

  let application = data.application;
  let specialist = get(data, "application.specialist");
  const tutorial = useTutorial(tutorials[application.projectType], {
    client,
    autoStart: true,
  });

  const TutorialComponent =
    tutorial.name === "flexibleProjects" ? FlexibleTutorial : FixedTutorial;

  const { applicationId } = match.params;
  const tasks = data.application.tasks;

  const openTask = task => {
    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const closeTask = () => {
    history.replace(match.url);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const addNewTaskToCache = task => {
    const newData = client.readQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
    });
    newData.application.tasks.push(task);
    client.writeQuery({
      query: GET_ACTIVE_APPLICATION,
      data: newData,
      variables: {
        id: applicationId,
      },
    });

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    const newData = client.readQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
    });
    history.push(match.url);
    client.writeQuery({
      query: GET_ACTIVE_APPLICATION,
      variables: {
        id: applicationId,
      },
      data: {
        ...newData,
        application: {
          ...newData.application,
          tasks: tasks.filter(t => {
            return t.id !== task.id;
          }),
        },
      },
    });
  };

  return (
    <>
      <TutorialComponent tutorial={tutorial} isClient />
      <TaskDrawer
        isClient
        showStatusNotice
        readOnly={application.status !== "Working"}
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        onCreateRepeatingTask={addNewTaskToCache}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Layout>
        <Sidebar data={data} tutorial={tutorial} />
        <Layout.Main>
          {status === "Stopped Working" && (
            <Box mb="m">
              <StoppedWorkingNotice
                firstName={specialist.firstName}
                application={data.application}
              />
            </Box>
          )}
          <Tasks
            onSelectTask={openTask}
            onNewTask={addNewTaskToCache}
            application={data.application}
          />
        </Layout.Main>
      </Layout>
    </>
  );
};

Booking = withApollo(Booking);

Booking = graphql(GET_ACTIVE_APPLICATION, {
  options: props => ({
    variables: {
      id: props.match.params.applicationId,
    },
  }),
})(Booking);

export default Booking;
