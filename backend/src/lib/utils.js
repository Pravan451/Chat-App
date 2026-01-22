import jwt from "jsonwebtoken";

console.log("JWT_SECRET =", process.env.JWT_SECRET);

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,        // REQUIRED on Render
    sameSite: "None",    // REQUIRED for cross-domain cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
