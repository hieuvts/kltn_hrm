import XLSX from "xlsx";
import * as FileSaver from "file-saver";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
var Header = [
  [
    "Name",
    "Gender",
    "Birthday",
    "Phone number",
    "Email",
    "Address",
    "roleID",
    "departmentID",
    "projectID",
    "isDeleted",
  ],
];
export default function ExportToExcel(employeeList, fileName = "EmployeeList") {
  // let valueToExport = { name, gender };
  const employeeListToExport = employeeList.map(
    ({
      name,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      roleID,
      departmentID,
      projectID,
      isDeleted,
    }) => ({
      name,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      roleID,
      departmentID,
      projectID,
      isDeleted,
    })
  );

  const worksheet = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(worksheet, Header);
  XLSX.utils.sheet_add_json(worksheet, employeeListToExport, {
    origin: "A2",
    skipHeader: true,
  });
  const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const outputData = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(outputData, fileName);
}
