import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  const token = jwt.sign(
    { UserInfo: { id: user?.id, role: user?.role } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { username: user?.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Crea una cookie segura con token de actualización
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Utilice cookies seguras en producción
    sameSite: "strict", // Prevenir ataques CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // 30 dias // Caducidad de la cookie: configurada para que coincida con refTok
  });

  return token;
};
