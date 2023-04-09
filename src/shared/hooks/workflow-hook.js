//REACT
import { useCallback, useState, useEffect } from "react";

export const useWorkFlow = () => {
  const [activeWorkFlow, setActiveWorkFlow] = useState(null);
  const [connectedNodes, setConnectedNodes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //ACTIVE WORKFLOW HANDLER
  const workFlowHandler = useCallback((workflow) => {
    if (workflow) {
      setActiveWorkFlow(workflow);
      localStorage.setItem(
        "workflow",
        JSON.stringify({
          workflow: workflow,
        })
      );
      setIsLoading(false);
    }
  });

  //adding the input node to the connected nodes as it is always valid
  useEffect(() => {
    if (activeWorkFlow) {
      setConnectedNodes([activeWorkFlow.id]);
    }
  }, [activeWorkFlow]);

  //CONNECTED NODES HANDLER
  const connectedNodesHandler = useCallback((connectedNodes) => {
    const connectedNodesArray = Array.from(connectedNodes);
    if (connectedNodesArray.length > 0) {
      setConnectedNodes(connectedNodesArray);
    }
  });

  useEffect(() => {
    setIsLoading(true);
    const storedData = JSON.parse(localStorage.getItem("workflow"));
    if (storedData && storedData.workflow) {
      workFlowHandler(storedData.workflow);
    }
  }, []);

  return {
    activeWorkFlow,
    workFlowHandler,
    connectedNodes,
    connectedNodesHandler,
    isLoading
  };
};
