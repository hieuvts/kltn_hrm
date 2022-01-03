import React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";

import { fileNameValidationSchema } from "../../utilities/validationSchema";
import { useFormik } from "formik";

import { rowDirection, colDirection } from "../../utilities/flexBoxStyle";

export default function ChatPanel() {
  const FormMessage = () => {
    const formik = useFormik({
      initialValues: {
        message: "",
      },
      onSubmit: (values) => {
        console.log("send ", values);
      },
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              id="message"
              label="Message"
              placeholder="Enter message..."
              variant="standard"
              fullWidth
              value={formik.values.message}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              alignSelf: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ ml: 2 }}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };
  return (
    <>
      <Box>
        <Typography variant="h5">User1</Typography>
      </Box>
      <Box sx={{ colDirection }}>
        <Typography sx={{ alignSelf: "start" }}>Msg 1</Typography>
        <Typography sx={{ textAlign: "right" }}>Msg 2</Typography>
        <Typography sx={{ alignSelf: "start" }}>Msg 3</Typography>
        <Box sx={{ mt: 30 }}>
          <FormMessage />
        </Box>
      </Box>
    </>
  );
}
