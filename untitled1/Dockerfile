FROM node:16 AS build

WORKDIR /app

RUN npm install bootstrap@5.3.3 cors@2.8.5 cra-template@1.2.0 react@18.0.0 react-dom@18.0.0 react-router-dom@7.1.0 react-scripts@5.0.1 swr@2.3.0


COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
