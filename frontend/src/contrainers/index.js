import React,{useState} from 'react'
import { Tabs, Tab, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../component/login';
import Signup from '../component/signup';

function SignInOutContainer() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const paperStyle = {width: 350, margin: "20px auto"}
    const tabStyle = {width: "50%"}
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
    return (
        <div>
            <Paper elevation={20} style={paperStyle}>
                <Tabs
                value ={value}
                indicatorColor= "primary"
                textColor = "primary"
                onChange = {handleChange}
                aria-label="disabled tabs example">
                    <Tab label="Đăng nhập" style ={tabStyle} />
                    <Tab label="Đăng ký" style = {tabStyle}/>
                </Tabs>
                <TabPanel value = {value} index= {0}>
                    <Login handleChange = {handleChange}/>
                </TabPanel>
                <TabPanel value = {value} index= {1}>
                    <Signup/>
                </TabPanel>
            </Paper>
        </div>
    )
}
export default SignInOutContainer
