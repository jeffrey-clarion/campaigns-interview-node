# Campaign Scheduling System

## Overview

Design a system that allows creating call campaigns with configurable retry behaviors and execution schedules. Implement a job execution system that can detect when calls are due, manage their lifecycle, and handle retries according to the campaign protocol.

## Core Functionality

1. Campaign Protocol Definition

   - Design approach and data model
   - Set start time, retry attempts, and intervals between calls (3 attempts, 10 seconds delay)
   - Define a simple interface / protocol for managing these settings

2. Job Execution System
   - Design data model / structure approach to job management
   - Detect and execute due jobs
   - Handle job lifecycle and retries

## Functional Requirements

[Test 1]

- Create a campaign with a maximum of n steps, retried at n interval.
- The data model must represent the steps and the retry behavior.
- Execute the campaign and verify that the steps are properly executed

[Test 2]

- Create a campaign with a maximum of n steps, retried at n interval, with a scheduled start time in the future
- The data model must represent the steps and the retry behavior.
- Execute the campaign and verify that the steps are properly executed

## Stretch Goals

1. Concurrency Control
   - Extend to run concurrent calls. Demonstrate that multiple steps (e.g., live calls) can be run concurrently
   - Enforce a maximum number of concurrent steps (e.g., live calls) being executed at any given time

2. Priority Based Scheduling
   - Allow campaigns to have a priority level (e.g., high, medium, low). The job execution system shoudl proecess higher-priority campaigns first when multiple are due.

    
## Design and Debrief Discussion

- How would you implement priority handling for more important jobs at scale?
- How would you implement tenant-specific concurrency limits?
- How would you add the ability to cancel a campaign halfway through the steps? 
- How do we scale this to 100m calls per month?
- What edge cases do you forsee running this system at scale? How do we prevent those?
- What is your ideal testing framework for this system at scale?
- What controls and design considerations would you have for a multi-tenant approach?

## Evaluation Criteria (what we actually care about)

- Speed to an MVP version. How quickly can you arrive at a working version that passes the two tests?
- Simplifying complexity. How well can you simplify the system to make it easier to implement and maintain?
- Communication of tradeoffs. When you are prioritizing speed / simplicity, what are you giving up
- Understanding how to scale from 1->100. After implementing the MVP, can you articulate how you would productionize and scale this in the debrief? 
