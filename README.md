# Social-network-for-developers

DevConnector is a social networking site to connect with other developers

## Intructions

```
## clone repo
git clone git@github.com:renboy94/Social-network-for-developers.git

## install dependencies
npm install
```

## Add dev keys in /config/keys_dev.js

```
module.exports = {
  mongoURI: <DB_URI>,
  secretOrKey: <SECRET>
};

```

## Run app

```
## run both server and client with concurrently
npm run dev
```
