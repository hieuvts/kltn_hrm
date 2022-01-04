import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { useFormik } from "formik";

import { fileNameValidationSchema } from "../../utilities/validationSchema";

export default function ChatMessageInput({ newMessage, handleSendMessage }) {
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values) => {
      handleSendMessage(values);
      formik.resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item xs={10}>
          <TextField
            id="message"
            label="Message"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 3 }}>
                  <Button onClick={() => console.log("Attach a file")}>
                    <AttachmentOutlinedIcon />
                  </Button>
                </InputAdornment>
              ),
            }}
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
          xs={1}
          sx={{
            alignSelf: "center",
            ml: "auto",
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            <SendIcon />
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

ChatMessageInput.propTypes = {
  newMessage: PropTypes.string,
  handleSendMessage: PropTypes.func,
};
