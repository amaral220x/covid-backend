import mysql from 'mysql';
import express, { response } from 'express';
const app = express();
const port = 3000;
import connection from './connect.js';
import e from 'express';
import cors from 'cors';

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

app.use(cors('localhost:5173'));
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
    //const {bairro} = req.query;
    connection.query('SELECT codbairro, nome, faixa_renda_extrema_pobreza, faixa_renda_pobreza, faixa_renda_baixa_renda, faixa_renda_acima_1_5, bolsa_familia_sim, bolsa_familia_nao, extrema_pobreza_cadastrado, extrema_pobreza_sem_registro from bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda/regiaoadministrativa', (req, res) => {
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm as nome, SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza, SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5, SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra ',  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda/regiaoplanejamento', (req, res) => {
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp as nome,SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza, SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5, SUM(faixa_renda_pobreza) as faixa_renda_pobreza  FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp ',  (err, result) => {
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
    var response2
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM bairro',(err, result) => {
        if (err) throw err;
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    connection.query('SELECT MAX(bolsa_familia_nao) as maximo, MIN(bolsa_familia_nao) as minimo, SUM(bolsa_familia_nao) as total, AVG(bolsa_familia_nao) as media FROM bairro',(err, result) => {
        if (err) throw err;
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    connection.query('SELECT nome as max_regiao FROM bairro WHERE bolsa_familia_sim = (SELECT MAX(bolsa_familia_sim) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query('SELECT nome as max_regiao FROM bairro WHERE bolsa_familia_nao = (SELECT MAX(bolsa_familia_nao) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query('SELECT nome as min_regiao FROM bairro WHERE bolsa_familia_sim = (SELECT MIN(bolsa_familia_sim) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    connection.query('SELECT nome as min_regiao FROM bairro WHERE bolsa_familia_nao = (SELECT MIN(bolsa_familia_nao) FROM bairro)', (err, result) => {
        if (err) throw err;
        console.log(result[0]);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            bolsa_familia_sim: response,
            bolsa_familia_nao: response2
        }
        res.send(responseFinal);
    });
});
app.get('/quantidade/bolsa-familia/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm as nome, SUM(bolsa_familia_sim) as bolsa_familia_sim, SUM(bolsa_familia_nao) as bolsa_familia_nao  FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/bolsa-familia/regiaoadministrativa/metrica', (req,res) =>{
    var response
    var response2
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }

    });
    connection.query('SELECT MAX(bolsa_familia_nao) as maximo, MIN(bolsa_familia_nao) as minimo, SUM(bolsa_familia_nao) as total, AVG(bolsa_familia_nao) as media FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    var query = "SELECT regiao_adm as max_regiao, SUM(bolsa_familia_nao) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(bolsa_familia_nao) as maximo FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT regiao_adm as min_regiao, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    connection.query("SELECT regiao_adm as min_regiao, SUM(bolsa_familia_nao) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(bolsa_familia_nao) as maximo FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            bolsa_familia_sim:response,
            bolsa_familia_nao:response2
        }
        res.send(responseFinal);
    });
});
app.get('/quantidade/bolsa-familia/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp as nome, SUM(bolsa_familia_sim) as bolsa_familia_sim, SUM(bolsa_familia_nao) as bolsa_familia_nao  FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/bolsa-familia/regiaoplanejamento/metrica', (req,res) =>{
    var response
    var response2
    connection.query('SELECT MAX(bolsa_familia_sim) as maximo, MIN(bolsa_familia_sim) as minimo, SUM(bolsa_familia_sim) as total, AVG(bolsa_familia_sim) as media FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    connection.query('SELECT MAX(bolsa_familia_nao) as maximo, MIN(bolsa_familia_nao) as minimo, SUM(bolsa_familia_nao) as total, AVG(bolsa_familia_nao) as media FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT rp as max_regiao_planejamento, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao_planejamento;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    var query = "SELECT rp as max_regiao, SUM(bolsa_familia_nao) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(bolsa_familia_nao) as maximo FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT rp as min_regiao_planejamento, SUM(bolsa_familia_sim) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(bolsa_familia_sim) as maximo FROM (SELECT SUM(bolsa_familia_sim) as bolsa_familia_sim FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao_planejamento;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    connection.query("SELECT rp as min_regiao, SUM(bolsa_familia_nao) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp =  regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(bolsa_familia_nao) as maximo FROM (SELECT SUM(bolsa_familia_nao) as bolsa_familia_nao FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            bolsa_familia_sim:response,
            bolsa_familia_nao:response2
        }
        res.send(responseFinal);
    });
});

