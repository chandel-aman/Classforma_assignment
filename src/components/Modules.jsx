//REACT
import { useState, useEffect } from "react";

//CUSTOM HOOK
import { useHttpClient } from "../shared/hooks/http-hook";

//react-paginate
import ReactPaginate from "react-paginate";

//css
import classes from "../styles/module.module.css";

const Modules = (props) => {
  //state variable
  const [itemOffset, setItemOffset] = useState(0);
  const [module, setModule] = useState([]);

  //EXTRACTING FN FROM HTTP HOOK
  const { sendRequest } = useHttpClient();

  const itemsPerPage = 5;
  const TOTAL_ITEMS = 99;
  const pageCount = Math.ceil(TOTAL_ITEMS / itemsPerPage);

  //FETCHING THE WORKFLOW LIST DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${
            itemOffset + 1
          }&limit=5`
        );
        // console.log(responseData);
        setModule(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [itemOffset, setModule]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % module.length;
    setItemOffset(event.selected);
    console.log(event);
  };

  //drag handler
  const onDragStart = (event, data) => {
    // console.log(data);
    event.dataTransfer.setData("application/reactflow", data);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={classes["module-body"]}>
      <aside>
        {module &&
          module.length > 0 &&
          module.map((data) => {
            const nodeData = JSON.stringify({
              id: data.id,
              left: data.input_type,
              label: data.name,
              right: data.output_type,
              type: "customNode",
            });

            return (
              <div
                className={classes["module"]}
                onDragStart={(event) => onDragStart(event, nodeData)}
                draggable
                key={data.id}
              >
                <span>{data.input_type}</span>
                <span>{data.name}</span>
                <span>{data.output_type}</span>
              </div>
            );
          })}
      </aside>
      <div className={classes["pagination-container"]}>
        <ReactPaginate
          breakLabel="..."
          previousLabel={"< "}
          nextLabel={" >"}
          pageCount={pageCount}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={classes.pagination}
          activeClassName={classes.pagination_active}
          disabledClassName={classes.disabled}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Modules;
