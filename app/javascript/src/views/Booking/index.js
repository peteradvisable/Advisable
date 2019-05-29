import * as React from "react";
import { graphql, withApollo } from "react-apollo";
import { matchPath } from "react-router-dom";
import NotFound from "../NotFound";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import TaskDrawer from "../../components/TaskDrawer";
import SetMonthlyLimit from "./SetMonthlyLimit";
import { getActiveApplication } from "../../graphql/queries/applications";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import Tutorial from "./Tutorial";
import useTutorial from "../../hooks/useTutorial";

const tutorials = {
  Fixed: "fixedProjects",
  Flexible: "flexibleProjects",
};

let Booking = ({ data, match, history, location, client }) => {
  if (data.loading) return <Loading />;
  if (!data.application) return <NotFound />;
  if (data.application.status !== "Working") return <NotFound />;
  const application = data.application;
  const tutorial = useTutorial(tutorials[application.projectType], {
    client,
    autoStart: true,
  });

  const hasMonthlyLimit = Boolean(data.application.monthlyLimit);
  if (data.application.projectType === "Flexible" && !hasMonthlyLimit) {
    return <SetMonthlyLimit applicationId={data.application.airtableId} />;
  }

  const { applicationId } = match.params;
  const tasks = data.application.tasks;
  const specialist = data.application.specialist;

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
    const newData = data;
    newData.application.tasks.push(task);
    client.writeQuery({
      query: getActiveApplication,
      data: newData,
      variables: {
        id: applicationId,
      },
    });

    history.replace(`/manage/${applicationId}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    client.writeQuery({
      query: getActiveApplication,
      variables: {
        id: applicationId,
      },
      data: {
        ...data,
        application: {
          ...data.application,
          tasks: tasks.filter(t => {
            return t.id !== task.id;
          }),
        },
      },
    });
  };

  return (
    <>
      <Tutorial tutorial={tutorial} />
      <TaskDrawer
        isClient
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        onCreateRepeatingTask={addNewTaskToCache}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Layout>
        <Sidebar data={data} tutorial={tutorial} />
        <Layout.Main>
          <Tasks
            tasks={tasks}
            onNewTask={addNewTaskToCache}
            onSelectTask={openTask}
            application={data.application}
            firstName={specialist.firstName}
          />
        </Layout.Main>
      </Layout>
    </>
  );
};

Booking = withApollo(Booking);

Booking = graphql(getActiveApplication, {
  options: props => ({
    variables: {
      id: props.match.params.applicationId,
    },
  }),
})(Booking);

export default Booking;
