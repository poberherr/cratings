CREATE TABLE reviews (
    id          serial PRIMARY KEY,
    author      varchar(100) NOT NULL,
    created_at  int,
    item        varchar(100) NOT NULL,
    rating      varchar(100) NOT NULL
);
