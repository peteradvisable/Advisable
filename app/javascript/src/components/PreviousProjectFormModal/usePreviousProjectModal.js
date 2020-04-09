import { useRef, useEffect } from "react";
import { useDialogState } from "reakit/Dialog";
import { useHistory, useLocation } from "react-router-dom";

const CREATE_PATH = "/previous_projects/new";
export const PATH_REGEX = /\/previous_projects\/(new|pre).*$/;

export function usePreviousProjectModal(initialPath) {
  const history = useHistory();
  const location = useLocation();
  const initialPathRef = useRef(CREATE_PATH);
  const modal = useDialogState({
    visible: PATH_REGEX.test(location.pathname),
  });

  const returnPath = location.pathname.replace(PATH_REGEX, "");

  useEffect(() => {
    if (modal.visible && !PATH_REGEX.test(location.pathname)) {
      history.push(`${returnPath}${initialPathRef.current}`);
    }

    if (!modal.visible && location.pathname !== returnPath) {
      history.push(returnPath);
    }
  }, [modal.visible]);

  useEffect(() => {
    if (location.pathname === returnPath && modal.visible) {
      modal.hide();
    }

    if (PATH_REGEX.test(location.pathname) && !modal.visible) {
      modal.show();
    }
  }, [location.pathname]);

  return {
    ...modal,
    toggle: () => {
      initialPathRef.current = initialPath;
      modal.toggle();
    },
    atPath: (path) => {
      return {
        ...modal,
        toggle: () => {
          initialPathRef.current = path;
          modal.toggle();
        },
      };
    },
  };
}
