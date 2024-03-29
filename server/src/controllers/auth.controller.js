import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.js";
import { generateToken } from "../utils/generate.token.js";
import { errorHandler } from "./../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    let hashedPwd = "";
    const { email, name, image, password, role } = req.body;

    // Compruebe si hay un email de usuario duplicado
    const duplicate = await prisma.user.findFirst({ where: { email } });

    if (duplicate) {
      return next(errorHandler(409, "Nombre de email duplicado"));
    }

    // Contraseña hash
    if (password)
      hashedPwd = await bcrypt.hash(password, 10); // Fragmento aleatorio 10
    else hashedPwd = null;

    // Crear y almacenar nuevo usuario
    const user = await prisma.user.create({
      data: { email, name, image, password: hashedPwd, role },
    });

    if (user) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Nuevo usuario ${name} creado`,
        user,
      });
    }
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user)
      return next(errorHandler(401, "No autorizado - usuario no encontrado"));

    if (!user?.active)
      return next(errorHandler(401, "No autorizado - usuario inactivo"));

    const match = await bcrypt.compare(password, user?.password).then();

    if (!match)
      return next(errorHandler(401, "No autorizado - password no coincide"));

    const token = await generateToken(res, user);

    delete user.password;

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Procesado correctamente",
      token,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    return res.clearCookie("jwt").status(200).json({
      success: true,
      statusCode: 200,
      message: "Cerró sesión exitosamente",
    });
  } catch (error) {
    return next(error);
  }
};

export const refreshtoken = (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return next(errorHandler(401, "No autorizado"));

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return next(errorHandler(403, "Prohibido"));

        const user = await prisma.user.findFirst({
          where: { email: decoded?.email },
        });

        if (!user) return next(errorHandler(401, "No autorizado"));

        const accessToken = jwt.sign(
          { UserInfo: { email: user?.email, role: user?.role } },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        return res.json({
          success: true,
          statusCode: 200,
          message: "Procesado correctamente",
          token: accessToken,
        });
      }
    );
  } catch (error) {
    return next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = await generateToken(res, user);

      delete user.password;

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Procesado correctamente",
        token,
        user,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          name:
            name.toLowerCase().split(" ").join("") +
            Math.random().toString(9).slice(-4),
          image: googlePhotoUrl,
          password: hashedPassword,
        },
      });

      const token = await generateToken(res, newUser);

      delete newUser.password;

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Procesado correctamente",
        token,
        user: newUser,
      });
    }
  } catch (error) {
    return next(error);
  }
};
