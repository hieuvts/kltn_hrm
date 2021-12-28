import * as yup from "yup";

const phoneNumberRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = yup.object().shape({
  fname: yup
    .string("Enter first name")
    .min(1, "First name should be of minimum 2 characters length")
    .max(150, "Name should be of maximum 150 characters length")
    .required("Name is required!")
    .matches(
      `^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$`,
      "Contains invalid charaters"
    ),
  lname: yup
    .string("Enter last name")
    .min(1, "Last name should be of minimum 2 characters length")
    .max(150, "Name should be of maximum 150 characters length")
    .required("Name is required!")
    .matches(
      `^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$`,
      "Contains invalid charaters"
    ),
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
