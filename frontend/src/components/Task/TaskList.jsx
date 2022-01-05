import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import DialogDeleteTask from "./DialogDeleteTask";
import DialogDeleteMultipleTask from "./DialogDeleteMultipleTask";
import DialogUpdateTask from "./DialogUpdateTask";
import {
  setCurrentSelectedTask,
  addToSelectedTaskList,
  removeFromSelectedTaskList,
  setMultiSelectedTaskList,
} from "../../stores/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" },
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "Fourth task" },
  { id: uuidv4(), content: "Fifth task" },
];

const statusColumn = {
  ["Pending"]: {
    name: "Pending",
    items: [],
  },
  ["InProgress"]: {
    name: "In Progress",
    items: [],
  },
  ["Finish"]: {
    name: "Finish",
    items: [],
  },
};

const addItemToColumn = (items) => {
  console.log("statusColumn before ", statusColumn);
  let itemsA = statusColumn;
  items.map((item) => {
    switch (item.status) {
      case "Pending":
        console.log("Case Pending");
        statusColumn.Pending.items.push(item);
        break;
      case "In Progress":
        console.log("Case In Progress");
        // statusColumn.InProgress.items.push(item);
        statusColumn.InProgress.items.concat(item);
        break;
      case "Finish":
        console.log("Case Finish ");
        statusColumn.Finish.items.push(item);
        break;
    }
  });
};
const setBackGroundColor = (item) => {
  let backgroundColor;
  switch (item.status) {
    case "Pending":
      backgroundColor = "#F1C40F";
      break;
    case "In Progress":
      backgroundColor = "#3498DB";
      break;
    case "Finish":
      backgroundColor = "#1CBC90";
      break;
  }
  return backgroundColor;
};
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};
export default function TaskList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setRowsPerPage] = React.useState(5);
  const [isDialogDeleteTaskOpen, setDialogDeleteTaskOpen] =
    React.useState(false);
  const [isDialogDeleteMultipleTaskOpen, setDialogDeleteMultipleTaskOpen] =
    React.useState(false);
  const [isDialogUpdateTaskOpen, setDialogUpdateTaskOpen] =
    React.useState(false);
  const [isDialogTaskDetailsOpen, setDialogTaskDetailsOpen] =
    React.useState(false);
  const dispatch = useDispatch();
  var items = useSelector((state) => state.task.taskList);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  addItemToColumn(items);
  const [columns, setColumns] = React.useState(statusColumn);
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              // key={item._id}
                              key={index}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : setBackGroundColor(item),
                                      color: "white",
                                      borderRadius: "10px",
                                      ...provided.draggableProps.style,
                                    }}
                                    onClick={console.log(item._id)}
                                  >
                                    {item.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
