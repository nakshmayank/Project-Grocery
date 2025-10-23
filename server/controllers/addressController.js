import addressModel from "../models/address.js";

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    await addressModel.create({ ...address, userId });
    res
      .status(201)
      .json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get Address : api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await addressModel.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
