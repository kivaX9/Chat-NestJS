# Используем образ Node.js
FROM node:16

# Установка pm2
RUN npm install -g pm2

# Копирование всех файлов в директорию app
WORKDIR /app
COPY . .

# Установка зависимостей gateway
WORKDIR /app/gateway
COPY gateway/package*.json ./
RUN npm install
RUN npm run build

# Установка зависимостей users
WORKDIR /app/users
COPY users/package*.json ./
RUN npm install
RUN npm run build

# Установка зависимостей comments
WORKDIR /app/comments
COPY comments/package*.json ./
RUN npm install
RUN npm run build

# Запуск с pm2
WORKDIR /app
CMD ["pm2-runtime", "start", "ecosystem.config.js"]