# Chatbot

This is a Telegram chatbot that is built in Node.js with the Telegraf API in a docker container. It simply takes in a Telegram message and checks if it is a specific attendance form and parses it to produce the total attendance and replies it back to the Telegram chat.

## Installation
- Clone the repository
- Build the Docker Image: 
`docker build -t Docker-Chatbot .`

- Run the Docker Image:
`docker run -d -p 8080:80 image-name`
