import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ModeIcon from "@mui/icons-material/Mode";
import Avatar from "@mui/material/Avatar";
import { visuallyHidden } from "@mui/utils";

import DialogEmployeeDetails from "../DialogEmployeeDetails";
import moment from "moment";

import { setCurrentSelectedEmployee } from "../../../stores/employeeSlice"; 
import { useDispatch, useSelector } from "react-redux";

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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "kpi",
    numeric: false,
    disablePadding: false,
    label: "KPI",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={() => onSelectAllClick()}
            inputProps={{
              "aria-label": "select all employees",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, setSelected,  } =
    props;
  const dispatch = useDispatch();
  // Get selectedEmployeeList to delete multiple, delete all
  const selectedEmployeeList = useSelector((state) => state.employee);
  const auth = useSelector((state) => state.auth);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default function EmployeeKpiClusterList({initialValues}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [isDialogEmployeeDetailsOpen, setDialogEmployeeDetailsOpen] =
      React.useState(false);
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = items.map((n) => n.id);
        // Select all -> add all employee (equals to 'items') to the selectedEmployeeList
        return;
      }
      setSelected([]);
    };
    var items = initialValues;
    const handleClick = (event, employee) => {
      const id = employee.id;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        // If employee is not in selectedList -> add to it
        newSelected = newSelected.concat(selected, id);
        dispatch(addToSelectedEmployeeList({ selectedEmployee: employee }));
      } else if (selectedIndex === 0) {
        // If undo checkbox at first selected row
        newSelected = newSelected.concat(selected.slice(1));
        dispatch(
          removeFromSelectedEmployeeList({ selectedEmployee: employee })
        );
      } else if (selectedIndex === selected.length - 1) {
        // If undo checkbox at last selected row
        newSelected = newSelected.concat(selected.slice(0, -1));
        dispatch(
          removeFromSelectedEmployeeList({ selectedEmployee: employee })
        );
      } else if (selectedIndex > 0) {
        // If undo checkbox at another selected row
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
        dispatch(
          removeFromSelectedEmployeeList({ selectedEmployee: employee })
        );
      }
      setSelected(newSelected);
    };
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty items.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const handleCloseDialogEmployeeDetails = () => {
      setDialogEmployeeDetailsOpen(false);
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

    return (
        <>
          <DialogEmployeeDetails
            isDialogOpen={isDialogEmployeeDetailsOpen}
            handleCloseDialog={handleCloseDialogEmployeeDetails}
          />
          <Box sx={{ width: "100%"}}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar
                numSelected={selected.length}
                setSelected={setSelected}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 300 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={() => handleSelectAllClick(event)}
                    onRequestSort={handleRequestSort}
                    rowCount={items.length}
                  />
                  <TableBody>
                    {items
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => {
                        const isItemSelected = isSelected(item.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={index}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="right"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    paddingLeft: "15px",
                                    color: setBackGroundColor(item.lables),
                                  }}
                                >
                                  {item.Employee.fname} {item.Employee.lname}
                                </p>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              <p
                                style={{
                                  color: setBackGroundColor(item.lables),
                                }}
                              >
                                {item.kpi}
                              </p>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 53 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage="Employees per page"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </>
      );
}
EmployeeKpiClusterList.propTypes = {
  initialValues: PropTypes.array,
}
EmployeeKpiClusterList.defaultProps = {
  initialValues: []
}