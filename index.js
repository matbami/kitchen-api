import express from "express";
import ORMConfig from "./ormconfig.js";
import menuRouter from "./routes/menu.route.js";
import vendorRouter from "./routes/vendor.route.js";
import customRouter from "./routes/customer.route.js";

const app = express();

app.use(express.json());
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/vendor", vendorRouter);
app.use("/api/v1", customRouter);

// create and setup express app

// establish database connection
ORMConfig.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

  export default app
