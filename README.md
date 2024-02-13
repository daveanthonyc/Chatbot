# Chatbot

This is a Telegram chatbot that is built in a docker container. It simply takes in a specific attendance form and parses it to produce the total attendance of my church.

## Installation
- Clone the repository
- Build the Docker Image: 
`docker build -t Docker-Chatbot .`

- Run the Docker Image:
`docker run -d -p 8080:80 image-name`
