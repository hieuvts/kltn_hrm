import React, { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import debounce from "lodash.debounce"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./dashboard.scss";

const testData = {
  name: "covid",
  type: "document",
  title: "Covid19Data",
  fields: [
    {
      name: "title",
      type: "string",
      title: "States",
    },
    {
      name: "confirmed",
      type: "number",
      title: "Confirmed",
    },
    {
      name: "death",
      type: "number",
      title: "Death",
    },
  ],
};
export default function Dashboard() {
 
  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(getEmployeeKpiCluster());
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI();
  });

  const dispatch = useDispatch();
  var items = useSelector((state) => state.employeeKpiCluster.employeeKpiClusterList);

  var listItemLabel0 = [];
  var listItemLabel1 = [];
  var listItemLabel2 = [];
  var listItemLabel3 = [];
  
  const addItemToLableList = (items) => {
    items.map((item) => {
      let index = 0;
      switch (item.labels) {
        case 0:
          listItemLabel0.push(item);
          break;
        case 1:
          listItemLabel1.push(item);
          break;
        case 2:
          listItemLabel2.push(item);
          break;
        case 3:
          listItemLabel3.push(item);
          break;
      }
    });
    console.log("done")
  };
  addItemToLableList(items);

  return (
    <div>
      <div className="dbQty">
        <Grid container columnSpacing={3}>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box sx={{ pt: 1, pl: 1 }}>
                <Typography variant="h5">38</Typography>
                <Typography variant="caption">Quantity group 2</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box sx={{ pt: 1, pl: 1 }}>
                <Typography variant="h5">38</Typography>
                <Typography variant="caption">Quantity group 2</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box sx={{ pt: 1, pl: 1 }}>
                <Typography variant="h5">38</Typography>
                <Typography variant="caption">Quantity group 3</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper>
              <Box sx={{ pt: 1, pl: 1 }}>
                <Typography variant="h5">38</Typography>
                <Typography variant="caption">Quantity group 4</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <div className="dbChart">
        <Paper>
          <LineChart
            width={1100}
            height={400}
            data={testData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="death"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </LineChart>
        </Paper>
      </div>
      <div className="dbEmpList">
        <div className="col1">
          <Paper>EmpList 1</Paper>
        </div>
        <div className="col2">
          <Paper>EmpList 2</Paper>
        </div>
        <div className="col3">
          <Paper>EmpList 3</Paper>
        </div>
        <div className="col4">
          <Paper>EmpList 4</Paper>
        </div>
      </div>
    </div>
  );
}
