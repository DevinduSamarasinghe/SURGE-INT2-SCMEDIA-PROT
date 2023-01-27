FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8060

ENV NODE_ENV production

CMD ["npm", "start"] 
