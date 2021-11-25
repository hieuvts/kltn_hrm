import React from 'react'
import { Grid, Paper, Avatar, TextField, outlinedInputClasses, FormControl, Checkbox, Button, Typography, Link} from '@mui/material'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { padding, typography } from '@mui/system';
import { createTheme } from '@mui/system';
import { create } from '@mui/material/styles/createTransitions';
import { ThemeProvider } from '@emotion/react';
function Login({handleChange}) {
    const paperstyle = { padding: 20, height: '66vh', width: 310, margin: "0 auto" };
    const avatarStyle = { backgroundColor: '#5048E4' };
    const inputStyle = { marginTop: "8px"};
    const buttonStyle ={backgroundColor: '#5048E4'}

    return (
        <Grid>
            <Paper elevation={10} style={paperstyle}>
                <Grid align={'center'}>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Đăng nhập</h2>
                </Grid>
                <TextField id="outlined-basic" style={inputStyle} label="Tên tài khoản" variant="outlined" fullWidth color= 'info'/>
                <TextField id="outlined-basic" style={inputStyle} label="Mật khẩu" variant="outlined" fullWidth color= 'info'/>
                <FormControlLabel control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                }
                    label="Remember me" />
                <Button style = {buttonStyle} variant="contained" type='submit' fullWidth>Sign in</Button>
                <Typography>
                    <Link style={{ textDecoration: 'none' }} href="#">Quên mật khẩu ?</Link>
                </Typography>
                <Typography> Đăng nhập hoặc 
                    <Link style={{ textDecoration: 'none' }}  href="#" onClick={()=> handleChange("evnet",1)}> Đăng ký ngay</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login
