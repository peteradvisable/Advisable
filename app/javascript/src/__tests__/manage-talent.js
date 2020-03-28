import { customAlphabet } from "nanoid";
import {
  renderRoute,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "test-utils";
import VIEWER from "../graphql/queries/viewer";
import { mockViewer, mockQuery, mockMutation } from "apolloMocks";
import generateType from "../__mocks__/graphqlFields";
import GET_ACTIVE_APPLICATION from "../views/Booking/getActiveApplication";
import {
  createTask as CREATE_TASK,
  updateTaskName as UPDATE_TASK_NAME,
} from "../graphql/mutations/tasks";
import SET_PROJECT_TYPE from "../views/Booking/ProjectTypeModal/setProjectType";

jest.mock("nanoid");

test("Renders the manage view for a specialist", async () => {
  let viewer = generateType.user();
  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(viewer),
      mockQuery(
        GET_ACTIVE_APPLICATION,
        { id: "rec1234" },
        {
          viewer,
          application: generateType.application({
            id: "rec1234",
            airtableId: "rec1234",
            tasks: [generateType.task({ name: "This is a test task" })],
            project: generateType.project({
              user: generateType.user(),
            }),
            specialist: generateType.specialist(),
          }),
        },
      ),
    ],
  });

  await app.findByText(/test task/i, {}, { timeout: 5000 });
});

test("Renders a tutorial video if it's the first time viewing", async () => {
  const { findByText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(generateType.user()),
      {
        request: {
          query: GET_ACTIVE_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: generateType.user(),
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projecType: "Fixed",
              tasks: [generateType.task({ name: "This is a test task" })],
              project: generateType.project({
                user: generateType.user(),
              }),
              specialist: generateType.specialist(),
            }),
          },
        },
      },
    ],
  });

  await findByText("tutorials.fixedProjects.heading");
});

test("Does not render a tutorial video if the user has completed it", async () => {
  const { findByText, queryByText } = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer: generateType.user({
              completedTutorials: ["fixedProjects"],
            }),
          },
        },
      },
      {
        request: {
          query: GET_ACTIVE_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer: generateType.user(),
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projecType: "Fixed",
              tasks: [generateType.task({ name: "This is a test task" })],
              project: generateType.project({
                user: generateType.user(),
              }),
              specialist: generateType.specialist(),
            }),
          },
        },
      },
    ],
  });

  await findByText("Active Projects"); // wait for page to load
  expect(queryByText("tutorials.fixedProjects.heading")).toBeNull();
});

test("The client can change the project type", async () => {
  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      mockViewer(
        generateType.user({
          completedTutorials: ["fixedProjects"],
        }),
      ),
      mockQuery(
        GET_ACTIVE_APPLICATION,
        {
          id: "rec1234",
        },
        {
          viewer: generateType.user(),
          application: generateType.application({
            id: "rec1234",
            airtableId: "rec1234",
            projecType: "Fixed",
            tasks: [generateType.task({ name: "This is a test task" })],
            project: generateType.project({
              user: generateType.user(),
            }),
            specialist: generateType.specialist(),
          }),
        },
      ),
      mockMutation(
        SET_PROJECT_TYPE,
        {
          application: "rec1234",
          projectType: "Flexible",
          monthlyLimit: 100,
        },
        {
          setTypeForProject: {
            __typename: "SetTypeForProjectPayload",
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              projectType: "Flexible",
              monthlyLimit: 100,
            }),
          },
        },
      ),
    ],
  });

  const button = await app.findByLabelText("Edit project type");
  fireEvent.click(button);
  const flexible = app.getByTestId("flexible");
  fireEvent.click(flexible);
  const limit = app.getByLabelText("Set a monthly hour cap (to 200-hour max)");
  fireEvent.change(limit, { target: { value: "100" } });
  let checkbox = app.getByLabelText(
    "I accept that I will be charged 50% of the monthly limit immediately",
  );
  fireEvent.click(checkbox);
  checkbox = app.getByLabelText(
    "I consent to being charged for all hours I approve within the monthly limit I have specified, until I stop working with Test",
  );
  fireEvent.click(checkbox);
  const submit = app.getByLabelText("Update Project Type");
  fireEvent.click(submit);
  await waitForElementToBeRemoved(checkbox);
  const projectType = app.getByTestId("projectType");
  await waitFor(() => expect(projectType).toHaveTextContent("Flexible"));
});

test("The client can add a task", async () => {
  customAlphabet.mockReturnValue("abc");

  const user = generateType.user();
  const project = generateType.project({ user });
  const specialist = generateType.specialist();
  const application = generateType.application({
    id: "rec1324",
    airtableId: "rec1234",
    project,
    specialist,
  });

  let viewer = generateType.user();

  const app = renderRoute({
    route: "/manage/rec1234",
    graphQLMocks: [
      {
        request: {
          query: VIEWER,
        },
        result: {
          data: {
            viewer,
          },
        },
      },
      {
        request: {
          query: GET_ACTIVE_APPLICATION,
          variables: {
            id: "rec1234",
          },
        },
        result: {
          data: {
            viewer,
            application: generateType.application({
              id: "rec1234",
              airtableId: "rec1234",
              project: generateType.project({
                user: generateType.user(),
              }),
              specialist: generateType.specialist(),
            }),
          },
        },
      },
      {
        request: {
          query: CREATE_TASK,
          variables: {
            input: {
              application: "rec1234",
              id: "tas_abc",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            createTask: {
              __typename: "CreateTaskPayload",
              task: generateType.task({
                id: "tas_abc",
                application,
              }),
              errors: null,
            },
          },
        },
      },
      {
        request: {
          query: UPDATE_TASK_NAME,
          variables: {
            input: {
              id: "tas_abc",
              name: "This is a new task",
            },
          },
        },
        result: {
          data: {
            __typename: "Mutation",
            updateTask: {
              __typename: "UpdateTaskPayload",
              task: generateType.task({
                id: "tas_abc",
                name: "This is a new task",
              }),
              errors: null,
            },
          },
        },
      },
    ],
  });

  const createButton = await app.findByText("Add a project");
  fireEvent.click(createButton);
  const name = app.getByTestId("nameField");
  fireEvent.change(name, { target: { value: "This is a new task" } });
  const close = app.getByLabelText("Close Drawer");
  fireEvent.click(close);
  await app.findByText("This is a new task");
});
