// isso aqui inteiro serve pra conectar o banco de dados com o nosso site
// Importa os pacotes necessários
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// inicia o app express que é um framework do node.js que
//é essencialmente a parte backend do js em relação ao banco de dados 
const app = express();

// middleware(ware do meio) que receber dados em formato JSON e resolver CORS
app.use(express.json());
app.use(cors());

// configura pra ter conexão com o banco de dados que ta no MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'ozenpeole' 
});

// conecta no banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// caminho que registra um novo usuário (cadastrar)
app.post('/register', (req, res) => {
    const { name, email, password, telephone } = req.body;

    // query do  SQL pra inserir um novo usuário
    const query = 'INSERT INTO usuario (nm_usuario, nm_email, cd_senha, cd_telefone) VALUES (?, ?, ?, ?)';

    // executa a query
    db.query(query, [name, email, password, telephone], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).send('Erro ao registrar usuário');
        } else {
            res.status(200).send('Usuário registrado com sucesso');
        }
    });
});

// se sucesso exibe a seguinte mensagem
app.get('/', (req, res) => {
    res.send('OZENPCONECTADO!');
});

// inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

