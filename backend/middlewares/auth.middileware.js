import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Malformed token" });

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is logged out" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("User Auth error:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authCaptain = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const captain = await Captain.findById(decoded._id || decoded.id);
    // if (!captain) {
    //   return res.status(401).json({ message: "Captain not found" });
    // }

    req.captain = decoded; // 👈 THIS is what getProfile expects
    next();
  } catch (err) {
  console.error("JWT ERROR:", err.message);
  return res.status(401).json({ message: err.message });
}
};



