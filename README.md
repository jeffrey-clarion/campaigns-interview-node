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

[Test 3]

- Schedule three concurrent campaigns to be run at the same time
- Execute the campaigns in parallel and verify that the steps are properly executed

## Stretch Goals

1. Concurrency Control

   - Enforce a maximum number of concurrent steps (e.g., live calls) being executed at any given time
   - Priority handling for more important jobs
   - Tenant-specific concurrency limits

2. Implement (or mock out) your ideal testing framework for this system

## Design and Debrief Discussion

- What is your ideal infrastructure for this system (both low scale and high scale)?
- How do we scale this to 100m calls per month?
- What edge cases do you forsee running this system at scale? How do we prevent those?
- What is your ideal testing framework for this system at scale?
- What controls and design considerations would you have for a multi-tenant approach?
