import { sendCall } from './utils';

async function main() {
  // Example of how to simulate a call for testing:
  const metadatToPrint = {
    scheduledAt: new Date(),
  };
  await sendCall('1', metadatToPrint);
}

main();
