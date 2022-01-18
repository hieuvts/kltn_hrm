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
import Chip from "@mui/material/Chip";
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
import avatarMale from "../../assets/icons/avatarMale.png";
import avatarFemale from "../../assets/icons/avatarFemale.png";

import DialogDeleteAuthAccount from "./DialogDeleteAuthAccount";
import DialogDeleteMultipleAuthAccount from "./DialogDeleteMultipleAuthAccount";

import moment from "moment";

import {
  setCurrentSelectedAuthAccount,
  addToSelectedAuthAccountList,
  removeFromSelectedAuthAccountList,
  setMultiSelectedAuthAccountList,
} from "../../stores/authSlice";
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
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "Privilege",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Registered At",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
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
              "aria-label": "select all AuthAccounts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
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
  const { numSelected, setSelected, setDialogDeleteMultipleAuthAccountOpen } =
    props;
  const dispatch = useDispatch();
  // Get selectedAuthAccountList to delete multiple, delete all
  const selectedAuthAccountList = useSelector((state) => state.AuthAccount);
  const auth = useSelector((state) => state.auth);

  const handleDeleteMultipleAuthAccount = () => {
    setDialogDeleteMultipleAuthAccountOpen(true);
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
          variant="h5"
          id="tableTitle"
          component="div"
        >
          AuthAccount List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete multiple">
          <IconButton onClick={() => handleDeleteMultipleAuthAccount()}>
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
  setDialogDeleteMultipleAuthAccountOpen: PropTypes.func.isRequired,
};

export default function AuthAccountTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isDialogDeleteAuthAccountOpen, setDialogDeleteAuthAccountOpen] =
    React.useState(false);
  const [
    isDialogDeleteMultipleAuthAccountOpen,
    setDialogDeleteMultipleAuthAccountOpen,
  ] = React.useState(false);

  const dispatch = useDispatch();
  var rows = useSelector((state) => state.auth.authAccountList);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      // Select all -> add all AuthAccount (equals to 'rows') to the selectedAuthAccountList
      dispatch(setMultiSelectedAuthAccountList(rows));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, AuthAccount) => {
    const id = AuthAccount.id;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      // If AuthAccount is not in selectedList -> add to it
      newSelected = newSelected.concat(selected, id);
      dispatch(
        addToSelectedAuthAccountList({ selectedAuthAccount: AuthAccount })
      );
    } else if (selectedIndex === 0) {
      // If undo checkbox at first selected row
      newSelected = newSelected.concat(selected.slice(1));
      dispatch(
        removeFromSelectedAuthAccountList({ selectedAuthAccount: AuthAccount })
      );
    } else if (selectedIndex === selected.length - 1) {
      // If undo checkbox at last selected row
      newSelected = newSelected.concat(selected.slice(0, -1));
      dispatch(
        removeFromSelectedAuthAccountList({ selectedAuthAccount: AuthAccount })
      );
    } else if (selectedIndex > 0) {
      // If undo checkbox at another selected row
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      dispatch(
        removeFromSelectedAuthAccountList({ selectedAuthAccount: AuthAccount })
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleCloseDialogDeleteAuthAccount = () => {
    setDialogDeleteAuthAccountOpen(false);
  };
  const handleCloseDialogDeleteMultipleAuthAccount = () => {
    setDialogDeleteMultipleAuthAccountOpen(false);
  };

  const RowActions = (currentSelectedAuthAccount) => {
    return (
      <Box>
        <Tooltip title="Delete">
          <Button
            variant="link"
            onClick={() => {
              dispatch(
                setCurrentSelectedAuthAccount(currentSelectedAuthAccount)
              );
              setDialogDeleteAuthAccountOpen(true);
            }}
          >
            <DeleteIcon color="primary" />
          </Button>
        </Tooltip>
      </Box>
    );
  };
  return (
    <>
      <DialogDeleteAuthAccount
        isDialogOpen={isDialogDeleteAuthAccountOpen}
        handleCloseDialog={handleCloseDialogDeleteAuthAccount}
      />
      <DialogDeleteMultipleAuthAccount
        setSelected={setSelected}
        isDialogOpen={isDialogDeleteMultipleAuthAccountOpen}
        handleCloseDialog={handleCloseDialogDeleteMultipleAuthAccount}
      />

      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            setSelected={setSelected}
            setDialogDeleteMultipleAuthAccountOpen={
              setDialogDeleteMultipleAuthAccountOpen
            }
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={() => handleSelectAllClick(event)}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
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
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row)}
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
                          onClick={() => {
                            dispatch(
                              setCurrentSelectedAuthAccount({
                                currentSelectedAuthAccount: row,
                              })
                            );
                          }}
                        >
                          {row.email}
                        </TableCell>
                        <TableCell align="right">
                          {moment(row.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell align="right">{row.privilege}</TableCell>

                        <TableCell align="right">
                          <RowActions currentSelectedAuthAccount={row} />
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
            labelRowsPerPage="Accounts per page"
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
