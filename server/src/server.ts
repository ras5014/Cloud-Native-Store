import app from "./app.ts";
import { env } from "./config/env.ts";
import { checkDBConnection } from "./db/connection.ts";
import { logger } from "./utils/logger.ts";

const PORT = env.PORT;

app
  .listen(PORT, async () => {
    if (env.NODE_ENV === "development") console.table(env);
    await checkDBConnection();
    logger.info(`Server is running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    logger.error(err);
  });
