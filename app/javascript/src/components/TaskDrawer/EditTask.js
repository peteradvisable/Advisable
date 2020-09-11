import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Div100vh from "react-div-100vh";
import { Box, Button } from "@advisable/donut";
import TaskStatus from "../TaskStatus";
import Text from "../Text";
import Scrollable from "../Scrollable";
import VerticalLayout from "../VerticalLayout";
import Title from "./Title";
import DueDate from "./DueDate";
import Actions from "./Actions";
import QuoteInput from "./QuoteInput";
import Description from "./Description";
import MarkAsTrial from "./MarkAsTrial.js";
import TaskDetailRows from "./TaskDetailRows";
import {
  TaskDetails,
  Confirmation,
  ConfirmationContainer,
  SavingIndicator,
} from "./styles";
import StageDescription from "./StageDescription";

const READ = "READ";
const WRITE = "WRITE";
const PROMPT = "PROMPT";

const PERMISSIONS = {
  "Not Assigned": {
    name: (isClient, task) => (isClient && task.estimate ? PROMPT : WRITE),
    dueDate: (isClient, task) => (isClient && task.estimate ? PROMPT : WRITE),
    estimate: (isClient) => (isClient ? READ : WRITE),
    description: (isClient, task) =>
      isClient && task.estimate ? PROMPT : WRITE,
  },
  "Requested To Start": {
    name: (isClient, task) => (isClient && task.estimate ? PROMPT : WRITE),
    dueDate: (isClient, task) => (isClient && task.estimate ? PROMPT : WRITE),
    estimate: (isClient) => (isClient ? READ : WRITE),
    description: (isClient, task) =>
      isClient && task.estimate ? PROMPT : WRITE,
  },
  "Quote Requested": {
    name: () => WRITE,
    dueDate: () => WRITE,
    estimate: (isClient) => (isClient ? READ : WRITE),
    description: () => WRITE,
  },
  "Quote Provided": {
    name: (isClient) => (isClient ? PROMPT : READ),
    dueDate: (isClient) => (isClient ? PROMPT : READ),
    estimate: (isClient) => (isClient ? READ : WRITE),
    description: (isClient) => (isClient ? PROMPT : READ),
  },
  Assigned: {
    dueDate: (isClient, task) => {
      if (!isClient && !task.dueDate) return WRITE;
      return READ;
    },
    estimate: (isClient, task) => {
      if (!isClient && !task.estimate) return WRITE;
      return READ;
    },
  },
};

const getTaskPermission = (task, key, isClient) => {
  const permissions = PERMISSIONS[task.stage];
  if (!permissions) return READ;
  const permission = permissions[key];
  if (!permission) return READ;
  return permission(isClient, task);
};

let timer;

