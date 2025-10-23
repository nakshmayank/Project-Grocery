import userModel from "../models/user.js";

// Update User wishlistData : /api/wishlist/update
export const updateWishlist = async (req, res) => {
  try {
    const userId = req.user;
    const { wishlist } = req.body;

    // Normalize the incoming array to only contain string IDs
    const wishlistIds = (wishlist || []).map((item) => {
      // If item is an object with _id, return the _id.
      // Otherwise, return the item (if it's already a string).
      return typeof item === "object" && item !== null && item._id
        ? item._id
        : item;
    });

    // Filter out any potential null/undefined values
    const cleanWishlistIds = wishlistIds.filter(Boolean);

    await userModel.findByIdAndUpdate(
      userId,
      { wishlist: cleanWishlistIds }, // Save the clean array of IDs
      { new: true }
    );

    res.status(200).json({ success: true, message: "Wishlist updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
