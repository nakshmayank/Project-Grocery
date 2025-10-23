import jwt from "jsonwebtoken";

// Login User : /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If Seller is registered & password matches
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true, //Prevent JavaScript to access cookie
        secure: process.env.NODE_ENV === "production", //Use secure cookie in Production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
        maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
      });

      return res.status(200).json({
        success: true,
        // user: { email: user.email, name: user.name },
        message: { email: email, password: password },
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Error" });
  }
};

// Check auth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout Seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true, //Prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //Use secure cookie in Production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
    });

    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
