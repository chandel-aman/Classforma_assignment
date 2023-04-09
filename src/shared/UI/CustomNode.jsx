//REACT
import React, { memo, useContext } from "react";

//CONTEXT
import { WorkFlowContext } from "../context/workflow-context";

//THIRD PARTY IMPORTS
//REACTFLOW
import { Handle, Position } from "reactflow";

//CSS
import classes from "../../styles/customNode.module.css";

const CustomNode = ({ data, isConnectable }) => {
  //context
  const { connectedNodes } = useContext(WorkFlowContext);

  //boolean for checking whether a node is connected or not
  const connected = connectedNodes?.some((id) => id === data.id);

  return (
    <div className={classes["module-container"]}>
      {data.left && (
        <Handle
          type="target"
          position={Position.Top}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
          className={classes.handle}
        />
      )}
      <div
        className={`${classes["module"]} ${
          !connected ? classes.unconnected : ""
        }`}
      >
        <span>
          {data.left ? (
            data.left
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="logout"
            >
              <path d="M12.59,13l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H3a1,1,0,0,0,0,2ZM12,2A10,10,0,0,0,3,7.55a1,1,0,0,0,1.8.9A8,8,0,1,1,12,20a7.93,7.93,0,0,1-7.16-4.45,1,1,0,0,0-1.8.9A10,10,0,1,0,12,2Z"></path>
            </svg>
          )}
        </span>
        <span>{data.label}</span>
        <span>{data.right}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className={classes.handle}
      />
    </div>
  );
};

export default memo(CustomNode);
