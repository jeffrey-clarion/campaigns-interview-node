type CallOutcome = 'success' | 'failure';
import moment from 'moment';

export async function sendCall(
  jobId: string,
  metadata: any
): Promise<CallOutcome> {
  console.log(
    `Sending call for jobId: ${jobId} with metadata: ${JSON.stringify(
      metadata
    )}`
    , moment().format('YYYY-MM-DD HH:mm:ss')
  );
  // Simulate call duration (2-5 seconds)
  const duration = Math.floor(Math.random() * 3) *1000 + 2000;
  console.log("Duration: ", duration);
  console.log("-----------")
  await new Promise((resolve) => setTimeout(resolve, duration));

  // Random success/failure (70% success rate)
  const success = Math.random() < 0.1;

  console.log(
    `Call for jobId: ${jobId} with metadata: ${JSON.stringify(
      metadata
    )} completed with outcome: ${success ? 'success' : 'failure'}`,
    moment().format('YYYY-MM-DD HH:mm:ss')
  );

  return success ? 'success' : 'failure';
}
