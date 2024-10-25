FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

# Ensure the existence of package.json with a detailed log and add sleep
RUN ls && \
    if [ -f "package.json" ]; then echo "package.json exists"; else echo "package.json does not exist"; exit 1; fi && \
    sleep 10  # Pauses for 10 seconds

RUN npm i

COPY . .

RUN ls && \
    if [ -f "package.json" ]; then echo "package.json exists"; else echo "package.json does not exist"; exit 1; fi && \
    sleep 30  # Pauses for 30 seconds

CMD ["npm", "run", "start"]