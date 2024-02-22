# Chatbot

This is a Telegram chatbot that is built in Node.js with the Telegraf API in a docker container. It simply takes in a Telegram message and checks if it is a specific attendance form and parses it to produce the total attendance and replies it back to the Telegram chat.

## Techstack choice 
- I had previous issues with resolving dependency issues when isntalling the node.js chatbot on an AWS server, hence I saw the need to learn and implement Docker.
- The telegram chatbot didn't need strict performance criteria as it doesn't have to parse large sets of data, hence node.js was used.
- The Telegraf library provides a very simple API to access the incoming text from users to parse and also simple methods to reply back a string to the Telegram chat.

## Installation
- Clone the repository


`docker pull daveanthonyc/docker-chatbot:1.0`


`docker run -d --name container-name -p 80:80 daveanthonyc/dockerchatbot:1.0`

## When updating application
- Build Image

`docker build -t daveanthonyc/docker-chatbot:1.0 .`

- Push changes to DockerHub

`docker push daveanthonyc/docker-chatbot:1.0`

- Connect to AWS server and enter tmux sesesion

`docker pull daveanthonyc/docker-chatbot:1.0`

- Check for current containers

`docker ps -a`

- Stop container

`docker stop CONTAINER_ID`

- Remove container

`docker rm CONTAINER_ID`

- Run newest docker image

`docker run -d --name container_name -p 80:80 daveanthonyc/docker-chatbot:1.0`

# Product Development Case Study: Streamlining Group Attendance Calculation with Telegram Chatbot

## Problem Identification:

* Recognized a pain point: Cumbersome process of calculating group totals, particularly on mobile devices for several teams in a department. Time sensitive reports are required to be submitted but are often late due to dealing with miscalculations or just general slowness with adding the values.
* Identified need for automation to alleviate time and mental overhead.

## Solution Proposal and Stakeholder Engagement:
* Simply demonstrated to stakeholderes what the input and output of the Telegram bot would be without coding it. 
* This was to get feedback on the perceived value of the user experience.

## Development and Implementation:

* After obtaining stakeholder approval, proceeded with development and created the chatbot to aid with attendnace calculations.
* Ensured seamless integration and this was done by ensuring the commands are easy to learn.

## Outcome:
* Successfully deployed Telegram chatbot which received much positive feedback.
* As a result, it is being used each week and saves much time and the department is recognised as one of the fastest departments to submit their time sensitive reports.
* Significantly reduced time and mental overhead associated with group total calculation.

## Conclusion:
* Great success.

