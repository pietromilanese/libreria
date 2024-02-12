CREATE TABLE public.users (
  id serial NOT NULL,
  first_name character varying(255) NOT NULL,
  second_name character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  last_login timestamp without time zone NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);