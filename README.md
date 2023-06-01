# Docsy

## Document Sharing PWA

### Prerequisites

Before you begin you'll need to do the following:

- set up keycloak (run `docker-compose -f docker-compose.yml up` and just create Realm and your user)
- set up env files in each microservice
- run migrations in server microservice: `./migrate.sh`
- create seed user in DB (same user as on keycloak)
- set up OneSignal for notifications
- create seed tags in DB (same as on OneSignal)
- create self signed certificates (openssl) in `server/src/environment/httpServer/ssl/certs`

---

### Important

Server is set up to run on HTTPS in order for some of the key PWA feature to work
(access to camera will only work over HTTPS).
If this is not needed, just edit HttpServer.ts file in server microservice and comment out
the lines for ssl certificates.

---

To start server:

```
cd server
docker-compose -f docker-compose.yml up
npm run dev
```

To start notify:

```
cd notify
npm run dev
```

To start client:

```
cd client
HTTPS=true npm start
```
