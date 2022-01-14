import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DialogDeleteTask from "./DialogDeleteTask";
import DialogDeleteMultipleTask from "./DialogDeleteMultipleTask";
import DialogUpdateTask from "./DialogUpdateTask";
import {
  setCurrentSelectedTask,
  updateTaskAsync,
} from "../../stores/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Paper, Box, Pagination, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Chip } from "@mui/material";
import { palette } from "@mui/system";
import Divider from "@mui/material/Divider";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Button } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import HelpIcon from "@mui/icons-material/Help";
import { isEmpty } from "lodash";
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
  statusColumn.Pending.items = [];
  statusColumn.InProgress.items = [];
  statusColumn.Finish.items = [];
  items.map((item) => {
    let index = 0;
    switch (item.status) {
      case "Pending":
        statusColumn.Pending.items.push(item);
        break;
      case "In Progress":
        statusColumn.InProgress.items.push(item);
        break;
      case "Finish":
        statusColumn.Finish.items.push(item);
        break;
    }
  });
  console.log(statusColumn);
};
const setBackGroundColor = (item) => {
  let backgroundColor;
  switch (item.status) {
    case "Pending":
      backgroundColor = "#EB5A46";
      break;
    case "In Progress":
      backgroundColor = "#0079BF";
      break;
    case "Finish":
      backgroundColor = "#61BD4F";
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
    let [removed] = sourceItems.splice(source.index, 1);
    let temp = JSON.parse(JSON.stringify(removed));
    temp.status = destColumn.name;
    destItems.splice(destination.index, 0, temp);
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
    let temp = JSON.parse(JSON.stringify(removed));
    copiedItems.splice(destination.index, 0, temp);
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
  const [isDialogDeleteTaskOpen, setDialogDeleteTaskOpen] =
    React.useState(false);
  const [isDialogUpdateTaskOpen, setDialogUpdateTaskOpen] =
    React.useState(false);
  const [isDialogTaskDetailsOpen, setDialogTaskDetailsOpen] =
    React.useState(false);
  const dispatch = useDispatch();
  var items = useSelector((state) => state.task.taskList);
  var selectedTask = useSelector((state) => state.task.currentSelectedTask);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleCloseDialogDeleteTask = () => {
    setDialogDeleteTaskOpen(false);
  };
  const handleCloseDialogUpdateTask = () => {
    setDialogUpdateTaskOpen(false);
  };
  const handleCloseDialogTaskDetails = () => {
    setDialogTaskDetailsOpen(false);
  };
  addItemToColumn(items);
  const [columns, setColumns] = React.useState(statusColumn);

  const CardAction = (currentSelectedTask) => {
    const dispatch = useDispatch();
    return (
      <Box>
        <Button
          variant="link"
          onClick={() => {
            dispatch(setCurrentSelectedTask(currentSelectedTask));
            setDialogUpdateTaskOpen(true);
          }}
        >
          <ModeIcon color="text" size="small" />
        </Button>
        <Button
          variant="link"
          onClick={() => {
            dispatch(setCurrentSelectedTask(currentSelectedTask));
            setDialogDeleteTaskOpen(true);
          }}
        >
          <DeleteIcon color="text" size="small" />
        </Button>
      </Box>
    );
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DialogDeleteTask
        isDialogOpen={isDialogDeleteTaskOpen}
        handleCloseDialog={handleCloseDialogDeleteTask}
      />
      <DialogUpdateTask
        isDialogOpen={isDialogUpdateTaskOpen}
        handleCloseDialog={handleCloseDialogUpdateTask}
      />
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result, columns, setColumns);
          let temp = JSON.parse(JSON.stringify(selectedTask));
          let status = "";
          if (result.destination === null) {
            return;
          }
          switch (result.destination.droppableId) {
            case "Pending":
              status = "Pending";
              break;
            case "InProgress":
              status = "In Progress";
              break;
            case "Finish":
              status = "Finish";
              break;
          }
          temp.status = status;
          dispatch(updateTaskAsync(temp));
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <Paper>
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
                              ? "#e6e6e6"
                              : "#e6e6e6",
                            padding: 15,
                            width: 400,
                            minHeight: "auto",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#e6eeff"
                                          : "white",
                                        color: "#758195",
                                        borderRadius: "10px",
                                        ...provided.draggableProps.style,
                                      }}
                                      onMouseOver={() => {
                                        dispatch(
                                          setCurrentSelectedTask({
                                            currentSelectedTask: item,
                                          })
                                        );
                                      }}
                                    >
                                      <Box sx={{ textAlign: "right" }}>
                                        <Chip
                                          label={item.status}
                                          size="small"
                                          style={{
                                            backgroundColor:
                                              setBackGroundColor(item),
                                            color: "white",
                                          }}
                                        />
                                      </Box>
                                      <Typography
                                        variant="h5"
                                        style={{
                                          color: setBackGroundColor(item),
                                        }}
                                      >
                                        {item.name}
                                      </Typography>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginTop: "15px",
                                        }}
                                        size="small"
                                      >
                                        <AlignVerticalBottomIcon />
                                        <Chip
                                          label={item.priority}
                                          size="small"
                                          style={{
                                            backgroundColor:
                                              setBackGroundColor(item),
                                            color: "white",
                                            marginLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginTop: "2px",
                                        }}
                                        size="small"
                                      >
                                        <HelpIcon />
                                        <Chip
                                          label={item.difficulty}
                                          size="small"
                                          style={{
                                            backgroundColor:
                                              setBackGroundColor(item),
                                            color: "white",
                                            marginLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          marginTop: "2px",
                                        }}
                                        size="small"
                                      >
                                        <AccessAlarmIcon />
                                        <Chip
                                          label={moment(item.dueDate).format(
                                            "DD-MM-YYYY hh:mm"
                                          )}
                                          size="small"
                                          style={{
                                            backgroundColor:
                                              setBackGroundColor(item),
                                            color: "white",
                                            marginLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                      <Divider
                                        variant="middle"
                                        style={{
                                          backgroundColor:
                                            setBackGroundColor(item),
                                          marginTop: "5px",
                                        }}
                                      />
                                      <Box
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <CardAction currentSelectedTask={item} />
                                      </Box>
                                    </Card>
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
              </Paper>
            </Box>
          );
        })}
      </DragDropContext>
    </div>
  );
}
