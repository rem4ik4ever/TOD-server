# install all dependencies
FROM node:alpine as deps

WORKDIR /app

COPY package*.json ./

RUN npm install --production=false

# build project
FROM node:alpine as builder

WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN npm run build

# run production build

FROM node:alpine as runner

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN addgroup -g 1001 -S server
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:server /app
USER nodejs

EXPOSE 8080

CMD ["node", "/app/index.js"]


