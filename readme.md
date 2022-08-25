## WisePokemon - express

### Todo
* check express-openapi-validator / swagger-routes-express!
* fix the anies
* add more tests (db tests)
* add extra pokemon fields
* controller error handling

### Docs

postman collection
see `docs/WisePokemon Express.postman_collection.json`

### Setup

Add keys for https server
Instal mkcert https://github.com/FiloSottile/mkcert

```bash
cd keys
mkcert -install
mkcert localhost
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