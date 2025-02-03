import { sendCall } from './utils';

async function main() {
  // call sendCall three times with different jobId:
  await sendCall('1', { scheduledAt: new Date() });
  await sendCall('2', { scheduledAt: new Date() });
  await sendCall('3', { scheduledAt: new Date() });
}

main();
