FROM node:20 as BUILD_IMAGE
WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .
# build
RUN yarn build
# remove dev dependencies
#RUN npm prune --production
FROM node:alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000
CMD ["yarn", "start"]

# #FROM node:20-alpine as builder
# FROM node:slim as builder
# #--build-arg

# #Set Argumen
# # ARG PORT
# # ARG ENV

# # set working directory
# WORKDIR /app


# # add app
# COPY . ./
# #set env file
# # COPY .env.${ENV} .env
# RUN yarn install
# RUN yarn build
# #RUN npm install
# #RUN npm run build:${BRANCH}

# #base image
# FROM nginx:latest
# #ARG BRANCH
# #ARG PORT
# #set working directory
# WORKDIR /usr/share/nginx/html/
# #copy build source
# # COPY --from=builder /app/dist/ ./
# COPY --from=builder /app/ ./
# #set env file
# #COPY .env.${BRANCH} .env
# COPY default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 8001

# CMD ["nginx", "-g", "daemon off;"]