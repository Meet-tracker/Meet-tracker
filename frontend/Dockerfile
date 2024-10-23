# Stage 1: Build the Angular app
FROM node:22.9.0 AS build-img
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./package.json
RUN npm install --force

# Copy all other files and build the app
COPY . .
RUN npm run build

FROM node:22.9.0
WORKDIR /app

# Скопируйте все нужные файлы
COPY --from=build-img /app/dist/ ./dist/
COPY package.json ./package.json
RUN npm install --force  # Установите зависимости для серверной части

# Expose port 4000 (или другой порт, который вы используете)
EXPOSE 4000

# Запустите сервер
CMD ["node", "dist/frontend/server/server.mjs"]
