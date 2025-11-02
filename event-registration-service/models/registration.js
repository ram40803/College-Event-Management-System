const  { DataTypes } = require("sequelize");
const  sequelize = require("../config/db.js");

const Registration = sequelize.define("Registration", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "registered",
  },
});

module.exports = Registration;
