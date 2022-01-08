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
import "./chatPanel.scss";
export default function ChatMessageInput({ messageToSend, handleSendMessage }) {
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
      <div className="messageSender">
        <div className="textBox">
          <TextField
            id="message"
            label="Message"
            fullWidth
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
            value={formik.values.message}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            onChange={formik.handleChange}
          />
        </div>
        <div className="buttonSend">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              alignSelf: "center",
            }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </form>
  );
}

ChatMessageInput.propTypes = {
  messageToSend: PropTypes.string,
  handleSendMessage: PropTypes.func,
};