const EditTask = ({
  task,
  readOnly,
  hideStatus,
  onSave,
  isClient,
  isSaving,
  setPrompt,
  projectType,
  showStatusNotice,
}) => {
  const [attributes, setAttributes] = React.useState({
    name: task.name || undefined,
    description: task.description || "",
    dueDate: task.dueDate || null,
    estimate: task.estimate || null,
    flexibleEstimate: task.flexibleEstimate || null,
  });
  const [editAllowed, setEditAllowed] = React.useState(false);
  const [confirmPrompt, setConfirmPrompt] = React.useState(false);
  const [focusedElement, setFocusedElement] = React.useState(null);

  const handleFocus = (input) => (e) => {
    if (readOnly || getTaskPermission(task, input, isClient) === READ) {
      e.preventDefault();
      return;
    }

    setFocusedElement(input);

    if (!editAllowed && getTaskPermission(task, input, isClient) === PROMPT) {
      e.preventDefault();
      e.stopPropagation();
      setConfirmPrompt(true);
      e.target.blur();
      return;
    }
  };

  const handleConfirm = () => {
    setConfirmPrompt(false);
    setEditAllowed(true);
  };

  const handleBlur = (attribute) => () => {
    setEditAllowed(false);
  };

  const handleBlurWithSave = (attribute) => () => {
    handleBlur(attribute)();

    const value = attributes[attribute];
    if ((task[attribute] || undefined) !== value) {
      clearTimeout(timer);
      onSave(attribute, { [attribute]: value });
    }
  };

  const updateField = (attribute, value) => {
    const newData = { ...attributes, [attribute]: value };
    setAttributes(newData);
    return newData;
  };

  const handleChange = (attribute) => (value) => {
    updateField(attribute, value);
    if (task[attribute] !== value) {
      onSave(attribute, { [attribute]: value });
    }
  };

  const handleChangeWithTimeout = (attribute) => (value) => {
    updateField(attribute, value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if ((task[attribute] || undefined) !== value) {
        onSave(attribute, { [attribute]: value });
      }
    }, 1000);
  };

  const titleReadOnly =
    readOnly || getTaskPermission(task, "name", isClient) === READ;
  const dueDateReadOnly =
    readOnly || getTaskPermission(task, "dueDate", isClient) === READ;
  const estimateReadOnly =
    readOnly || getTaskPermission(task, "estimate", isClient) === READ;
  const descriptionReadOnly =
    readOnly || getTaskPermission(task, "description", isClient) === READ;

  return (
    <>
      {confirmPrompt && (
        <Confirmation>
          <ConfirmationContainer>
            <Box paddingBottom="l">
              <Text size="s">
                Editing this task will remove the quote that has been provided.
                Are you sure you want to continue?
              </Text>
            </Box>
            <Button onClick={handleConfirm} mr="xs">
              Continue
            </Button>
            <Button onClick={() => setConfirmPrompt(false)} variant="subtle">
              Cancel
            </Button>
          </ConfirmationContainer>
        </Confirmation>
      )}
      <Div100vh>
        <VerticalLayout>
          <VerticalLayout.Header>
            <Box paddingX="m" paddingTop="60px">
              {!hideStatus && <TaskStatus>{task.stage}</TaskStatus>}
              <Title
                data-testid="nameField"
                onBlur={handleBlurWithSave("name")}
                readOnly={titleReadOnly}
                value={attributes.name}
                onFocus={handleFocus("name")}
                onChange={handleChangeWithTimeout("name")}
                isFocused={editAllowed && focusedElement === "name"}
              />
            </Box>
          </VerticalLayout.Header>
          <VerticalLayout.Content style={{ flexDirection: "column" }}>
            <Scrollable>
              <Box paddingX="m" paddingBottom="m">
                <TaskDetails>
                  <DueDate
                    readOnly={dueDateReadOnly}
                    value={attributes.dueDate}
                    onClick={handleFocus("dueDate")}
                    onClose={handleBlur("dueDate")}
                    onChange={handleChange("dueDate")}
                    isOpen={editAllowed && focusedElement === "dueDate"}
                  />
                  <QuoteInput
                    task={task}
                    isClient={isClient}
                    readOnly={estimateReadOnly}
                    onSubmit={(values) => {
                      updateField("estimate", values.estimate);
                      updateField("flexibleEstimate", values.flexibleEstimate);
                      onSave("estimate", values);
                    }}
                  />
                </TaskDetails>
                <TaskDetailRows task={task} isClient={isClient} />
                {!readOnly && !isClient && !task.application.trialTask && (
                  <MarkAsTrial task={task} isClient={isClient} />
                )}
                <div style={{ marginTop: 16 }}>
                  <Description
                    readOnly={descriptionReadOnly}
                    value={attributes.description}
                    onBlur={handleBlurWithSave("description")}
                    onFocus={handleFocus("description")}
                    onChange={handleChangeWithTimeout("description")}
                    isFocused={editAllowed && focusedElement === "description"}
                  />
                </div>
              </Box>
            </Scrollable>
          </VerticalLayout.Content>
          <VerticalLayout.Footer style={{ background: "white" }}>
            <Box padding="l">
              {!readOnly && showStatusNotice && (
                <StageDescription isClient={isClient} task={task} />
              )}
              {!readOnly && (
                <Actions
                  setPrompt={setPrompt}
                  isClient={isClient}
                  task={task}
                  projectType={projectType}
                />
              )}
            </Box>
            <AnimatePresence>
              {isSaving && (
                <SavingIndicator
                  as={motion.div}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path stroke="currentColor" d="M13 7a6 6 0 11-6-6" />
                  </svg>
                  Saving...
                </SavingIndicator>
              )}
            </AnimatePresence>
          </VerticalLayout.Footer>
        </VerticalLayout>
      </Div100vh>
    </>
  );
};

export default EditTask;