app.get('/quantidade/extrema-pobreza/bairro', (req,res) =>{
    connection.query('SELECT nome, extrema_pobreza_cadastrado, extrema_pobreza_sem_registro FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/extrema-pobreza/bairro/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(extrema_pobreza_cadastrado) as maximo, MIN(extrema_pobreza_cadastrado) as minimo, SUM(extrema_pobreza_cadastrado) as total, AVG(extrema_pobreza_cadastrado) as media FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, extrema_pobreza_cadastrado as quantidade FROM bairro HAVING quantidade = ( SELECT MAX(extrema_pobreza_cadastrado) as maximo FROM bairro)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, extrema_pobreza_cadastrado as quantidade FROM bairro HAVING quantidade = ( SELECT MIN(extrema_pobreza_cadastrado) as maximo FROM bairro)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    var response2
    connection.query('SELECT MAX(extrema_pobreza_sem_registro) as maximo, MIN(extrema_pobreza_sem_registro) as minimo, SUM(extrema_pobreza_sem_registro) as total, AVG(extrema_pobreza_sem_registro) as media FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, extrema_pobreza_sem_registro as quantidade FROM bairro HAVING quantidade = ( SELECT MAX(extrema_pobreza_sem_registro) as maximo FROM bairro)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, extrema_pobreza_sem_registro as quantidade FROM bairro HAVING quantidade = ( SELECT MIN(extrema_pobreza_sem_registro) as maximo FROM bairro)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            extrema_pobreza_cadastrado:response,
            extrema_pobreza_sem_registro:response2
        }
        res.send(responseFinal);
    });
});
app.get('/quantidade/extrema-pobreza/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm as nome, SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado, SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro  FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/extrema-pobreza/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(extrema_pobreza_cadastrado) as maximo, MIN(extrema_pobreza_cadastrado) as minimo, SUM(extrema_pobreza_cadastrado) as total, AVG(extrema_pobreza_cadastrado) as media FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao, SUM(extrema_pobreza_cadastrado) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(extrema_pobreza_cadastrado) as maximo FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT regiao_adm as min_regiao, SUM(extrema_pobreza_cadastrado) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(extrema_pobreza_cadastrado) as maximo FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    var response2
    connection.query('SELECT MAX(extrema_pobreza_sem_registro) as maximo, MIN(extrema_pobreza_sem_registro) as minimo, SUM(extrema_pobreza_sem_registro) as total, AVG(extrema_pobreza_sem_registro) as media FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao, SUM(extrema_pobreza_sem_registro) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(extrema_pobreza_sem_registro) as maximo FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT regiao_adm as min_regiao, SUM(extrema_pobreza_sem_registro) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(extrema_pobreza_sem_registro) as maximo FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            extrema_pobreza_cadastrado:response,
            extrema_pobreza_sem_registro:response2
        }
        res.send(responseFinal);
    });
});

app.get('/quantidade/extrema-pobreza/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp as nome, SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado, SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/extrema-pobreza/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(extrema_pobreza_cadastrado) as maximo, MIN(extrema_pobreza_cadastrado) as minimo, SUM(extrema_pobreza_cadastrado) as total, AVG(extrema_pobreza_cadastrado) as media FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT rp as max_regiao, SUM(extrema_pobreza_cadastrado) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(extrema_pobreza_cadastrado) as maximo FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT rp as min_regiao, SUM(extrema_pobreza_cadastrado) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(extrema_pobreza_cadastrado) as maximo FROM (SELECT SUM(extrema_pobreza_cadastrado) as extrema_pobreza_cadastrado FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
    });
    var response2
    connection.query('SELECT MAX(extrema_pobreza_sem_registro) as maximo, MIN(extrema_pobreza_sem_registro) as minimo, SUM(extrema_pobreza_sem_registro) as total, AVG(extrema_pobreza_sem_registro) as media FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response2 = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT rp as max_regiao, SUM(extrema_pobreza_sem_registro) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(extrema_pobreza_sem_registro) as maximo FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response2 = {
            ...response2,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT rp as min_regiao, SUM(extrema_pobreza_sem_registro) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(extrema_pobreza_sem_registro) as maximo FROM (SELECT SUM(extrema_pobreza_sem_registro) as extrema_pobreza_sem_registro FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response2 = {
            ...response2,
            min_regiao: min_regiao
        }
        var responseFinal = {
            extrema_pobreza_cadastrado: response,
            extrema_pobreza_sem_registro: response2
        }
        res.send(responseFinal);
    });

});

