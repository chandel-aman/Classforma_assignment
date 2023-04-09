// REACT
import { createContext } from "react";

//CREATING CONTEXT FOR SELECTED WORKFLOW
export const WorkFlowContext = createContext({
  activeWorkFlow: null,
  workFlowHandler: () => {},
  connectedNodes: null,
  connectedNodesHandler: () => {},
  isLoading: false,
});
