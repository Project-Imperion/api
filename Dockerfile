# Use Node.js base image
FROM node:lts-alpine

WORKDIR /app

# Install dependencies and TypeScript
COPY package*.json ./
RUN npm install

# Copy the rest of your files
COPY . .

# Build TypeScript (to JS)
RUN npm run build

# Use a clean image, copy built code (optional multi-stage)
FROM node:alpine
ENV NODE_ENV=prod
WORKDIR /app
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/.env ./.env
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
