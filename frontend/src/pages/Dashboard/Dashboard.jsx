import React, { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import debounce from "lodash.debounce";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./dashboard.scss";
import EmployeeKpiClusterList from "../../components/Employee/EmployeeKpiCluster/EmployeKpiClusterList";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import {
  getDataFromCSV,
  importDataFromCSV,
  getEmployeeKpiCluster,
} from "../../stores/employeeKpiClusterSlice";

import SnackbarFailed from "../../components/Snackbar/SnackbarFailed";
import SnackbarSuccess from "../../components/Snackbar/SnackbarSuccess";

export default function Dashboard() {
  const [isSbSuccessOpen, setSbSuccessOpen] = useState(false);
  const [isSbFailedOpen, setSbFailedOpen] = useState(false);
  const handleSbSuccessClose = () => {
    setSbSuccessOpen(false);
  };
  const handleSbFailedClose = () => {
    setSbFailedOpen(false);
  };

  const handleFileUpload =  async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    var jsonOut = {};
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      jsonOut = XLSX.utils.sheet_to_json(ws,{raw:true});
      dispatch(getDataFromCSV(jsonOut))
      .unwrap()
      .then(() => {
        dispatch(importDataFromCSV())
        .then(()=> dispatch(getEmployeeKpiCluster()));
        setSbSuccessOpen(true);
      })
      .catch((rejectedValueOrSerializedError) => {
        setSbFailedOpen(true);
      })
    };
    reader.readAsBinaryString(file);;
  };

  const debounceFetchAPI = useCallback(
    debounce((searchQuery) => {
      dispatch(getEmployeeKpiCluster());
    }, 350),
    []
  );
  useEffect(() => {
    debounceFetchAPI();
  }, []);

  const dispatch = useDispatch();
  var items = useSelector(
    (state) => state.employeeKpiCluster.employeeKpiClusterList
  );

  const listItem = {
    ["label0"]: {
      centoroid: 0,
      label: 0,
      items: [],
    },
    ["label1"]: {
      name: 0,
      label: 1,
      items: [],
    },
    ["label2"]: {
      name: 0,
      label: 2,
      items: [],
    },
    ["label3"]: {
      name: 0,
      label: 3,
      items: [],
    },
  };

  const setBackGroundColor = (labels) => {
    let backgroundColor;
    switch (labels) {
      case 0:
        backgroundColor = "#EB5A46";
        break;
      case 1:
        backgroundColor = "#5b4496";
        break;
      case 2:
        backgroundColor = "#0079BF";
        break;
      case 3:
        backgroundColor = "#61BD4F";
        break;
    }
    return backgroundColor;
  };

  const addItemToLableList = (items) => {
    items.map((item) => {
      switch (item.lables) {
        case 0:
          listItem.label0.centoroid = item.centoroid.toFixed(4);
          listItem.label0.items.push(item);
          break;
        case 1:
          listItem.label1.centoroid = item.centoroid.toFixed(4);
          listItem.label1.items.push(item);
          break;
        case 2:
          listItem.label2.centoroid = item.centoroid.toFixed(4);
          listItem.label2.items.push(item);
          break;
        case 3:
          listItem.label3.centoroid = item.centoroid.toFixed(4);
          listItem.label3.items.push(item);
          break;
      }
    });
  };

  addItemToLableList(items);
  var data = [];
  data.push(listItem.label0);
  data.push(listItem.label1);
  data.push(listItem.label2);
  data.push(listItem.label3);

  const FileUploader = (props) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = (event) => {
      hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
      const fileUploaded = event.target.files[0];
      props.handleFile(fileUploaded);
    };
    return (
      <>
        <Button variant="outlined" onClick={handleClick}>
          <FileDownloadOutlinedIcon fontSize="medium" />
          <Typography variant="h6" sx={{ pl: 1 }}>
            Import
          </Typography>
        </Button>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          ref={hiddenFileInput}
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </>
    );
  };
  FileUploader.propTypes = {
    handleFile: PropTypes.any,
  };
  const MainContent = () => {
    return (
      <div>
        <Grid
          container
          justifyContent="flex-end"
          textAlign={{ sm: "right", md: "center" }}
          padding={{ sm: 5, md: 0 }}
          sx={{ alignItems: "center" }}
        >
          <Grid item xs={12} sm={3} md={2} paddingTop={{ xs: 2, sm: 0 }}>
            <FileUploader />
          </Grid>
        </Grid>
        <div className="dbQty">
          <Grid container columnSpacing={3}>
            <Grid item xs={12} md={3}>
              <Paper>
                <Box sx={{ pt: 1, pl: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    style={{
                      color: setBackGroundColor(listItem.label0.label),
                    }}
                  >
                    KPI Center {listItem.label0.centoroid}{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: setBackGroundColor(listItem.label0.label),
                    }}
                  >
                    Quantity: {listItem.label0.items.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper>
                <Box sx={{ pt: 1, pl: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    style={{
                      color: setBackGroundColor(listItem.label1.label),
                    }}
                  >
                    KPI Center {listItem.label1.centoroid}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: setBackGroundColor(listItem.label1.label),
                    }}
                  >
                    Quantity: {listItem.label1.items.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper>
                <Box sx={{ pt: 1, pl: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    style={{
                      color: setBackGroundColor(listItem.label2.label),
                    }}
                  >
                    KPI Center {listItem.label2.centoroid}{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: setBackGroundColor(listItem.label2.label),
                    }}
                  >
                    Quantity: {listItem.label2.items.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper>
                <Box sx={{ pt: 1, pl: 1, textAlign: "center" }}>
                  <Typography
                    variant="caption"
                    style={{
                      color: setBackGroundColor(listItem.label3.label),
                    }}
                  >
                    KPI Center {listItem.label3.centoroid}{" "}
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      color: setBackGroundColor(listItem.label3.label),
                    }}
                  >
                    Quantity: {listItem.label3.items.length}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div
          className="dbChart"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Paper>
            <BarChart
              width={1200}
              height={390}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="centoroid" label="KPI Center" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="items.length" fill="#8884d8" name="Amount" />
            </BarChart>
          </Paper>
        </div>
        <div className="dbEmpList">
          <div className="col1">
            <Paper>
              <EmployeeKpiClusterList initialValues={listItem.label0.items} />
            </Paper>
          </div>
          <div className="col2">
            <Paper>
              <EmployeeKpiClusterList initialValues={listItem.label1.items} />
            </Paper>
          </div>
          <div className="col3">
            <Paper>
              <EmployeeKpiClusterList initialValues={listItem.label2.items} />
            </Paper>
          </div>
          <div className="col4">
            <Paper>
              <EmployeeKpiClusterList initialValues={listItem.label3.items} />
            </Paper>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <SnackbarSuccess
        isOpen={isSbSuccessOpen}
        handleClose={handleSbSuccessClose}
        text={"Import Data Success"}
      />
      <SnackbarFailed
        isOpen={isSbFailedOpen}
        handleClose={handleSbFailedClose}
        text={"Import Data Failed"}
      />
      <MainContent/>
    </div>
  );
}
