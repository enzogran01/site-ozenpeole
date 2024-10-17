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
app.post('/login', (req, res) => { 
    const { email, password } = req.body;

    // verifica se o email ta na tabela do usuario
    const userQuery = 'SELECT * FROM usuario WHERE nm_email = ?'; // procura no banco o email do usuario
    db.query(userQuery, [email], (err, userResults) => {  //ele criou uma variavel chamada user e ta dando query pra verificar email e senha
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }

        // se  achar user
        if (userResults.length > 0) {
            const user = userResults[0];
            if (password === user.cd_senha) { //verifica se a senha bate com o banco
                // login do usuario bem-sucedido, volta como status de 'user'
                return res.status(200).json({ 
                    message: 'Login bem-sucedido!', 
                    userName: user.nm_usuario, 
                    status: 'user' 
                });
            } else {
                return res.status(401).json({ message: 'Email ou senha incorretos.' });
            }
        } else {
            // Se não encontrar na tabela de usuários, verifica na tabela de administradores
            const adminQuery = 'SELECT * FROM administrador WHERE nm_email_adm = ?';
            db.query(adminQuery, [email], (err, adminResults) => {
                if (err) {
                    console.error('Erro ao consultar o banco de dados:', err);
                    return res.status(500).json({ message: 'Erro interno do servidor.' });
                }

                // Se o administrador for encontrado
                if (adminResults.length > 0) {
                    const admin = adminResults[0];
                    if (password === admin.cd_senha_adm) {
                        // Login de administrador bem-sucedido, retorna o status de 'admin'
                        return res.status(200).json({ 
                            message: 'Login bem-sucedido!', 
                            userName: admin.nm_administrador, 
                            status: 'admin' 
                        });
                    } else {
                        return res.status(401).json({ message: 'Email ou senha incorretos.' });
                    }
                } else {
                    // Se não encontrar nem na tabela de usuários nem na de administradores
                    return res.status(401).json({ message: 'Email ou senha incorretos.' });
                }
            });
        }
    });
});
// app.post('/login', (req, res) => { 
//     const { email, password } = req.body;

//     const query = 'SELECT * FROM usuario WHERE nm_email = ?';
//     db.query(query, [email], (err, results) => {
//         if (err) {
//             console.error('Erro ao consultar o banco de dados:', err);
//             return res.status(500).json({ message: 'Erro interno do servidor.' });
//         }

//         if (results.length === 0) {
//             return res.status(401).json({ message: 'Email ou senha incorretos.' });
//         }

//         const user = results[0];
//         if (password === user.cd_senha) {
//             // Login bem-sucedido, retorna o nome do usuário
//             res.status(200).json({ message: 'Login bem-sucedido!', userName: user.nm_usuario });
//         } else {
//             return res.status(401).json({ message: 'Email ou senha incorretos.' });
//         }
//     });
// });



  

// rota que registra um novo usuário (cadastro)
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
