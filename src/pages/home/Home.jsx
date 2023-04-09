//REACT ROUTER
import { useNavigate } from "react-router";

//CSS
import classes from "../../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.home}>
      <button onClick={() => navigate("/workflow-list")}>
        Click to see the Workflow List
      </button>
    </div>
  );
};

export default Home;