app.get('/quantidade/baixa-renda/bairro', (req,res) =>{
    connection.query('SELECT codbairro, nome, SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro GROUP BY codbairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/baixa-renda/bairro/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_baixa_renda) as maximo, MIN(faixa_renda_baixa_renda) as minimo, SUM(faixa_renda_baixa_renda) as total, AVG(faixa_renda_baixa_renda) as media FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro GROUP BY codbairro) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro GROUP BY codbairro HAVING quantidade = ( SELECT MAX(faixa_renda_baixa_renda) as maximo FROM bairro)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro GROUP BY codbairro HAVING quantidade = ( SELECT MIN(faixa_renda_baixa_renda) as maximo FROM bairro)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/baixa-renda/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm as nome, SUM(faixa_renda_baixa_renda) faixa_renda_baixa_renda FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/baixa-renda/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_baixa_renda) as maximo, MIN(faixa_renda_baixa_renda) as minimo, SUM(faixa_renda_baixa_renda) as total, AVG(faixa_renda_baixa_renda) as media_por_regiao FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao_administrativa, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(faixa_renda_baixa_renda) as maximo FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao_administrativa;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT regiao_adm as min_regiao_administrativa, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(faixa_renda_baixa_renda) as maximo FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao_administrativa;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/baixa-renda/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT fk_regiao_de_planejamento_cod_rp, rp as nome, SUM(faixa_renda_baixa_renda) faixa_renda_baixa_renda FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/baixa-renda/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_baixa_renda) as maximo, MIN(faixa_renda_baixa_renda) as minimo, SUM(faixa_renda_baixa_renda) as total, AVG(faixa_renda_baixa_renda) as media_por_regiao FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT rp as max_regiao_planejamento, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(faixa_renda_baixa_renda) as maximo FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao_planejamento;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT rp as min_regiao_planejamento, SUM(faixa_renda_baixa_renda) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(faixa_renda_baixa_renda) as maximo FROM (SELECT SUM(faixa_renda_baixa_renda) as faixa_renda_baixa_renda FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao_planejamento;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/pobreza/bairro', (req,res) =>{
    connection.query('SELECT nome, SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro GROUP BY nome', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/pobreza/bairro/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_pobreza) as maximo, MIN(faixa_renda_pobreza) as minimo, SUM(faixa_renda_pobreza) as total, AVG(faixa_renda_pobreza) as media_por_bairro FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_bairro;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, SUM(faixa_renda_pobreza) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MAX(faixa_renda_pobreza) as maximo FROM bairro)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, SUM(faixa_renda_pobreza) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MIN(faixa_renda_pobreza) as maximo FROM bairro)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/pobreza/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT rp as nome, SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro FULL JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/pobreza/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_pobreza) as maximo, MIN(faixa_renda_pobreza) as minimo, SUM(faixa_renda_pobreza) as total, AVG(faixa_renda_pobreza) as media_por_regiao FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media

        }
    });
    var query = "SELECT rp as max_regiao_planejamento, SUM(faixa_renda_pobreza) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(faixa_renda_pobreza) as maximo FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_planejamento = result[0].max_regiao_planejamento;
        response = {
            ...response,
            max_regiao: max_regiao_planejamento
        }
    });
    connection.query("SELECT rp as min_regiao_planejamento, SUM(faixa_renda_pobreza) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(faixa_renda_pobreza) as maximo FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_planejamento = result[0].min_regiao_planejamento;
        response = {
            ...response,
            min_regiao: min_regiao_planejamento
        }
        res.send(response);
    });
});
app.get('/quantidade/pobreza/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT fk_regiao_administrativa_codra, regiao_adm as nome, SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/pobreza/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_pobreza) as maximo, MIN(faixa_renda_pobreza) as minimo, SUM(faixa_renda_pobreza) as total, AVG(faixa_renda_pobreza) as media FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao_administrativa, SUM(faixa_renda_pobreza) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(faixa_renda_pobreza) as maximo FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_administrativa = result[0].max_regiao_administrativa;
        response = {
            ...response,
            max_regiao: max_regiao_administrativa
        }
    });
    connection.query("SELECT regiao_adm as min_regiao_administrativa, SUM(faixa_renda_pobreza) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(faixa_renda_pobreza) as maximo FROM (SELECT SUM(faixa_renda_pobreza) as faixa_renda_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_administrativa = result[0].min_regiao_administrativa;
        response = {
            ...response,
            min_regiao: min_regiao_administrativa
        }
        res.send(response);
    });
});

