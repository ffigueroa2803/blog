import app from "./app.js";
import { PORT } from "./config.js";

const main = async () => {
  try {
    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error("Unable to connect : ", error);
  }
};

main();
