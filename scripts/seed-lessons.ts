import "dotenv/config";
import { seedLessons } from "./seed-data/sci-trends-lessons";

seedLessons()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
