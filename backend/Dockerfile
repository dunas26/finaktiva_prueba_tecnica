FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm i --production
COPY --from=builder /app/dist ./dist
COPY ./migrations ./migrations
COPY migration.js .
CMD ["node", "./dist/index.js"]
