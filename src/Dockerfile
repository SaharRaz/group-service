# Use Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /group-service

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the service files
COPY . .

# Expose the service port
EXPOSE 5004

# Start the application
CMD ["npm" , "run", "debug-dev"]
