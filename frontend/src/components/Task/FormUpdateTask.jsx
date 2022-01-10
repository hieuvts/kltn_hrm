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


  const initprojectValue = formikInitialValues["project"].map(
    ({ name }) => ({ name })
  );

  const projectNameArr = initprojectValue.map((x) => x.name);
  delete formikInitialValues.project;
  formikInitialValues["project"] = projectNameArr;
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
              < FormControl fullWidth>
                <InputLabel id="assignFrom-label">Assign from</InputLabel>
                <Select
                  labelId="assignFrom-label"
                  id="assignFrom"
                  fullWidth
                  multiple
                  value={formik.values.assignFrom}
                  onChange={(e) => {
                    formik.setFieldValue("assignFrom", e.target.value);
                  }}
                  input={<OutlinedInput id="assignFrom" label="assignFrom" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value.fname + " " + value.lname} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem
                      key={index}
                      value={employee}
                    >
                      {employee.fname + " " + employee.lname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* <FormControl fullWidth>
                  <InputLabel id="procedure-label">Procedure</InputLabel>
                  <Select
                    labelId="procedure-label"
                    id="procedures"
                    fullWidth
                    multiple
                    value={formik.values.procedures}
                    onChange={(e) => {
                      formik.setFieldValue("procedures", e.target.value);
                    }}
                    input={<OutlinedInput id="procedures" label="Procedure" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    sx={{ mb: 3 }}
                  >
                    {procedures.map((procedure, index) => (
                      <MenuItem key={index} value={procedure.name}>
                        {procedure.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}

              <FormControl fullWidth>
                <InputLabel id="project-label">Projects</InputLabel>
                <Select
                  labelId="project-label"
                  id="projects"
                  fullWidth
                  multiple
                  value={formik.values.project}
                  onChange={(e) => {
                    formik.setFieldValue("project", e.target.value);
                  }}
                  input={<OutlinedInput id="project" label="Project" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {projects.map((project, index) => (
                    <MenuItem key={index} value={project.name}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  id="deadline"
                  name="deadLine"
                  label="Deadline"
                  value={formik.values.deadline}
                  minDate={new Date("1900-01-01")}
                  onChange={(value) => {
                    formik.setFieldValue("deadline", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.deadline &&
                        Boolean(formik.errors.deadline)
                      }
                      helperText={
                        formik.touched.deadline && formik.errors.deadline
                      }
                      fullWidth
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
                <InputLabel id="assignTo-label">Asign To</InputLabel>
                <Select
                  labelId="AsignTo-label"
                  id="assignTo"
                  fullWidth
                  multiple
                  value={formik.values.assignTo}
                  onChange={(e) => {
                    console.log("update assignTookie ", formik.values.assignTo)
                    formik.setFieldValue("assignTo", e.target.value);
                  }}
                  input={<OutlinedInput id="assignTo" label="assignTo" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value.fname + " " + value.lname} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem
                      key={index}
                      value={employee}
                    >
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
