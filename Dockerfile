# Use an official Node.js runtime as a parent image
FROM node:24-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Create a volume for stats.json to persist data
VOLUME /usr/src/app/data

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables (optional, can be set at runtime)
# ENV PORT=3000
# ENV RESET_TOKEN=supersecret

# Run the app when the container launches
CMD [ "npm", "start" ]
