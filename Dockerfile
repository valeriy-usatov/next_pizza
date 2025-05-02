# Этап сборки
FROM node:20-slim AS builder

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN apt-get update && apt-get install -y python3 make g++ curl

WORKDIR /app

# Устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Копируем только нужные файлы
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

RUN echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"

# Собираем Next.js проект
RUN npm run build

# Этап рантайма
FROM node:20-slim AS runner

WORKDIR /app

# Устанавливаем curl и netcat для healthchecks и отладки
RUN apt-get update && apt-get install -y curl netcat-openbsd && rm -rf /var/lib/apt/lists/*



# Копируем артефакты сборки и необходимые ресурсы
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["npm", "start"]
