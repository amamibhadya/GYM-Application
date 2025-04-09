# Use Node.js version 20
FROM node:20.14.0

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory
WORKDIR /gymapp

# Copy package.json and package-lock.json
COPY package.json package-lock.json 

# Install dependencies
RUN npm install

# Copy all remaining files to the container
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application using nodemon
CMD ["npx", "nodemon", "-L", "index.js"]  # Use npx for nodemon
