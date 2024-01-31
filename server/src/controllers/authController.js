import bcrypt from "bcrypt";
import { prisma } from "./../utils/db.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user || !user?.active) {
    return res
      .status(401)
      .json({ status: false, message: "No autorizado - usuario inactivo" });
  }

  const match = bcrypt.compare(password, user?.password);

  if (!match)
    return res
      .status(401)
      .json({ status: false, message: "No autorizado - password no coincide" });

  const accessToken = generateToken(res, user);

  return res.json({
    status: true,
    message: "Procesado correctamente",
    token: accessToken,
  });
};

export const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ status: false, message: "No autorizado" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err)
        return res.status(403).json({ status: false, message: "Prohibido" });

      const user = await prisma.user.findFirst({
        where: { email: decoded?.email },
      });

      if (!user)
        return res
          .status(401)
          .json({ status: false, message: "No autorizado" });

      const accessToken = jwt.sign(
        { UserInfo: { email: user?.email, role: user?.role } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      return res.json({
        status: true,
        message: "Procesado correctamente",
        token: accessToken,
      });
    }
  );
};

export const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res
      .status(200)
      .json({ status: false, message: "Error no existe cookie" });
  }
  // res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(200).json({ status: true, message: "Cerró sesión exitosamente" });
};
