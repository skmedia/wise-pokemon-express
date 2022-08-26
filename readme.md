## WisePokemon - express

### Todo / improvements
* check express-openapi-validator / swagger-routes-express
* add more tests (db tests)
* save sprites
* controller error handling
* add caching

### Docs

postman collection
see `docs/WisePokemon Express.postman_collection.json`

### Setup

Add keys for https server
Instal mkcert https://github.com/FiloSottile/mkcert

```bash
cd keys
mkcert localhost 127.0.0.1 ::1
```

check key definition in index.ts

### Start db
```
docker-compose up -d
```

### Start app
```
npm i
npm run init-db
npm run dev
```

https://localhost:8022

### Commands
```
npm run load-pokemons-from-file
npm run load-pokemon-from-api pikachu
```

### Lint & test
```
npm run test
npm run lint
```