app.get('/quantidade/acima1-5/bairro', (req,res) =>{
    connection.query('SELECT nome, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro GROUP BY nome', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/acima1-5/bairro/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_acima_1_5) as maximo, MIN(faixa_renda_acima_1_5) as minimo, SUM(faixa_renda_acima_1_5) as total, AVG(faixa_renda_acima_1_5) as media_por_bairro FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_bairro;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MAX(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro GROUP BY nome) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MIN(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro GROUP BY nome) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/acima1-5/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT regiao_adm as nome,  SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/acima1-5/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_acima_1_5) as maximo, MIN(faixa_renda_acima_1_5) as minimo, SUM(faixa_renda_acima_1_5) as total, AVG(faixa_renda_acima_1_5) as media FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao_administrativa, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_administrativa = result[0].max_regiao_administrativa;
        response = {
            ...response,
            max_regiao: max_regiao_administrativa
        }
    });
    connection.query("SELECT regiao_adm as min_regiao_administrativa, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_administrativa = result[0].min_regiao_administrativa;
        response = {
            ...response,
            min_regiao: min_regiao_administrativa
        }
        res.send(response);
    });
});
app.get('/quantidade/acima1-5/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT rp as nome, SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/acima1-5/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_acima_1_5) as maximo, MIN(faixa_renda_acima_1_5) as minimo, SUM(faixa_renda_acima_1_5) as total, AVG(faixa_renda_acima_1_5) as media_por_regiao FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT rp as max_regiao_de_planejamento, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_de_planejamento = result[0].max_regiao_de_planejamento;
        response = {
            ...response,
            max_regiao: max_regiao_de_planejamento
        }
    });
    connection.query("SELECT rp as min_regiao_de_planejamento, SUM(faixa_renda_acima_1_5) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(faixa_renda_acima_1_5) as maximo FROM (SELECT SUM(faixa_renda_acima_1_5) as faixa_renda_acima_1_5 FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_de_planejamento = result[0].min_regiao_de_planejamento;
        response = {
            ...response,
            min_regiao: min_regiao_de_planejamento
        }
        res.send(response);
    });
});

