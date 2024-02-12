CREATE TABLE
  public.books (
    id serial NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    isbn character varying(255) NOT NULL UNIQUE,
    description character varying(255) NOT NULL UNIQUE,
    addedTime timestamp without time zone NOT null,
    deletedTime timestamp without time zone NOT null,
    numOfRead int not NULL
  );

ALTER TABLE
  public.books
ADD
  CONSTRAINT book_pkey PRIMARY KEY (id)