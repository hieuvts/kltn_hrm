import React from 'react'
import {FormLabel, RadioGroup, Radio, Checkbox, Avatar, Grid, Paper, TextField, FormControl, Typography, Button } from '@mui/material'
import AddCircleOutlinedOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Formik, Field, Form} from 'formik';
function Signup() {
    const paperStyle = { padding: 20, width: 310, margin: "0 auto" };
    const avatarStyle = { backgroundColor: '#5048E4' };
    const headerStyle = { margin: '8px' };
    const inputStyle = { marginTop: "8px" };
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align={'center'}>
                    <h2 style={headerStyle}>Đăng ký</h2>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlinedOutlinedIcon></AddCircleOutlinedOutlinedIcon>
                    </Avatar>
                    <Typography variant='caption'>
                        Điền form để đăng ký tài khoản
                    </Typography>
                </Grid>
                <Formik>
                    {(props) =>(
                        <Form>
                            <TextField style={inputStyle} fullWidth label='Họ tên'></TextField>
                            <FormControl component="fieldset" style={headerStyle}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    defaultValue="female"
                                    name="gender-radio"
                                    style={{ display: 'initial' }}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                            <TextField style={inputStyle} fullWidth label='Email'></TextField>
                            <TextField style={inputStyle} fullWidth label='Số điện thoại'></TextField>
                            <TextField style={inputStyle} fullWidth label='Mật khẩu'></TextField>
                            <TextField style={inputStyle} fullWidth label='Xác nhận mật khẩu'></TextField>
                            <FormControlLabel control={<Checkbox />} label="Đã đọc và đồng ý với điều khoản" />
                            <Button style={inputStyle} type='submit' variant='contained' color='primary'>Đăng ký </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}
export default Signup;
