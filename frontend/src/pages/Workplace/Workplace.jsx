import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Typography, Button, InputBase } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import MySearchBox from "../../components/StyledSearchBox";

const itemsFromBackend = [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" },
    { id: uuidv4(), content: "Fifth task" }
];
const pathnames = location.pathname.split("/").filter((x) => x);
import CapitalizeFirstLetter from "../../utilities/captitalizeFirstLetter";

const columnsFromBackend = {
    [uuidv4()]: {
        name: "Requested",
        items: itemsFromBackend
    },
    [uuidv4()]: {
        name: "To do",
        items: []
    },
    [uuidv4()]: {
        name: "In Progress",
        items: []
    },
    [uuidv4()]: {
        name: "Done",
        items: []
    }
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
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
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
                items: copiedItems
            }
        });
    }
};

function WorkPlace() {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>

                {pathnames.map((path, idx) => (
                    <Link
                        underline="hover"
                        color="text.primary"
                        href={path}
                        aria-current="page"
                        key={idx}
                    >
                        {CapitalizeFirstLetter(path)}
                    </Link>
                ))}
            </Breadcrumbs>
            <Grid container justifyContent="flex-end" textAlign="right">
                <Grid item xs={12} md={3}>
                    <Button variant="link">
                        <FileUploadOutlinedIcon fontSize="medium" />
                        <Typography variant="h6" sx={{ px: 1 }}>
                            Import
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="link">
                        <FileDownloadOutlinedIcon fontSize="medium" />
                        <Typography variant="h6" sx={{ px: 1 }}>
                            Export
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="contained">
                        <Typography variant="h6" sx={{ px: 1 }}>
                            Add Work
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
                <MySearchBox placeholder="Search for work..." />
                <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                    <DragDropContext
                        onDragEnd={result => onDragEnd(result, columns, setColumns)}
                    >
                        {Object.entries(columns).map(([columnId, column], index) => {
                            return (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
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
                                                            minHeight: 500
                                                        }}
                                                    >
                                                        {column.items.map((item, index) => {
                                                            return (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
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
                                                                                        ? "#191AD2"
                                                                                        : "#1976D2",
                                                                                    color: "white",
                                                                                    ...provided.draggableProps.style
                                                                                }}
                                                                            >
                                                                                {item.content}
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
            </Paper>
        </>
    );
}

export default WorkPlace;
