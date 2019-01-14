FROM node:8
WORKDIR /home/node/app

RUN apt-get update && \
  apt-get install -y python3-pip && \
  pip3 install awscli && \
  mkdir -p dist/server && \
  touch dist/server/index.js && \
  aws configure set aws_access_key_id default_access_key && \
  aws configure set aws_secret_access_key default_secret_key

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i
COPY . .
CMD npm run dev
