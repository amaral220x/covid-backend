import mysql from 'mysql';
import express, { response } from 'express';
const app = express();
const port = 3000;
import connection from './connect.js';
import e from 'express';

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.use(express.json());
app.get('/tables', (req, res) => {
    connection.query('SHOW TABLES', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

//Quantidade de pessoas por bairro 
app.get('/quantidade/faixa-renda/bairro', (req, res) => {
    //const {bairro} = req.body;
    connection.query('SELECT codbairro, nome, faixa_renda_extrema_pobreza, faixa_renda_pobreza, faixa_renda_baixa_renda, faixa_renda_acima_1_5, bolsa_familia_sim, bolsa_familia_nao, extrema_pobreza_cadastrado, extrema_pobreza_sem_registro from bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/quantidade/faixa-renda/regiaoadministrativa', (req, res) => {
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm, SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza, SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5  FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra ',  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda/regiaoplanejamento', (req, res) => {
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp,SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza, SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5  FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp ',  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});     
app.get('/quantidade/bolsa-familia/bairro', (req,res) =>{
    connection.query('SELECT nome, bolsa_familia_sim, bolsa_familia_nao FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/bolsa-familia/bairro/metrica', (req,res) =>{
    var response 
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM bairro',(err, result) => {
        if (err) throw err;
        console.log(result); 
        response = result;
    });
    connection.query('SELECT nome as max_bairro FROM bairro WHERE bolsa_familia_sim = (SELECT MAX(bolsa_familia_sim) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        response = response.concat(result);
    });
    connection.query('SELECT nome as min_bairro FROM bairro WHERE bolsa_familia_sim = (SELECT MIN(bolsa_familia_sim) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result);
        response = response.concat(result);
        res.send(response);
    });
});

app.get('/quantidade/bolsa-familia/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm, SUM(bolsa_familia_sim) as bolsa_familia_sim, SUM(bolsa_familia_nao) as bolsa_familia_nao  FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/bolsa-familia/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        response = result;
    });
    var query = "SELECT regiao_adm as max_regiao, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        response = response.concat(result);
    });
    connection.query("SELECT regiao_adm as max_regiao, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        response = response.concat(result);
        res.send(response);
    });
});
app.get('/quantidade/bolsa-familia/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp, SUM(bolsa_familia_sim) as bolsa_familia_sim, SUM(bolsa_familia_nao) as bolsa_familia_nao  FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/bolsa-familia/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        response = result;
    });
    var query = "SELECT rp as max_regiao_planejamento, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        response = response.concat(result);
    });
    connection.query("SELECT rp as min_regiao_planejamento, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        response = response.concat(result);
        res.send(response);
    });
});

app.get('/quantidade/extrema-pobreza/bairro', (req,res) =>{
    connection.query('SELECT nome, extrema_pobreza_cadastrado, extrema_pobreza_sem_registro FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get('/quantidade/extrema-pobreza/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm, SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado, SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro  FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/extrema-pobreza/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp, SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado, SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.listen(3000);