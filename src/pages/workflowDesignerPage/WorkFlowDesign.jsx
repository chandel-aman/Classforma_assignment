//CUSTOM HOOK
import {
  useState,
  useRef,
  useCallback,
  useContext,
  useEffect,
  memo,
} from "react";

//CONTEXT
import { WorkFlowContext } from "../../shared/context/workflow-context";

//THIRD PARTY IMPORTS
import ReactFlow, {
  Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  updateEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";

//REACT COMPONENTS
import CustomNode from "../../shared/UI/CustomNode";

//CSS
import classes from "../../styles/workFlowDesignPage.module.css";
import Modules from "../../components/Modules";
import "reactflow/dist/style.css";
import "./wfdesign.css";

const nodeTypes = {
  customNode: CustomNode,
};

const WorkFlowDesign = () => {
  //context
  const { isLoading, activeWorkFlow, connectedNodesHandler } =
    useContext(WorkFlowContext);

  //ref
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);

  //state variable
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  useEffect(() => {
    if (!isLoading && activeWorkFlow) {
      // console.log(activeWorkFlow);
      const initialNode = [
        {
          id: activeWorkFlow?.id,
          type: "customNode",
          data: {
            label: "Input",
            left: null,
            right: activeWorkFlow?.input_type,
            id: activeWorkFlow?.id,
          },
          position: { x: 250, y: 1 },
        },
      ];
      setNodes(initialNode);
      // console.log(initialNode);
    }
  }, [isLoading, activeWorkFlow]);

  //edge connect handler
  const onConnect = (params) => {
    const newEdge = {
      ...params,
      arrowHeadType: "arrowclosed",
    };
    
    setEdges((eds) => addEdge(newEdge, eds));
  };

  /*
    Edge update handlers
  */

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  //node drag handler
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  //module drop handler
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");
      const parsedData = JSON.parse(data);
      // check if the dropped element is valid
      if (!parsedData) return;
      if (typeof parsedData.type === "undefined" || !parsedData.type) {
        return;
      }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: parsedData.id,
        type: parsedData.type,
        position,
        data: {
          left: parsedData.left,
          label: parsedData.label,
          right: parsedData.right,
          id: parsedData.id,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // NODE DELETE HANDLER
  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     console.log(deleted)
  //     const deletable = deleted.filter((node) => node.data.left != null);
  //     console.log(deletable)

  //     if (deletable.length > 0) {
  //       setEdges(
  //         deletable.reduce((acc, node) => {
  //           const incomers = getIncomers(node, nodes, edges);
  //           const outgoers = getOutgoers(node, nodes, edges);
  //           const connectedEdges = getConnectedEdges([node], edges);

  //           const remainingEdges = acc.filter(
  //             (edge) => !connectedEdges.includes(edge)
  //           );

  //           const createdEdges = incomers.flatMap(({ id: source }) =>
  //             outgoers.map(({ id: target }) => ({
  //               id: `${source}->${target}`,
  //               source,
  //               target,
  //             }))
  //           );

  //           return [...remainingEdges, ...createdEdges];
  //         }, edges)
  //       );
  //     }
  //   },
  //   [nodes, edges]
  // );

  useEffect(() => {
    const connected = new Set();
    if (edges.length > 0) {
      edges.forEach((edge) => connected.add(edge.target));
      connected.add(activeWorkFlow?.id);
      connectedNodesHandler(connected);
    }
  }, [edges, connectedNodesHandler, activeWorkFlow]);

  return (
    <div className={classes["workflow-design"]}>
      <header>
        <header className={classes["header"]}>
          <span>
            Workflow name: {activeWorkFlow ? activeWorkFlow.name : ""}
          </span>
        </header>
      </header>
      <div className={classes.container}>
        <div className={classes.modules}>
          <div className={classes["module-header"]}>
            <h5>Modules</h5>
          </div>
          <Modules />
        </div>
        <ReactFlowProvider>
          <div className={classes.canvas} ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              // onNodesDelete={onNodesDelete}
              onEdgesChange={onEdgesChange}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background variant="dots" gap={8} size={1} color="#96b7d6" />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default memo(WorkFlowDesign);
