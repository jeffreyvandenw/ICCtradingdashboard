import "dotenv/config";
import { seedLessons as seedSciTrendsLessons } from "./seed-data/sci-trends-lessons";
import { seedLessons as seedBestSimplePriceActionLessons } from "./seed-data/best-simple-price-action-lessons";
import { seedLessons as seedKoddzTradeBreakdowns } from "./seed-data/koddz-trade-breakdowns";
import { seedLessons as seedJaeFxMasteringLiquidity } from "./seed-data/jaefx-mastering-liquidity";

async function run() {
  await seedSciTrendsLessons();
  await seedBestSimplePriceActionLessons();
  await seedKoddzTradeBreakdowns();
  await seedJaeFxMasteringLiquidity();
}

run()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
