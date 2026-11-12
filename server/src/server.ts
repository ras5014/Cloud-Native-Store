import app from "./app.ts";
import { env } from "./config/env.ts";
import { checkDBConnection } from "./db/connection.ts";

const PORT = env.PORT;

app
  .listen(PORT, async () => {
    if (env.NODE_ENV === "development") console.table(env);
    await checkDBConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });

// TODO: Change console.logs to logger
