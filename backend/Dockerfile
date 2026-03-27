# Use official Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /app/backend

# Copy package files
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY --chown=node:node . .

# Use non-root user
USER node

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
