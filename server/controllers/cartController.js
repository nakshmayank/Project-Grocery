import userModel from "../models/user.js";

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    await userModel.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
