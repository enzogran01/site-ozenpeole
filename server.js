// importa os pacotes necessários
const express = require('express');
const mysql = require('mysql2');
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
// Rota de login sem bcrypt
app.post('/login', (req, res) => { 
  const { email, password } = req.body;

  // Verificar se o email existe no banco de dados
  const query = 'SELECT * FROM usuario WHERE nm_email = ?';
  db.query(query, [email], (err, results) => {
      if (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          return res.status(500).json({ message: 'Erro interno do servidor.' });
      }

      if (results.length === 0) {
          // Se o email não for encontrado, retornar erro
          return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }

      // Comparar a senha diretamente, sem criptografia
      const user = results[0];
      if (password === user.cd_senha) {
          // Login bem-sucedido
          res.status(200).json({ message: 'Login bem-sucedido!', user: { nm_usuario: user.nm_usuario } });
          userName: user.nm_usuario 
      } else {
          // Senha incorreta
          res.status(401).json({ message: 'Email ou senha incorretos.' });
      }
  });
});

  

// rota que registra um novo usuário (cadastro)
// Rota para registrar um novo usuário (cadastro) sem bcrypt
app.post('/register', (req, res) => {
  const { name, email, password, telephone } = req.body;

  // Query do SQL para inserir um novo usuário
  const query = 'INSERT INTO usuario (nm_usuario, nm_email, cd_senha, cd_telefone) VALUES (?, ?, ?, ?)';

  // Executa a query sem criptografar a senha
  db.query(query, [name, email, password, telephone], (err, result) => {
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
