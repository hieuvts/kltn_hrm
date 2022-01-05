import * as yup from "yup";

const phoneNumberRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const accountSignUpValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
  password: yup.string("Enter your password").required("Password is required!"),
  verifyPassword: yup
    .string()
    .required("Confirmation password is required!")
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirmation password must match!"
    ),
});

export const accountLoginValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your username")
    .email("Please enter a valid email!")
    .required("Username is required!"),
  password: yup.string("Enter your password").required("Password is required!"),
});

export const employeeInfoValidationSchema = yup.object().shape({
  fname: yup
    .string("Enter first name")
    .min(1, "First name should be of minimum 1 characters length")
    .max(150, "Name should be of maximum 150 characters length")
    .required("Name is required!"),
  lname: yup
    .string("Enter last name")
    .min(1, "Last name should be of minimum 1 characters length")
    .max(150, "Name should be of maximum 150 characters length")
    .required("Name is required!"),
  gender: yup
    .mixed()
    .oneOf(["Male", "Female", "Other"])
    .required("Gender is required!"),
  dateOfBirth: yup
    .date("Select your birthday")
    .required("Birthday is required!"),
  phoneNumber: yup
    .string("Enter your phone number")
    .matches(phoneNumberRegex, "Phone number is not valid")
    .min(8, "Phone number should be of minimum 8 characters length")
    .max(15, "Phone number should be of maximum 15 characters length")
    .required("Phone number is required!"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
  address: yup
    .string("Enter your address")
    .max(150, "Address should be of maximum 150 characters length")
    .required("Address is required!"),
  // roleID: yup
  //   .string()
  //   .max(10, "RoleID should be of maximum 10 characters lenght")
  //   .default("roleID"),
  // departmentID: yup
  //   .string()
  //   .max(10, "DepartmentID should be of maximum 10 characters lenght")
  //   .default("departmentID"),
  // projectID: yup
  //   .string()
  //   .max(10, "ProjectID should be of maximum 10 characters lenght")
  //   .default("projectID"),
  // isDeleted: yup.bool().default(false),
});

// Other stuff
export const emailValidationSchema = yup.object().shape({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required!"),
});

export const fileNameValidationSchema = yup.object().shape({
  fileName: yup
    .string("Enter file name")
    .required("Please speficy a file name!")
    .matches(/^[^\\/:\*\?"<>\|]+$/, `Should not contains \ / : * ? " < > |`),
});

export const departmentInformationValidationSchema = yup.object().shape({
  name: yup
    .string("Enter department name")
    .required("Name of department is required"),
  amount: yup
    .number("Enter amount of department"),
  manager: yup
    .string("Enter name of manager")
    .min(1, "Manager name should be of minimum 2 characters length")
    .max(150, "Manager name should be of maximum 150 characters length")
    .required("Manager name is required!")
});
export const projectInformationValidationSchema = yup.object().shape({
  name: yup
    .string("Enter project name")
    .required("Name of project is required"),
  customer: yup
    .string("Enter project name")
    .required("Name of project is required"),
  startDate: yup
    .date("Select start date of project")
    .required("Start date is required!"),
  endDate: yup
    .date("Select end date of project")
    .required("End date is required!"),
});
export const companyInfoValidationSchema = yup.object().shape({
  name: yup
    .string("Enter company name")
    .min(1, "Company nameshould be of minimum 1 characters length")
    .max(150, "Company name should be of maximum 150 characters length")
    .required("Company name is required!"),
  typeOfCompany: yup
    .string("Enter type of company")
    .min(1, "Should be of minimum 1 characters length")
    .max(50, "Should be of maximum 50 characters length")
    .required("Type of comapny is required!"),
  mainBusinessLines: yup
    .string("Enter main business lines")
    .min(1, "Should be of minimum 1 characters length")
    .max(50, "Should be of maximum 50 characters length")
    .required("Main business is required!"),
  address: yup
    .string("Enter address")
    .min(1, "Address should be of minimum 1 characters length")
    .max(150, "Address should be of maximum 150 characters length")
    .required("Address is required!"),
  phoneNumber: yup
    .string("Enter phone number")
    .matches(phoneNumberRegex, "Phone number is not valid")
    .min(8, "Phone number should be of minimum 8 characters length")
    .max(15, "Phone number should be of maximum 15 characters length")
    .required("Phone number is required!"),
  email: yup
    .string("Enter email")
    .email("Enter a valid email")
    .required("Email is required!"),
  taxCode: yup
    .string("Enter tax code")
    .min(8, "Tax code should be of minimum 8 characters length")
    .max(15, "Tax code should be of maximum 15 characters length")
    .required("Tax code is required!"),
});
export const taskInformationValidationSchema = yup.object().shape({
  
});