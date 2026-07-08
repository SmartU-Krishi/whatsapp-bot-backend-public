module.exports = (sequelize, DataTypes) => {
  const RewardActionType = sequelize.define(
    "reward_action_types",
    {
      action_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      points_per_action: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "reward_action_types",
      timestamps: false,
    }
  );

  return RewardActionType;
};
