type CallOutcome = 'success' | 'failure';

export async function sendCall(
  jobId: string,
  metadata: any
): Promise<CallOutcome> {
  console.log(
    `Sending call for jobId: ${jobId} with metadata: ${JSON.stringify(
      metadata
    )}`
  );
  // Simulate call duration (2-5 seconds)
  const duration = Math.floor(Math.random() * 3000) + 2000;
  await new Promise((resolve) => setTimeout(resolve, duration));

  // Random success/failure (70% success rate)
  const success = Math.random() < 0.7;

  console.log(
    `Call for jobId: ${jobId} with metadata: ${JSON.stringify(
      metadata
    )} completed with outcome: ${success ? 'success' : 'failure'}`
  );

  return success ? 'success' : 'failure';
}
