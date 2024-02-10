import jwt from "jsonwebtoken";

export const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user?.id, role: user?.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Crea una cookie segura
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Utilice cookies seguras en producción
    sameSite: "strict", // Prevenir ataques CSRF
    maxAge: process.env.COOKIE_EXPIRES_IN, // 15 minutos
  });

  return token;
};
