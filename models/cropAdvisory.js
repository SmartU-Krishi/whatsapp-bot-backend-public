module.exports = (sequelize, DataTypes) => {
  const CropAdvisory = sequelize.define("CropAdvisory", {
    advisory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    platform: { 
      type: DataTypes.STRING 
    },
    query_no: { 
      type: DataTypes.STRING 
    },
    user_id: { 
      type: DataTypes.INTEGER 
    },
    crop_master_id: { 
      type: DataTypes.INTEGER 
    },
    image_path1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_path2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image_path3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    crop_age: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    age_type: {
      type: DataTypes.ENUM("days", "month", "years", "weeks"),
      allowNull: false,
      defaultValue: "days",
    },
    remark: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Inprocess",
        "Feedback Submitted",
        "Response Submitted"
      ),
      allowNull: false,
      defaultValue: "Pending",
    },
    ml_model_detection: { 
      type: DataTypes.STRING 
    },
    ml_advisory_feedback: { 
      type: DataTypes.STRING 
    },
  }, {
    tableName: "CropAdvisories"
  });

  return CropAdvisory;
};
