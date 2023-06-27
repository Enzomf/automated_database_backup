import cron from "node-cron";
import make_backup from "./backup.js";

async function scheduele_backup() {
  const cron_patter = process.env.CRON_PATTERN;

  if (!cron_patter) throw new Error("CRON_PATTERN ENV IS MISSING!");
  cron.schedule(cron_patter, async () => await make_backup());
}

export default scheduele_backup;
