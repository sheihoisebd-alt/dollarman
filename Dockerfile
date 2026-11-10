# Optional: for a later move to a VPS. Requires switching to @sveltejs/adapter-node first (see README).
# Build:  docker build -t dollarman .
# Run:    docker run -p 3000:3000 --env-file .env -e ORIGIN=https://dollarmanlearning.com dollarman

FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
# PUBLIC_* variables are inlined at build time, so pass them as build args if needed.
ARG PUBLIC_SITE_URL
ARG PUBLIC_TELEGRAM_CHANNEL
ARG PUBLIC_META_PIXEL_ID
RUN npm run build && npm prune --omit=dev

FROM node:24-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000 DATABASE_PATH=/app/data/content.db
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
# The content DB built at image build time. To allow writes later, mount a volume at /app/data
# (and run `npm run db:migrate` against it), then set DATABASE_READONLY=false.
COPY --from=build /app/data ./data
EXPOSE 3000
CMD ["node", "--no-warnings=ExperimentalWarning", "build"]
