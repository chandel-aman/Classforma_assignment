//REACT
import { useContext, useEffect, useState } from "react";

//REACT ROUTER
import { useNavigate } from "react-router";

//CUSTOM HOOK
import { useHttpClient } from "../../shared/hooks/http-hook";

//CONTEXT
import { WorkFlowContext } from "../../shared/context/workflow-context";

/*
THIRD PARTY IMPORTS
*/
//DAYJS
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

//CSS
import classes from "../../styles/workflowlist.module.css";

dayjs.extend(utc);

const WorkFlows = () => {
  //STATE VARIABLE
  const [wfListData, setWFListData] = useState([]);

  //EXTRACTING FN FROM HTTP HOOK
  const { sendRequest } = useHttpClient();

  //EXTRACTING FN FROM WORKFLOW HOOK
  const { workFlowHandler } = useContext(WorkFlowContext);

  //NAVIGATE
  const navigate = useNavigate();

  //FETCHING THE WORKFLOW LIST DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          "https://64307b10d4518cfb0e50e555.mockapi.io/workflow"
        );
        // console.log(responseData);
        setWFListData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //WORKFLOW SELECT HANDLER
  const handleWorkFlow = (wfObj) => {
    // console.log(wfObj);
    workFlowHandler(wfObj);
    navigate("/workflow-design");
  };

  return (
    <div className={classes["workflow-list"]}>
      <header className={classes["header"]}>
        <span>Workflows</span>
      </header>
      <div className={classes["table-container"]}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Input Type</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            {wfListData &&
              wfListData.length > 0 &&
              wfListData.map((user, index) => {
                const dateObj = dayjs.utc(user.createdAt);
                const formattedDate = dateObj.format("YYYY-MM-DD");
                return (
                  <tr
                    key={user.name + index}
                    onClick={() => handleWorkFlow(user)}
                  >
                    <td>{user.name}</td>
                    <td>{user.input_type}</td>
                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkFlows;
