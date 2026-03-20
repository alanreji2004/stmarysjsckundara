create table orders (
  id bigint generated always as identity primary key,
  name text not null,
  address text not null,
  whatsapp text not null,
  biriyani_count integer not null,
  created_at timestamp default now()
);
