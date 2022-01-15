const { QueryTypes, Sequelize } = require("sequelize");
const db = require("../models");
const createTriggersInDB = async (req, res) => {
  try {
    await db.sequelize.query(`drop trigger if exists employment_change;`);

    await db.sequelize.query(
      `create trigger employment_change 
      after update on employees for each row 
      insert into employmenthistories 
      set date=now(), employeeID = OLD.id, 
      event=CONCAT('Change from ', 
      (select name from departments where departments.id=OLD.departmentID), 
      ' to ', 
      (select name from departments where departments.id=NEW.departmentID));`
    );
    await db.sequelize.query(`drop trigger if exists mergeAccountToEmp;`);

    await db.sequelize.query(
      `create trigger mergeAccountToEmp 
      after insert on authAccounts for each row 
      insert into employees 
      set email=NEW.email,
      id=NEW.id,
      companyID=NEW.companyID;
      `
    );
  } catch (error) {
    console.log("createTriggersInDB: ", error);
  }
};
module.exports = createTriggersInDB;
