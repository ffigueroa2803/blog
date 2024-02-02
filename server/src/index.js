import app from "./app.js";

const main = async () => {
  try {
    app.listen(process.env.PORT);
    console.log(`Listening on port http://localhost:${process.env.PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error("Unable to connect : ", error);
  }
};

main();
