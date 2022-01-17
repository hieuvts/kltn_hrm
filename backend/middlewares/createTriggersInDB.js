const { QueryTypes, Sequelize } = require("sequelize");
const db = require("../models");
const createTriggersInDB = async (req, res) => {
  try {
    await db.sequelize.query(`drop trigger if exists department_change;`);

    await db.sequelize.query(
      `create trigger department_change 
      after update on employees for each row
      if NEW.departmentID != OLD.departmentID
      then
        insert into employmenthistories 
        set date=now(), employeeID = OLD.id,
        eventType='Department changed', 
        event=CONCAT('Change from ', 
        (select name from departments where departments.id=OLD.departmentID), 
         ' to ', 
        (select name from departments where departments.id=NEW.departmentID));
      end if;
      `
    );

    await db.sequelize.query(`drop trigger if exists achievement_change;`);

    await db.sequelize.query(
      `create trigger achievement_change 
      after insert on EmployeeAchievements for each row 
      insert into employmenthistories 
      set date=NEW.date, employeeID = NEW.employeeID,
      eventType='Compliment', 
      event=NEW.achievement;`
    );

    await db.sequelize.query(`drop trigger if exists position_change;`);

    await db.sequelize.query(
      `create trigger position_change 
      after update on employees for each row
      if NEW.position != OLD.position
      then
        insert into employmenthistories 
        set date=now(), employeeID = OLD.id,
        eventType='Position changed', 
        event=CONCAT('Change from ', OLD.position,' to ', NEW.position);
      end if;
      `
    );

    await db.sequelize.query(`drop trigger if exists mergeAccountToEmp;`);

    await db.sequelize.query(
      `create trigger mergeAccountToEmp 
      after insert on authAccounts for each row 
      insert into employees 
      set fname='Fisrt name',
      lname='Last name',
      gender='Male',
      dateOfBirth=now(),
      phoneNumber='',
      address='Address',
      position='',
      email=NEW.email,
      authAccountID=NEW.id;
      `
    );
  } catch (error) {
    console.log("createTriggersInDB: ", error);
  }
};
module.exports = createTriggersInDB;
