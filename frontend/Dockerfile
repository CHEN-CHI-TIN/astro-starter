FROM node:19.6.1-alpine3.17 as build
# Enable corepack so pnpm is available
RUN corepack enable
# Set working directory and start building app
WORKDIR /app
# Copy only package.json and pnpm-lock.yml 
COPY package.json pnpm-lock.yaml ./
# Install dependencies required to build the app
RUN pnpm i
# Copy app source
COPY . .
# Build the app
RUN pnpm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html