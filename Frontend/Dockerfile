FROM node:20.14.0

WORKDIR /gymapp

COPY package.json .

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 5173

CMD ["npm","run","dev"]