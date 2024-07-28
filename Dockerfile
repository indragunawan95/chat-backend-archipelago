# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript and ts-node globally
RUN npm install -g typescript ts-node

# Copy the rest of the application
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
