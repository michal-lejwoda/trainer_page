FROM node:18.16-bullseye AS development
LABEL authors="michal"
WORKDIR /usr/src/frontend

COPY trainer_page .
COPY ./compose/local/trainer_frontend/start_trainer_frontend ./start_trainer_frontend

RUN sed -i 's/\r$//g' ./start_trainer_frontend
RUN chmod +x ./start_trainer_frontend

RUN npm install
CMD ["npm", "run", "build"]
CMD ["npm", "run", "dev"]

#COPY package.json .
#COPY yarn.lock .
#RUN yarn install
## Copy app files
#COPY . .
## Expose port
#EXPOSE 3000
## Start the app
#CMD [ "yarn", "start" ]
