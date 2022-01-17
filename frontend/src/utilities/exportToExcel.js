import XLSX from "xlsx";
import * as FileSaver from "file-saver";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
var Header = [
  [
    "First name",
    "Last name",
    "Gender",
    "Birthday",
    "Phone number",
    "Email",
    "Address",
    "Position",
    "departmentID",
  ],
];
export default function ExportToExcel(
  employeeList,
  setSbSuccessOpen,
  setSbFailedOpen,
  fileName = "EmployeeList"
) {
  // let valueToExport = { name, gender };
  const employeeListToExport = employeeList.map(
    ({
      fname,
      lname,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      position,
      departmentID,
    }) => ({
      fname,
      lname,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      position,
      departmentID,
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

  try {
    FileSaver.saveAs(outputData, fileName);
    setSbSuccessOpen(true);
  } catch (error) {
    setSbFailedOpen(true);
  }
}
