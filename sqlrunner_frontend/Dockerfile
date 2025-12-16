# Stage 1: Build the React application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json  ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

ENV VITE_API_URL=${VITE_API_URL:-http://localhost:8000}

# Build the application
RUN npm run build

EXPOSE 80

# Start Nginx server
CMD ["npm", "run", "dev"]
