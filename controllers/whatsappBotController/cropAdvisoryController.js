const db = require("../../config/db.config");
const CropAdvisory = db.cropAdvisory;
const UserDetail = db.UserDetail;
const rewardActionLog = db.rewardActionLog;
const rewardActionType = db.rewardActionType;

const axios = require("axios");
const { BlobServiceClient } = require("@azure/storage-blob");
const config = require("../../config");

// Azure Blob Client Setup
const blobServiceClient = BlobServiceClient.fromConnectionString(
  config.azure.connectionString
);
const containerClient = blobServiceClient.getContainerClient(
  config.azure.advisoryContainer
);

// Utility: Upload image from URL to Azure
async function uploadImageFromUrlToAzure(imageUrl, fileName) {
  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    // Upload to Azure
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: "image/jpeg" },
    });

    return blockBlobClient.url; // Return Azure Blob URL
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
}

exports.addCropAdvisoryFromWhatsAppBot = async (req, res) => {
  const {
    mobile,
    crop_master_id,
    crop_age,
    remark,
    age_type,
    query_no,
    image1,
    image2,
    image3,
    referral_code,
  } = req.body;

  if (!mobile || !crop_master_id || !crop_age || !remark) {
    return res.status(400).json({
      success: 0,
      message: "mobile, Crop ID, Crop Age, and Remark are required.",
    });
  }

  try {
    const user = await UserDetail.findOne({ 
      where: { phone: mobile }, 
      order: [["detail_id", "DESC"]] 
    });
    
    if (!user) {
      return res
        .status(200)
        .json({ success: 0, message: "Mobile number is not registered" });
    }

    // ✅ Upload WhatsApp images to Azure
    const img1 = image1
      ? await uploadImageFromUrlToAzure(image1, `advisory_${Date.now()}_1.jpg`)
      : null;

    const img2 = image2
      ? await uploadImageFromUrlToAzure(image2, `advisory_${Date.now()}_2.jpg`)
      : null;
      
    const img3 = image3
      ? await uploadImageFromUrlToAzure(image3, `advisory_${Date.now()}_3.jpg`)
      : null;

    // ✅ Save in DB
    const cropAdvisory = await CropAdvisory.create({
      user_id: user.user_id,
      crop_master_id,
      crop_age,
      remark,
      image_path1: img1,
      image_path2: img2,
      image_path3: img3,
      status: "Pending",
      age_type,
      query_no,
      platform: "whatsapp",
    });

    const getIsActionWithUserId = await rewardActionLog.findAll({
      where: { type: "advisory", user_id: user.user_id },
    });

    const getActionByType = await rewardActionType.findOne({
      where: {
        action_name: "act_advisory1",
      },
    });

    let pointsAdded = 0;

    if (getIsActionWithUserId.length < 5) {
      // Add a reward action log entry
      if (getActionByType) {
        pointsAdded = getActionByType.points_per_action;

        await rewardActionLog.create({
          user_id: user.user_id,
          action_id: getActionByType.action_id,
          points: getActionByType.points_per_action,
          type: getActionByType.type,
        });
      }
    } else if (getIsActionWithUserId.length >= 5 && getIsActionWithUserId.length < 20) {
      const getActionByType2 = await rewardActionType.findOne({
        where: {
          action_name: "act_advisory2",
        },
      });

      if (getActionByType2) {
        pointsAdded = getActionByType2.points_per_action;
        
        await rewardActionLog.create({
          user_id: user.user_id,
          action_id: getActionByType2.action_id,
          points: getActionByType2.points_per_action,
          type: getActionByType2.type,
        });
      }
    }

    return res.status(201).json({
      success: 1,
      message: "Crop advisory added successfully",
      result: cropAdvisory,
      pointsAdded: pointsAdded,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: 0,
      message: "Failed to add crop advisory",
      result: error.message,
    });
  }
};
