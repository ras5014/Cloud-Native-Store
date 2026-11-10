import app from "./app.ts";
import { env } from "./config/env.ts";

const PORT = env.PORT;

app
  .listen(PORT, () => {
    console.table(env);
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

// TODO: Change console.logs to logger
