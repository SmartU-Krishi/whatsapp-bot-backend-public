module.exports = (sequelize, DataTypes) => {
  const RewardActionLog = sequelize.define(
    "reward_action_log",
    {
      action_logs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_dt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "reward_action_log",
      timestamps: false,
    }
  );

  return RewardActionLog;
};
