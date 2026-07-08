module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define("UserDetail", {
    detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    phone: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "UserDetails"
  });

  return UserDetail;
};
