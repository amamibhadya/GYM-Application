# # Use Node.js version 20
# FROM node:20.14.0

# # Install nodemon globally
# RUN npm install -g nodemon

# # Set the working directory
# WORKDIR /gymapp

# # Copy package.json and package-lock.json separately (better caching)
# COPY package.json ./

# # Install dependencies
# RUN npm install

# # Copy all remaining files to the container
# COPY . .

# # Expose the application port
# EXPOSE 3001

# # Start the application using nodemon
# CMD ["nodemon", "-L", "index.js"]


# Use Node.js image
FROM node:20.14.0

# Install nodemon globally
RUN npm install -g nodemon

# Set working directory
WORKDIR /gymapp



# Copy only package.json to install dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Now copy the rest of the project
COPY . .

# Expose backend port
EXPOSE 3001

# Start server
CMD ["nodemon", "-L", "index.js"]
