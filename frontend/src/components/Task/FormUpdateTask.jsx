import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import DateTimePicker from "@mui/lab/DateTimePicker";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SnackbarSuccess from "../Snackbar/SnackbarSuccess";
import SnackbarFailed from "../Snackbar/SnackbarFailed";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTaskAsync,
  getTaskAsync,
  setCurrentSelectedTask,
} from "../../stores/taskSlice";
import { taskInformationValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

export default function FormUpdateTask({ handleCloseDialog, initialValues }) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const tasks = useSelector((state) => state.task.taskList);
  const employees = useSelector((state) => state.employee.employeeList);
  const projects = useSelector((state) => state.project.projectList);
  var formikInitialValues = { ...initialValues };

// delete formikInitialValues.assignFrom;
// delete formikInitialValues.assignTo;
// formikInitialValues["assignFrom"] =  assignFromNameArr;
// formikInitialValues["assignTo"] =  assignToNameArr;

  const progressSliderMarks = [
    {
      value: 0,
      label: "Init",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];
  const getProgressSliderValue = (value) => {
    return `${value}`;
  };
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const dispatch = useDispatch();

  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: formikInitialValues,
      validationSchema: taskInformationValidationSchema,
      onSubmit: (values) => {
        dispatch(updateTaskAsync(values))
          .unwrap()
          .then(() => {
            dispatch(
              setCurrentSelectedTask({
                currentSelectedTask: values,
              })
            );
            dispatch(getTaskAsync());
            setSbSuccessOpen(true);
            setTimeout(() => {
              handleCloseDialog();
            }, 800);
          })
          .catch((rejectedValueOrSerializedError) => {
            setSbFailedOpen(true);
          });
      },
    });
    return (
      <div style={{ marginTop: "30px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <Slider
              aria-label="progessSlider"
              defaultValue={0}
              getAriaValueText={getProgressSliderValue}
              step={10}
              valueLabelDisplay="on"
              marks={progressSliderMarks}
            />
          </Box>
          <Grid container rowSpacing={3} columnSpacing={3}>
            <Grid item sm={12} md={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Task Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 3 }}
              />
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <MenuItem value={"Pending"}>Pending</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Finish"}>Finish</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="asignFrom-label">Assign from</InputLabel>
                <Select
                  labelId="asignFrom-label"
                  id="assignerID"
                  name="assignerID"
                  label="Assign from"
                  fullWidth
                  value={formik.values.assignerID}
                  onChange={formik.handleChange}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem key={index} value={employee.id}>
                      {employee.fname + " " + employee.lname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

               <FormControl fullWidth>
                <InputLabel id="project-label">Project</InputLabel>
                <Select
                  labelId="project-label"
                  id="projectID"
                  name="projectID"
                  label="Project"
                  fullWidth
                  value={formik.values.projectID}
                  onChange={formik.handleChange}
                >
                  {projects.map((project, index) => (
                    <MenuItem key={index} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  id="dueDate"
                  name="dueDate"
                  label="Due date"
                  inputFormat="dd/MM/yyyy"
                  value={formik.values.dueDate}
                  minDate={new Date("1900-01-01")}
                  onChange={(value) => {
                    formik.setFieldValue("dueDate", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.dueDate && Boolean(formik.errors.dueDate)
                      }
                      helperText={
                        formik.touched.endDate && formik.errors.dueDate
                      }
                      dueDate
                      sx={{ mb: 3 }}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormControl fullWidth>
                <InputLabel id="difficulty-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-label"
                  id="difficulty"
                  name="difficulty"
                  label="Difficulty"
                  value={formik.values.difficulty}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"Extra"}>Extra</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="asignTo-label">Asign To</InputLabel>
                <Select
                  labelId="asignFrom-label"
                  id="assigneeID"
                  name="assigneeID"
                  label="Assign from"
                  fullWidth
                  value={formik.values.assigneeID}
                  onChange={formik.handleChange}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem key={index} value={employee.id}>
                      {employee.fname + " " + employee.lname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="p-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  name="priority"
                  label="Priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"Extra"}>Extra</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" fullWidth type="Update">
            Update
          </Button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Updated project information"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Update failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormUpdateTask.propTypes = {
  handleCloseDialog: PropTypes.func,
  initialValues: PropTypes.object,
};
FormUpdateTask.defaultProps = {
  initialValues: {
    name: "",
    assignFrom: [],
    assignTo: [],
    procedureID: [],
    priority: "",
    difficulty: "",
    status: "",
    progress: 0,
    deadline: new Date(),
    isDeleted: false,
    employees: [],
    project: [],
  },
  submitButtonText: "SUBMIT",
};