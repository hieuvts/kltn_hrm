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
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addTaskAsync } from "../../stores/taskSlice";
import { taskInformationValidationSchema } from "../../utilities/validationSchema";

export default function FormAddTask({
  handleCloseDialog,
  submitButtonText,
  initialValues,
}) {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const [progressSliderValue, setProgressSliderValue] = useState(0);
  const departments = useSelector((state) => state.department.departmentList);
  const employees = useSelector((state) => state.employee.employeeList);
  const projects = useSelector((state) => state.project.projectList);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };
  const dispatch = useDispatch();
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
  console.log("progess slider ", progressSliderValue);
  const FormikWithMUI = () => {
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: taskInformationValidationSchema,
      onSubmit: (values) => {
        dispatch(addTaskAsync(values))
          .unwrap()
          .then((originalPromiseResult) => {
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
        <Box sx= {{display: "flex", justifyContent:"center", marginBottom: "40px"}}>
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
                  id="asignFrom"
                  fullWidth
                  multiple
                  value={formik.values.asignFrom}
                  onChange={(e) => {
                    formik.setFieldValue("asignFrom", e.target.value);
                  }}
                  input={<OutlinedInput id="asignFrom" label="asignFrom" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem
                      key={index}
                      value={employee.fname + " " + employee.lname}
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
                  value={formik.values.projects}
                  onChange={(e) => {
                    formik.setFieldValue("projects", e.target.value);
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
                        formik.touched.endDate && formik.errors.deadline
                      }
                      deadline
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
                  labelId="AsignTo-label"
                  id="AsignTo"
                  fullWidth
                  multiple
                  value={formik.values.asignTo}
                  onChange={(e) => {
                    formik.setFieldValue("AsignTo", e.target.value);
                  }}
                  input={<OutlinedInput id="AsignTo" label="AsignTo" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  sx={{ mb: 3 }}
                >
                  {employees.map((employee, index) => (
                    <MenuItem
                      key={index}
                      value={employee.fname + " " + employee.lname}
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
            SUBMIT
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
        text={"Added new task"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Add task failed!"}
      />
      <FormikWithMUI />
    </div>
  );
}

FormAddTask.propTypes = {
  handleCloseDialog: PropTypes.func,
  submitButtonText: PropTypes.string,
  initialValues: PropTypes.object,
};
FormAddTask.defaultProps = {
  initialValues: {
    name: "",
    asignFrom: [],
    asignTo: [],
    procedureID: [],
    projectID: [],
    priority: "",
    difficulty: "",
    status: "",
    progress: 0,
    deadline: new Date(),
    isDeleted: false,
    employees: [],
    projects: [],
  },
  submitButtonText: "SUBMIT",
};
