// importa os pacotes necessários
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Se você ainda não tiver, instale o cors
const mysql = require('mysql2');
const app = express();

const mysqlPort = 3000;  // Porta para o MySQL
const apiPort = 3001;    // Porta para a API OpenAI 

// Middleware
app.use(express.json());
app.use(cors()); // Habilita CORS

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





//api llama (Deus me ajuda a dar certo!)
app.post('/api/marketing-campaign', async (req, res) => {
    const { idade, local, social, venda, preco, propaganda } = req.body;

    // Defina um prompt para a IA
    const prompt = `
    Crie uma campanha de marketing para uma loja considerando os seguintes dados:
    - Idade do público-alvo: ${idade}
    - Localização: ${local}
    - Rede social mais utilizada: ${social}
    - Tipo de venda: ${venda}
    - Ticket médio: ${preco}
    - Já faz marketing?: ${propaganda}
    Descreva o conteúdo e as estratégias recomendadas.`;

    try {
        const response = await axios.post('https://api.llama-api.com', {
            prompt: prompt,
            messages: [{ role: "user", content: prompt }],
            stream: false,  // Ou true, se desejar receber respostas parciais
            function_call: "none"  // Define que não será usada chamada de função extra
        
        }, {
            headers: { 'Authorization': `Bearer LA-3da40301f1ec402c8446de9f8daee7348a4770a7990a485490876cd2349fe51d` }
        });

        res.json(response.data);  // Retorna a resposta para o front-end
    } catch (error) {
        console.error("Erro na API Llama:", error);
        res.status(500).json({ error: "Erro ao gerar a campanha de marketing" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:3001`);
});