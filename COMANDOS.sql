CREATE TABLE Caso_de_COVID (
    dt_notific  TIME,
    dt_inicio_sintomas  TIME,
    ID INTEGER PRIMARY KEY,
    fk_Evolução_ID INTEGER,
    dt_evolucao TIME
);

CREATE TABLE Bairro (
    codbairro INTEGER PRIMARY KEY,
    nome VARCHAR(32),
    area FLOAT,
    faixa_renda_extrema_pobreza INTEGER,
    faixa_renda_pobreza INTEGER,
    faixa_renda_baixa_renda INTEGER,
    faixa_renda_acima_1_5 INTEGER,
    bolsa_familia_sim INTEGER,
    bolsa_familia_nao INTEGER,
    extrema_pobreza_cadastrado INTEGER,
    extrema_pobreza_sem_registro  INTEGER,
    fk_região_administrativa_codra INTEGER,
    fk_região_de_planejamento_cod_rp INTEGER
);

CREATE TABLE Região_Administrativa (
    codra INTEGER PRIMARY KEY,
    regiao_adm VARCHAR(32)
);

CREATE TABLE Região_de_Planejamento (
    cod_rp INTEGER PRIMARY KEY,
    rp VARCHAR(32)
);

CREATE TABLE Unidades_de_Saude (
    CNES INTEGER PRIMARY KEY,
    NOME VARCHAR(64),
    equipes VARCHAR(32),
    fk_Bairro_codbairro INTEGER,
    endereco VARCHAR(64)
);

CREATE TABLE Evolução (
    evolucao  VARCHAR(16),
    ID INTEGER PRIMARY KEY
);

CREATE TABLE CEP (
    ID INTEGER PRIMARY KEY,
    CEP VARCHAR(16)
);

CREATE TABLE Resida_Bairro_Caso_de_COVID_CEP (
    fk_Bairro_codbairro INTEGER,
    fk_Caso_de_COVID_ID INTEGER,
    fk_CEP_ID INTEGER
);
 
ALTER TABLE Caso_de_COVID ADD CONSTRAINT FK_Caso_de_COVID_2
    FOREIGN KEY (fk_Evolução_ID)
    REFERENCES Evolução (ID)
    ON DELETE CASCADE;
 
ALTER TABLE Bairro ADD CONSTRAINT FK_Bairro_2
    FOREIGN KEY (fk_Região_Administrativa_codra)
    REFERENCES Região_Administrativa (codra)
    ON DELETE RESTRICT;
 
ALTER TABLE Bairro ADD CONSTRAINT FK_Bairro_3
    FOREIGN KEY (fk_Região_de_Planejamento_cod_rp)
    REFERENCES Região_de_Planejamento (cod_rp)
    ON DELETE RESTRICT;
 
ALTER TABLE Unidades_de_Saude ADD CONSTRAINT FK_Unidades_de_Saude_2
    FOREIGN KEY (fk_Bairro_codbairro)
    REFERENCES Bairro (codbairro)
    ON DELETE CASCADE;
 
ALTER TABLE Resida_Bairro_Caso_de_COVID_CEP ADD CONSTRAINT FK_Resida_Bairro_Caso_de_COVID_CEP_1
    FOREIGN KEY (fk_Bairro_codbairro)
    REFERENCES Bairro (codbairro)
    ON DELETE NO ACTION;
 
ALTER TABLE Resida_Bairro_Caso_de_COVID_CEP ADD CONSTRAINT FK_Resida_Bairro_Caso_de_COVID_CEP_2
    FOREIGN KEY (fk_Caso_de_COVID_ID)
    REFERENCES Caso_de_COVID (ID)
    ON DELETE NO ACTION;
 
ALTER TABLE Resida_Bairro_Caso_de_COVID_CEP ADD CONSTRAINT FK_Resida_Bairro_Caso_de_COVID_CEP_3
    FOREIGN KEY (fk_CEP_ID)
    REFERENCES CEP (ID)
    ON DELETE NO ACTION;

INSERT INTO Região_Administrativa VALUES (1, 'Região 1');
INSERT INTO Região_de_Planejamento VALUES (1, 'Região de Planejamento 1');
INSERT INTO Região_Administrativa VALUES (2, 'Região 2');
INSERT INTO Região_de_Planejamento VALUES (2, 'Região de Planejamento 2');
INSERT INTO Região_Administrativa VALUES (3, 'Região 3');
INSERT INTO Região_de_Planejamento VALUES (3, 'Região de Planejamento 3');

INSERT INTO Bairro VALUES (1, 'Bairro 1', 1.0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO Bairro VALUES (2, 'Bairro 2', 2.0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2);
INSERT INTO Bairro VALUES (3, 'Bairro 3', 3.0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3);
INSERT INTO Bairro VALUES (4, 'Bairro 4', 4.0, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3);
INSERT INTO Bairro VALUES (5, 'Bairro 5', 5.0, 5, 5, 5, 5, 5, 5, 5, 5, 3, 2);
