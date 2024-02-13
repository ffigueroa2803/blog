import jwt from "jsonwebtoken";

export const generateToken = async (res, user) => {
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
    maxAge: 15 * 60 * 60 * 1000, // 15 minutos
  });

  return token;
};
