import * as React from "react";
import Card from "../../components/Card";
import TaskList from "../../components/TaskList";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import NewTask from "../../components/NewTask";
import { Padding } from "../../components/Spacing";
import NoTasks from "./NoTasks";

export default ({ tasks, firstName, onNewTask, bookingId, onSelectTask }) => {
  if (tasks.length === 0) {
    return (
      <NoTasks tasks={tasks} firstName={firstName} onNewTask={onNewTask} bookingId={bookingId} />
    );
  }

  return (
    <Card>
      <Padding size="l">
        <Heading level={3}>Active Tasks</Heading>
      </Padding>
      <Divider />
      <Padding bottom="l">
        <TaskList
          tasks={tasks}
          onClickTask={onSelectTask}
          lastRow={
            <NewTask onCreate={onNewTask} bookingId={bookingId} />
          }
        />
      </Padding>
    </Card>
  );
};
