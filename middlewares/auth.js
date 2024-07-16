import jwt from "jsonwebtoken";
import { customError } from "../customError.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) throw new customError("Unauthorized user", 401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new customError("Unauthorized user", 401);
    req.user = user;
    next();
  });
};

export const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError("Acess denied", 403);
    }
    next();
  };
};
