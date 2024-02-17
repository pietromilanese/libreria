CREATE TABLE public.books (
  id serial NOT NULL,
  title character varying(255) NOT NULL,
  author character varying(255) NOT NULL,
  isbn character varying(255) NOT NULL,
  description character varying(255) NOT NULL,
  addedTime timestamp without time zone NOT NULL,
  deletedTime timestamp without time zone NOT NULL,
  numOfRead int NOT NULL,
  user_id INT, 
  CONSTRAINT book_pkey PRIMARY KEY (id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users (id)
);
