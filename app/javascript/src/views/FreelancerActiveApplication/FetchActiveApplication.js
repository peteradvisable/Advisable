// Renders the loaded state for when a freelancer is viewing an active
// application
import React from "react";
import Sticky from "react-stickynode";
import { matchPath } from "react-router-dom";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import NewTask from "../../components/NewTask";
import TaskList from "../../components/TaskList";
import TaskDrawer from "../../components/TaskDrawer";
import { Padding } from "../../components/Spacing";
import FETCH_TASK from "./fetchTask.graphql";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const FetchActiveApplication = ({ history, match, data, client }) => {
  const application = data.application;

  const handleTaskClick = task => {
    history.replace(`${match.url}/tasks/${task.id}`);
  };

  const taskDrawerPath = matchPath(location.pathname, {
    path: `${match.path}/tasks/:taskId`,
  });

  const closeTask = () => {
    history.replace(match.url);
  };

  const addNewTaskToCache = task => {
    client.cache.writeQuery({
      query: FETCH_TASK,
      variables: {
        id: task.id,
      },
      data: {
        task,
      },
    });

    const newData = data;
    newData.application.tasks.push(task);
    client.cache.writeQuery({
      query: FETCH_APPLICATION,
      data: newData,
      variables: {
        id: application.airtableId,
      },
    });

    history.replace(`${match.url}/tasks/${task.id}`);
  };

  const handleDeleteTask = task => {
    history.push(match.url);
    const newData = data;
    newData.application.tasks = tasks.filter(t => {
      return t.id !== task.id;
    });

    client.cache.writeQuery({
      query: FETCH_APPLICATION,
      data: newData,
      variables: {
        id: application.airtableId,
      },
    });
  };

  return (
    <Layout>
      <TaskDrawer
        isClient={false}
        showStatusNotice
        onClose={() => closeTask()}
        onDeleteTask={handleDeleteTask}
        taskId={taskDrawerPath ? taskDrawerPath.params.taskId : null}
      />
      <Layout.Sidebar>
        <Sticky top={98} enabled>
          <Heading level={3}>{application.project.primarySkill}</Heading>
          <Text>{application.project.user.companyName}</Text>
        </Sticky>
      </Layout.Sidebar>
      <Layout.Main>
        <Card elevation={1}>
          <Padding size="m" left="l" right="l">
            <Heading level={4}>Active Tasks</Heading>
          </Padding>
          <Padding bottom="m">
            <TaskList
              tasks={application.tasks}
              onClickTask={handleTaskClick}
              lastRow={
                <NewTask
                  onCreate={addNewTaskToCache}
                  application={application}
                />
              }
            />
          </Padding>
        </Card>
      </Layout.Main>
    </Layout>
  );
};

export default FetchActiveApplication;
