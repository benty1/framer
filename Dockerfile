# --- Build Stage ---
FROM node:22-alpine AS builder
WORKDIR /app

# Copy lockfiles first for optimized caching
COPY package*.json ./
RUN npm ci

# Copy code and compile the build folder
COPY . .
RUN npm run build

# --- Production Serving Stage ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
