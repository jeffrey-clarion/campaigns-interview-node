import { sendCall } from './utils';
import moment from 'moment';

const queue: { [key: string]: Array<{jobId: string, metadata: any, delay: number, attemptsRemaining: number}> } = {};

const runningQueue:  Array<{jobId: string, metadata: any, delay: number, attemptsRemaining: number}> = [];
async function main() {
  // Example of how to simulate a call for testing:
  
  const metadatToPrint = {
    scheduledAt: new Date(),
  };
  const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  console.log(currentDateTime);
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  await addToQueue(moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'), 3, 1000, '111', {"run call": "here"});
  await addToQueue(moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'), 3, 20000, '222', {"run call": "Not here"});
  await addToQueue(moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'), 3, 1000, '333', {"run call": "3"});

  await addToQueue(moment().add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss'), 3, 1000, '444', {"run call": "4"});


  //sendCall('1', metadatToPrint);
  // Start processing the queue indefinitely
  processQueue();
  processRunningQueue();

}
async function processQueue() {
  // Start an infinite loop to process the queue
  
  const queueProcessor = setInterval(async () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    
    if (queue[currentTime]) {
      // Process all jobs scheduled for this time
      // Process jobs in batches of 3 at a time
      
      
      await Promise.all( queue[currentTime].map(async (job) => {
        runningQueue.push(job);
      }));
      
      
      // Clear processed jobs
      delete queue[currentTime];
    }
  }, 1000);

  // Handle process termination gracefully
  process.on('SIGINT', () => {
    clearInterval(queueProcessor);
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    clearInterval(queueProcessor);
    process.exit(0);
  });
}


let currentlyRunning = 0;
const MAX_CONCURRENT_CALLS = 3;

async function processRunningQueue() {
  // Start an infinite loop to process the running queue
  const runningQueueProcessor = setInterval(async () => {
    // Process jobs if we have capacity and there are jobs waiting
    while (currentlyRunning < MAX_CONCURRENT_CALLS && runningQueue.length > 0) {
      const job = runningQueue.shift();
      if (!job) continue;

      currentlyRunning++;
      
      // Run the call
      sendCall(job.jobId, job.metadata).then((outcome) => {
        currentlyRunning--;
        
        // If call failed and we have attempts remaining, add back to queue with delay
        if (outcome === 'failure' && job.attemptsRemaining > 1) {
          const nextAttemptTime = moment().add(job.delay, 'milliseconds').format('YYYY-MM-DD HH:mm:ss');
          addToQueue(nextAttemptTime, job.attemptsRemaining - 1, job.delay, job.jobId, job.metadata);
        }
      });
    }
  }, 1); // Check queue every 100ms

  // Handle process termination gracefully
  process.on('SIGINT', () => {
    clearInterval(runningQueueProcessor);
  });

  process.on('SIGTERM', () => {
    clearInterval(runningQueueProcessor);
  });
}

// Start processing the queue
processQueue();

async function addToQueue(startTime: string, attempts: number, delay: number, jobId: string, metadata: any) {
  //const times = [];
  let currentTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');

  
  if (queue[currentTime]) {
    queue[currentTime].push({jobId, metadata, delay, attemptsRemaining: attempts});
  } else {
    queue[currentTime] = [{jobId, metadata, delay, attemptsRemaining: attempts}];
  }
  console.log("Added to main queue: ", jobId, currentTime, moment().format('YYYY-MM-DD HH:mm:ss'));
  

  //console.log(queue);

  
}

main();
