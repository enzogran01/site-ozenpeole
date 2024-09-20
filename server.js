// importa os pacotes necessários
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// começa app express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware para resolver CORS
app.use(express.json());
app.use(cors());

// configura pra conectar com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'ozenpeole' 
});

// conecta ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// tenta login
app.post('/login', (req, res) => { 
    const { email, password } = req.body;
  
    // procura  o email  no banco de dados
    const query = 'SELECT * FROM usuario WHERE nm_email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
      }
  
      if (results.length === 0) {
        // se  não acar o email, da erro
        return res.status(401).json({ message: 'Email ou senha incorretos?' });
      }
  
      // compara a senha criptografada a do cadastro 
      const user = results[0];
      bcrypt.compare(password, user.cd_senha, (err, isMatch) => {
        if (err) {
          console.error('Erro ao comparar senhas:', err);
          return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
  
        if (isMatch) {
          // login deu certo 
          res.status(200).json({ message: 'Bem vindo!' });
        } else {
          // senha errada
          res.status(401).json({ message: 'Email ou senha incorretos?' });
        }
      });
    });
  });
  

// rota que registra um novo usuário (cadastro)
app.post('/register', (req, res) => {
    const { name, email, password, telephone } = req.body;

    // criptografia de senha antes de salvar no banco
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Query do SQL para inserir um novo usuário
    const query = 'INSERT INTO usuario (nm_usuario, nm_email, cd_senha, cd_telefone) VALUES (?, ?, ?, ?)';

    // Executa a query
    db.query(query, [name, email, hashedPassword, telephone], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            res.status(500).send('Erro ao registrar usuário');
        } else {
            res.status(200).send('Usuário registrado com sucesso');
        }
    });
});

// testa tá rodando o server
app.get('/', (req, res) => {
    res.send('OZENPCONECTADO!');
});

// roda o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
