export const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "No ha subido imagene",
      });
    } else {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Archivos subidas correctamente.",
        data: file,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, statusCode: 500, message: err });
  }
};