app.get('/quantidade/unidade/bairro', (req,res) =>{
    connection.query('SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/unidade/bairro/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media_por_bairro FROM (SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_bairro;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, bairro.nome as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro GROUP BY nome) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/unidade/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra ', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/unidade/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, regiao_administrativa.regiao_adm as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/unidade/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/unidade/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(CNES) as quantidade, regiao_de_planejamento.rp as nome FROM unidades_de_saude INNER JOIN bairro ON fk_Bairro_codbairro = bairro.codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_Regiao_de_Planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/bairro', (req,res) =>{
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/bairro/metrica', (req,res) =>{
    var response
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as bairro FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT bairro as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as bairro FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as bairro FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT bairro as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as bairro FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, bairro.nome as bairro FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro GROUP BY nome) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/regiaoadministrativa', (req,res) =>{
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra GROUP BY regiao_adm) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/regiaoplanejamento', (req,res) =>{
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp GROUP BY rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/timeline', (req,res) =>{
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/timeline/mortes', (req,res) =>{
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/timeline/mortes/metrica', (req,res) =>{
    var response
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT data as max_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific) AS a)"
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        var max_data = result[0].max_data
        response = {
            ...response,
            max_data: max_data
        }
    });
    var query = "SELECT data as min_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific) AS a HAVING quantidade = ( SELECT MIN(quantidade) as minimo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE fk_Evolucao_ID = 1 GROUP BY dt_notific ORDER BY dt_notific) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var min_data = result[0].min_data
        response = {
            ...response,
            min_data: min_data
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/timeline/metrica', (req,res) =>{
    var response
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT data as max_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_data = result[0].max_data;
        response = {
            ...response,
            max_data: max_data
        }
    });
    connection.query("SELECT data as min_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID GROUP BY dt_notific ORDER BY dt_notific) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_data = result[0].min_data
        response = {
            ...response,
            min_data: min_data
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/recuperados/bairro', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/recuperados/bairro/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_data = result[0].max_data;
        response = {
            ...response,
            max_regiao: max_data
        }
    });
    connection.query("SELECT nome as min_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 2 GROUP BY nome ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_data = result[0].min_data
        response = {
            ...response,
            min_regiao: min_data
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/recuperados/regiaoadministrativa', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/recuperados/regiaoadministrativa/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/recuperados/regiaoplanejamento', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/recuperados/regiaoplanejamento/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)"
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 2 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/mortos/bairro', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/mortos/bairro/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_data = result[0].max_data;
        response = {
            ...response,
            max_regiao: max_data
        }
    });
    connection.query("SELECT nome as min_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 1 GROUP BY nome ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_data = result[0].min_data
        response = {
            ...response,
            min_regiao: min_data
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/mortos/regiaoadministrativa', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/mortos/regiaoadministrativa/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/mortos/regiaoplanejamento', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/mortos/regiaoplanejamento/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)"
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 1 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/ativos/bairro', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/ativos/bairro/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_data = result[0].max_data;
        response = {
            ...response,
            max_regiao: max_data
        }
    });
    connection.query("SELECT nome as min_data, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro WHERE fk_Evolucao_ID = 3 GROUP BY nome ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_data = result[0].min_data
        response = {
            ...response,
            min_regiao: min_data
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/ativos/regiaoadministrativa', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/ativos/regiaoadministrativa/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)"
    connection.query(query,(err,result)=> {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, regiao_adm as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_administrativa ON fk_Regiao_Administrativa_codra = codra WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_Administrativa_codra ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/covid/ativos/regiaoplanejamento', (req,res) => {
    connection.query("SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/covid/ativos/regiaoplanejamento/metrica', (req,res) => {
    var response;
    connection.query("SELECT MAX(quantidade) as maximo, MIN(quantidade) as minimo, SUM(quantidade) as total, AVG(quantidade) as media FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a", (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MAX(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)"
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, quantidade FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a HAVING quantidade = ( SELECT MIN(quantidade) as maximo FROM (SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, rp as nome FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID INNER JOIN bairro ON fk_Bairro_codbairro = codbairro INNER JOIN regiao_de_planejamento ON fk_Regiao_de_Planejamento_cod_rp = cod_rp WHERE fk_Evolucao_ID = 3 GROUP BY fk_Regiao_de_Planejamento_cod_rp ORDER BY quantidade DESC) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});

app.get('/quantidade/covid/timeline/filtro', (req,res) => {
    var inicio = req.query.inicio;
    var i = inicio.split("-");
    inicio = i[2] + "-" + i[1] + "-" + i[0];
    var fim = req.query.fim;
    var f = fim.split("-");
    fim = f[2] + "-" + f[1] + "-" + f[0];
    var evolucao = req.query.evolucao;
    if(evolucao != 0){
        var query = "SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_evolucao,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE (DATE_FORMAT(dt_evolucao,'%y-%m-%d') BETWEEN '" + inicio + "' AND '" + fim + "') AND fk_Evolucao_ID =" + evolucao + " AND DATE_FORMAT(dt_evolucao,'%d-%m-%y') != '1969-12-31' GROUP BY dt_evolucao ORDER BY dt_evolucao";
        console.log(query);
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    else{
        var query = "SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE (DATE_FORMAT(dt_notific,'%y-%m-%d') BETWEEN '" + inicio + "' AND '" + fim + "') GROUP BY dt_notific ORDER BY dt_notific";
        console.log(query);
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }

});
app.get('/quantidade/covid/timeline/filtro/:inicio/:fim/:evolucao', async (req,res) => {
    var inicio = req.params.inicio;
    var i = inicio.split("-");
    inicio = i[2] + "-" + i[1] + "-" + i[0];
    var fim = req.params.fim;
    var f = fim.split("-");
    fim = f[2] + "-" + f[1] + "-" + f[0];
    var evolucao = req.params.evolucao;
    if(evolucao != 0){
        var query = "SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_evolucao,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE (DATE_FORMAT(dt_evolucao,'%y-%m-%d') BETWEEN '" + inicio + "' AND '" + fim + "') AND fk_Evolucao_ID =" + evolucao + " AND DATE_FORMAT(dt_evolucao,'%d-%m-%y') != '1969-12-31' GROUP BY dt_evolucao ORDER BY dt_evolucao";
        console.log(query);
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
    else{
        var query = "SELECT COUNT(fk_Caso_de_COVID_ID) as quantidade, DATE_FORMAT(dt_notific,'%d-%m-%y') as data FROM resida_bairro_caso_de_covid_cep INNER JOIN caso_de_covid ON fk_Caso_de_COVID_ID = ID WHERE (DATE_FORMAT(dt_notific,'%y-%m-%d') BETWEEN '" + inicio + "' AND '" + fim + "') GROUP BY dt_notific ORDER BY dt_notific";
        console.log(query);
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        });
    }
});

app.get('/quantidade/faixa-renda-extrema-pobreza/bairro', (req,res) => {
    connection.query('SELECT nome, SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro GROUP BY nome', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda-extrema-pobreza/bairro/metrica', (req,res) => {
    var response
    connection.query('SELECT MAX(faixa_renda_extrema_pobreza) as maximo, MIN(faixa_renda_extrema_pobreza) as minimo, SUM(faixa_renda_extrema_pobreza) as total, AVG(faixa_renda_extrema_pobreza) as media_por_bairro FROM bairro', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_bairro;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT nome as max_regiao, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MAX(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro GROUP BY nome) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao = result[0].max_regiao;
        response = {
            ...response,
            max_regiao: max_regiao
        }
    });
    connection.query("SELECT nome as min_regiao, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro GROUP BY nome HAVING quantidade = ( SELECT MIN(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro GROUP BY nome) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao = result[0].min_regiao;
        response = {
            ...response,
            min_regiao: min_regiao
        }
        res.send(response);
    });
});
app.get('/quantidade/faixa-renda-extrema-pobreza/regiaoadministrativa', (req,res) =>{
    connection.query('SELECT regiao_adm as nome,  SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda-extrema-pobreza/regiaoadministrativa/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_extrema_pobreza) as maximo, MIN(faixa_renda_extrema_pobreza) as minimo, SUM(faixa_renda_extrema_pobreza) as total, AVG(faixa_renda_extrema_pobreza) as media FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media
        }
    });
    var query = "SELECT regiao_adm as max_regiao_administrativa, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MAX(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)"
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_administrativa = result[0].max_regiao_administrativa;
        response = {
            ...response,
            max_regiao: max_regiao_administrativa
        }
    });
    connection.query("SELECT regiao_adm as min_regiao_administrativa, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra HAVING quantidade = ( SELECT MIN(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_administrativa ON fk_regiao_administrativa_codra = regiao_administrativa.codra GROUP BY fk_regiao_administrativa_codra) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_administrativa = result[0].min_regiao_administrativa;
        response = {
            ...response,
            min_regiao: min_regiao_administrativa
        }
        res.send(response);
    });
});
app.get('/quantidade/faixa-renda-extrema-pobreza/regiaoplanejamento', (req,res) =>{
    connection.query('SELECT rp as nome, SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp', (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
app.get('/quantidade/faixa-renda-extrema-pobreza/regiaoplanejamento/metrica', (req,res) =>{
    var response
    connection.query('SELECT MAX(faixa_renda_extrema_pobreza) as maximo, MIN(faixa_renda_extrema_pobreza) as minimo, SUM(faixa_renda_extrema_pobreza) as total, AVG(faixa_renda_extrema_pobreza) as media_por_regiao FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a', (err, result) => {
        if (err) throw err;
        console.log(result);
        var maximo = result[0].maximo;
        var minimo = result[0].minimo;
        var total = result[0].total;
        var media = result[0].media_por_regiao;
        response = {
            maximo: maximo,
            minimo: minimo,
            total: total,
            media: media

        }
    });
    var query = "SELECT rp as max_regiao_planejamento, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MAX(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)" 
    connection.query(query,(err, result) => {
        if (err) throw err;
        console.log(result);
        var max_regiao_planejamento = result[0].max_regiao_planejamento;
        response = {
            ...response,
            max_regiao: max_regiao_planejamento
        }
    });
    connection.query("SELECT rp as min_regiao_planejamento, SUM(faixa_renda_extrema_pobreza) as quantidade FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp HAVING quantidade = ( SELECT MIN(faixa_renda_extrema_pobreza) as maximo FROM (SELECT SUM(faixa_renda_extrema_pobreza) as faixa_renda_extrema_pobreza FROM bairro JOIN regiao_de_planejamento ON fk_regiao_de_planejamento_cod_rp = regiao_de_planejamento.cod_rp GROUP BY fk_regiao_de_planejamento_cod_rp) AS a)", (err, result) => {
        if (err) throw err;
        console.log(result);
        var min_regiao_planejamento = result[0].min_regiao_planejamento;
        response = {
            ...response,
            min_regiao: min_regiao_planejamento
        }
        res.send(response);
    });
});


app.listen(3000);