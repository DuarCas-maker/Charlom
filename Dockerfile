FROM node:22-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node package.json ./
COPY --chown=node:node admin.html index.html server.mjs styles.css ./
COPY --chown=node:node assets ./assets
COPY --chown=node:node config ./config
COPY --chown=node:node src ./src

USER node

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 4173)).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["npm", "start"]
