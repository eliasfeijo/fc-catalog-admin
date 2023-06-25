FROM node:18-slim

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "yarn && tail -f /dev/null" ]