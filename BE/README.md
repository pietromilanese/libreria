# Libreria
In questa cartella è presente il backend per la memorizzazione dei dati.
Per prima cosa va creato un contenitore Docker per utilizzare il database con PostgresDB.
Di seguito il comando da eseguire sul terminale per generare il Container:
### Docker 

Run on terminal

```
docker run --name libri -e POSTGRES_USER=pietro -e POSTGRES_DB=libri -e POSTGRES_PASSWORD=pietro -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```

Una volta installato e avviato il container si procede a connettere il db con DBeaver.

Nel folder sql sono presenti i comandi sql per creare le tabelle.

```
BE
|-- sql/
|   |-- book.sql
|   |-- users.sql
```

Installare in seguito le librerie per la gestione del server in Node

### Express Pg

eseguire il comando per installare Express e Pg

```
npm install express pg
```

In app.js è presente il codice per creare il server.


run del server

```
node app.js
```
aprire il server su http://localhost:3000


