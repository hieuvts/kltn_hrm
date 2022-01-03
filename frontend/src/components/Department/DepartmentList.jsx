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
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import ModeIcon from "@mui/icons-material/Mode";
import { visuallyHidden } from "@mui/utils";
import DialogDeleteDepartment from "./DialogDeleteDepartment";
import DialogDeleteMultipleDepartment from "./DialogDeleteMultipleDepartment";
import DialogUpdateDepartment from "./DialogUpdateDepartment";
// import DialogEmployeeDetails from "./DialogEmployeeDetails";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";

import {
  setCurrentSelectedDepartment,
  addToSelectedDepartmentList,
  removeFromSelectedDepartmentList,
  setMultiSelectedDepartmentList
} from "../../stores/departmentSlice";

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

const titleCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "DEPARTMENT NAME",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: true,
    label: "AMOUNT OF EMPLOYEE",
  },
  {
    id: "manager",
    numeric: false,
    disablePadding: false,
    label: "MANAGER",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "Actions"
  }
];

function DepartmentTableHead(props) {
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
              "aria-label": "select all department",
            }}
          />
        </TableCell>
        {titleCells.map((titleCell) => (
          <TableCell
            key={titleCell.id}
            align={"center"}
            padding={titleCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === titleCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === titleCell.id}
              direction={orderBy === titleCell.id ? order : "asc"}
              onClick={createSortHandler(titleCell.id)}
            >
              {titleCell.label}
              {orderBy === titleCell.id ? (
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

DepartmentTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, setSelected, setDialogDeleteMultipleDepartmentOpen } = props;
  const dispatch = useDispatch();

  // Get selectedDepartmentList to delete multiple, delete all
  const selectedDepartmentList = useSelector(
    (state) => state.department.selectedDepartmentList
  );
  const handleDeleteMultipleDepartment = () => {
    setDialogDeleteMultipleDepartmentOpen(true);
  };

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
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Department List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete multiple">
          <IconButton onClick={() => handleDeleteMultipleDepartment()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  setDialogDeleteMultipleDepartmentOpen: PropTypes.func.isRequired
};

export default function DepartmentTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isDialogDeleteDepartmentOpen, setDialogDeleteDepartmentOpen] =
    React.useState(false);
  const [
    isDialogDeleteMultipleDepartmentOpen,
    setDialogDeleteMultipleDepartmentOpen,
  ] = React.useState(false);
  const [isDialogUpdateDepartmentOpen, setDialogUpdateDepartmentOpen] =
    React.useState(false);
  // const [isDialogEmployeeDetailsOpen, setDialogEmployeeDetailsOpen] =
  //   React.useState(false);
  const dispatch = useDispatch();
  var rows = useSelector((state) => state.department.departmentList);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      // Select all -> add all employee (equals to 'rows') to the selectedEmployeeList
      dispatch(setMultiSelectedDepartmentList(rows));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, department) => {
    const id = department._id;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      dispatch(addToSelectedDepartmentList({ selectedDepartment: department }));
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      dispatch(removeFromSelectedDepartmentList({ selectedDepartment: department }));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      dispatch(removeFromSelectedDepartmentList({ selectedDepartment: department }));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      dispatch(removeFromSelectedDepartmentList({ selectedDepartment: department }));
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
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleCloseDialogDeleteDepartment = () => {
    setDialogDeleteDepartmentOpen(false);
  };
  const handleCloseDialogDeleteMultipleDepartment = () => {
    setDialogDeleteMultipleDepartmentOpen(false);
  };
  const handleCloseDialogUpdateDepartment = () => {
    setDialogUpdateDepartmentOpen(false);
  };

  const RowActions = (currentSelectedDepartment) => {
    return (
      <Box>
        <Button
          variant="link"
          onClick={() => {
            dispatch(setCurrentSelectedDepartment(currentSelectedDepartment));
            setDialogUpdateDepartmentOpen(true);
          }}
        >
          <ModeIcon color="primary" />
        </Button>
        <Button
          variant="link"
          onClick={() => {
            dispatch(setCurrentSelectedDepartment(currentSelectedDepartment));
            setDialogDeleteDepartmentOpen(true);
          }}
        >
          <DeleteIcon color="primary" />
        </Button>
      </Box>
    );
  };

  return (
    <>
      <DialogDeleteDepartment
        isDialogOpen={isDialogDeleteDepartmentOpen}
        handleCloseDialog={handleCloseDialogDeleteDepartment}
      />
      <DialogDeleteMultipleDepartment
        setSelected={setSelected}
        isDialogOpen={isDialogDeleteMultipleDepartmentOpen}
        handleCloseDialog={handleCloseDialogDeleteMultipleDepartment}
      />
      <DialogUpdateDepartment
        isDialogOpen={isDialogUpdateDepartmentOpen}
        handleCloseDialog={handleCloseDialogUpdateDepartment}
      />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length}
            setSelected={setSelected}
            setDialogDeleteMultipleDepartmentOpen={setDialogDeleteMultipleDepartmentOpen} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <DepartmentTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={() => handleSelectAllClick(event)}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {rows
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
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
                          align="center"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.manager}</TableCell>
                        <TableCell align="right">
                          <RowActions currentSelectedDepartment={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
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