# Charlom

## Deploy en Coolify

Esta app es estática y se sirve con `server.mjs`.

Configuración recomendada en Coolify:

- Source: GitHub repository
- Branch: `main`
- Build Pack: Dockerfile
- Dockerfile: `Dockerfile`
- Port: `4173`

Coolify puede inyectar `PORT`; el servidor también usa `4173` como valor por defecto.

Comandos locales:

```bash
npm start
```

```bash
docker build -t charlom .
docker run --rm -p 4173:4173 charlom
```
