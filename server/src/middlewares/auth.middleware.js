import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, message: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    // console.log(jwt.decode(token));

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err)
        return res.status(403).json({ status: false, message: "Prohibido" });
      req.email = decoded.UserInfo.email;
      req.role = decoded.UserInfo.role;
      next();
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "No autorizada, sin token o ha expirado",
    });
  }
};
