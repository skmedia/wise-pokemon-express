## WisePokemon - express

### Todo
* fix the anies
* add tests
* add extra pokemon fields
* controller error handling
* eslint config

### Docs

postman collection
see docs/WisePokemon Express.postman_collection.json

### Setup

Add keys for https server
Instal mkcert https://github.com/FiloSottile/mkcert

```bash
cd keys
mkcert -install
mkcert localhost
```

check key names in index.ts

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