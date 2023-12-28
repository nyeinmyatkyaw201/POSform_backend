const { DATEONLY } = require("sequelize");

module.exports = (sequalize, Sequelize) => {
  const Posform = sequalize.define("form", {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    counter_no: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    casher_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    order_date: {
      type: Sequelize.DATE,
      // allowNull:false,
      defaultValue: Sequelize.NOW,
    },
    refund: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    discount: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    discount_percentage: {
      type: Sequelize.STRING,
      // defaultValue: "No Discount",
    },
  });
  return Posform;
};
