CREATE TABLE usuarios(
    id serial PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    cpf varchar(11) UNIQUE,
    telefone varchar(13)
);

CREATE TABLE clientes(
    id serial PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf varchar(11) NOT NULL UNIQUE,
    telefone varchar(13) NOT NULL,
    CEP varchar(8),
    logradouro TEXT,
    complemento TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);

CREATE TABLE cobrancas(
  	cobranca_id serial,
    cliente_id INT NOT NULL,
    descricao TEXT NOT NULL,
    status TEXT NOT NULL,
    valor INT NOT NULL,
    vencimento DATE NOT NULL,
    PRIMARY KEY(cobranca_id),
    CONSTRAINT fk_cliente
       FOREIGN KEY(cliente_id)
          REFERENCES clientes(id)
             ON DELETE CASCADE
             ON UPDATE CASCADE
);