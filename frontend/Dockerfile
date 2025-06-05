# ================================
# Stage 1: Build React App (Vite)
# ================================
FROM node:20-alpine as build

# Set working directory inside the container
WORKDIR /app

# Accept API base URL as a build-time argument
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Copy all project files into the container
COPY . .

# Install dependencies and build the app
RUN npm install
RUN npm run build

# ================================
# Stage 2: Serve with Nginx
# ================================
FROM nginx:alpine

# Copy built app from previous stage to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default Nginx config with custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
