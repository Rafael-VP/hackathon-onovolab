# Use a Node.js base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
# This leverages Docker's cache for faster builds
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port for the React dev server
EXPOSE 5173

# The command to start the dev server
CMD ["npm", "start"]
#CMD ["npm", "run", "dev", "--", "--host"]
