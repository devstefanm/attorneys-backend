FROM node:18.16.0

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 5000

CMD /wait && npm run start