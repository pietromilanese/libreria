# libreria
## Docker 

Run on terminal

```
docker run --name libri -e POSTGRES_USER=pietro -e POSTGRES_DB=libri -e POSTGRES_PASSWORD=pietro -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```