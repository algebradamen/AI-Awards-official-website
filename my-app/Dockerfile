FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install dependencies; skip postinstall (which tries to build Team-5 sub-project)
RUN npm install --ignore-scripts

# Copy the rest of the source
COPY . .

EXPOSE 3000

# Start Next.js dev server on all interfaces
CMD ["npx", "next", "dev", "--hostname", "0.0.0.0"]
