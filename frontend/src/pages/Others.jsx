// Testing authorization services
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDepartmentAsync } from "../stores/departmentSlice";

export default function Others() {
  // const user = useSelector((state) => state.auth);
  // const currentUser = user.currentUser;
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const departments = useSelector((state) => state.department.departmentList);
  const dispatch = useDispatch();
  if (!currentUser.email) {
    console.log("!currentUser", currentUser);
    return <Navigate to="/login" />;
  } else {
    console.log("currentUser", currentUser);
  }
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    dispatch(getDepartmentAsync());
  }, []);
  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="blahfasfd">Chip</InputLabel>
        <Select
          labelId="test-label"
          id="test"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
