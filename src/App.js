//REACT ROUTER
import { Routes, Route } from "react-router-dom";

//CONTEXT
import { WorkFlowContext } from "./shared/context/workflow-context";

//CUSTOM HOOK
import { useWorkFlow } from "./shared/hooks/workflow-hook";

//REACT COMPONENTS
import Home from "./pages/home/Home";
import WorkFlowDesign from "./pages/workflowDesignerPage/WorkFlowDesign";
import WorkFlows from "./pages/workflowListPage/WorkFlows";
import React from "react";

const App = () => {
  //EXTRACTING FROM THE WORKFLOW CONTEXT
  const {
    activeWorkFlow,
    workFlowHandler,
    connectedNodes,
    connectedNodesHandler,
    isLoading,
  } = useWorkFlow();

  return (
    <WorkFlowContext.Provider
      value={{
        activeWorkFlow,
        workFlowHandler,
        connectedNodes,
        connectedNodesHandler,
        isLoading,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workflow-list" element={<WorkFlows />} />
        <Route path="/workflow-design" element={<WorkFlowDesign />} />
      </Routes>
    </WorkFlowContext.Provider>
  );
};

export default App;
