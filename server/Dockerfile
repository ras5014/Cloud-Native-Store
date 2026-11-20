ARG NODE_VERSION=26

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY drizzle.config.ts ./
COPY src ./src

# For DB migration (npm run db:migrate in the CI/CD pipeline)
COPY drizzle ./drizzle 

RUN npm run build

USER node

EXPOSE 3000

CMD ["node" , "dist/server.js"]