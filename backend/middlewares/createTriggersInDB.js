const { QueryTypes, Sequelize } = require("sequelize");
const db = require("../models");
const createTriggersInDB = async (req, res) => {
  try {
    await db.sequelize.query(`drop trigger if exists department_change;`);

    await db.sequelize.query(
      `create trigger department_change 
      after update on Employees for each row
      if NEW.departmentID != OLD.departmentID
      then
        insert into EmploymentHistories 
        set date=now(), employeeID = OLD.id,
        eventType='Department changed', 
        event=CONCAT('Change from ', 
        (select name from Departments where Departments.id=OLD.departmentID), 
         ' to ', 
        (select name from Departments where Departments.id=NEW.departmentID));
      end if;
      `
    );

    await db.sequelize.query(`drop trigger if exists achievement_change;`);

    await db.sequelize.query(
      `create trigger achievement_change 
      after insert on EmployeeAchievements for each row 
      insert into EmploymentHistories 
      set date=NEW.date, employeeID = NEW.employeeID,
      eventType='Compliment', 
      event=NEW.achievement;`
    );

    await db.sequelize.query(`drop trigger if exists position_change;`);

    await db.sequelize.query(
      `create trigger position_change 
      after update on Employees for each row
      if NEW.position != OLD.position
      then
        insert into EmploymentHistories 
        set date=now(), employeeID = OLD.id,
        eventType='Position changed', 
        event=CONCAT('Change from ', OLD.position,' to ', NEW.position);
      end if;
      `
    );

    await db.sequelize.query(`drop trigger if exists mergeAccountToEmp;`);

    await db.sequelize.query(
      `create trigger mergeAccountToEmp 
      after insert on AuthAccounts for each row 
      insert into Employees 
      set fname='Fisrt name',
      lname='Last name',
      gender='Male',
      dateOfBirth=now(),
      phoneNumber='',
      address='Address',
      position='NEW',
      email=NEW.email,
      authAccountID=NEW.id;
      `
    );

    await db.sequelize.query(`drop trigger if exists defaultDepartment;`);

    await db.sequelize.query(
      `create trigger defaultDepartment 
      after insert on Companies for each row 
      insert into Departments 
      set name='HR',
      manager='HR Leader';
      `
    );

    // Trigger insert task
    await db.sequelize.query(`drop trigger if exists taskThenAddNoti;`);

    await db.sequelize.query(
      `create trigger taskThenAddNoti 
      after insert on Tasks for each row 
      insert into Notifications
      set eventType='task',
      authAccountID=NEW.assigneeID,
      event=CONCAT("Your're assigned a new task: ", NEW.name, ". Check it at");
      `
    );

    // Trigger update task
    await db.sequelize.query(`drop trigger if exists updateTaskThenAddNoti;`);

    await db.sequelize.query(
      `create trigger updateTaskThenAddNoti 
      after update on Tasks for each row 
      if OLD.assigneeID != NEW.assigneeID
      then
        insert into Notifications 
        set eventType='task',
        authAccountID=NEW.assigneeID,
        event=CONCAT("Your're assigned a new task: ", NEW.name, ". Check it at");
      end if;
      `
    );
  } catch (error) {
    console.log("createTriggersInDB: ", error);
  }
};
module.exports = createTriggersInDB;
