FROM node:14 as builder

RUN mkdir -p /app
WORKDIR /app
COPY package.json .
RUN npm install

COPY . .

# Переменную окружения CI ставим для нормального выхода из результатов
# тесто. Сам тест пришлось исправить - он был создан автоматически и
# не соотвествовал приложению
ENV CI=true
RUN npm run test 

# Возвращаем переменную. Без нее build не пройдет, обрабатывая 
# все предупреждения как ошибки
ENV CI=false
RUN npm run build

# Используем двухэтапную сборку. В окончательной вресии используем 
# просто NGINX уже без Node.js
FROM nginx:1.20.2-alpine

EXPOSE 80

COPY --from=builder /app/build /usr/share/nginx/html

