// importa os pacotes necessários
const PDFDocument = require('pdfkit');
const fs = require('fs');

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Se você ainda não tiver, instale o cors
const mysql = require('mysql2');
const app = express();

const mysqlPort = 3000;  // Porta para o MySQL
const apiPort = 3001;    // Porta para a Groq 

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
                    userId: user.id_usuario,
                    userEmail: user.nm_email,
                    userTelephone: user.cd_telefone,
                    ativo: user.ativo,
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

app.post('/verificarSenha', (req, res) => {
    const { id, senha } = req.body;

    if (!id || !senha) {
        return res.status(400).json({ success: false, message: 'Dados incompletos' });
    }

    const query = 'SELECT cd_senha FROM usuario WHERE id_usuario = ?';
    db.query(query, [id], (err, resultados) => {
        if (err) {
            console.error('Erro ao verificar senha:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (resultados.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        const senhaCorreta = resultados[0].cd_senha;

        if (senha === senhaCorreta) {
            return res.status(200).json({ success: true, message: 'Senha verificada com sucesso' });
        } else {
            return res.status(401).json({ success: false, message: 'Senha incorreta' });
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
            res.status(500).json({ error: 'Erro ao registrar usuário'});
        } else {
            res.status(200).send({ success: 'Usuário registrado com sucesso ta bom né'});
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


// Cadastro de campanhas
app.post('/salvarcampanha/:id', (req, res) => {
    const dadosCampanha = req.body;
    const id = req.params.id

    if (Array.isArray(dadosCampanha)) {
        let promises = [];
        dadosCampanha.forEach((campanha, index) => {
            const query = "INSERT INTO dia_campanha (id_usuario, dt_dia, ds_imagem, ds_legenda, hr_postagem) VALUES (?, ?, ?, ?, ?)"
            promises.push(new Promise((resolve, reject) => {
                db.query(query, [id, campanha.dia, campanha.descricao, campanha.legenda, campanha.hora], (err, resultado) => {
                    if (err) {
                        reject('Erro ao cadastrar campanha: ' + err);
                    } else {
                        resolve(resultado);
                    }
                });
            }));
        });
        Promise.all(promises)
        .then(() => {
            res.status(200).send('Campanhas registradas com sucesso');
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send('Erro ao cadastrar campanhas');
        });
    } else {
        res.status(400).send('Dados inválidos, esperado um array de campanhas');
    }
});


//buscar campanha por id
app.get('/getCampanhas/:id', (req, res) => {
    const idUsuario = req.params.id;

    // const query = `
    //    SELECT dt_dia AS dia, ds_imagem AS descricao, ds_legenda AS legenda, hr_postagem AS hora 
    //    FROM dia_campanha 
    //    WHERE id_usuario = ?
    //    ORDER BY dt_dia ASC;
    //`;

    const query = `
        SELECT * FROM dia_campanha WHERE id_usuario = ?;
    `;

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar campanhas:', err);
            res.status(500).send('Erro ao buscar campanhas');
        } else {
            res.status(200).json(resultados);
        }
    });
});

app.delete('/deleteCampanhas/:id', (req, res) => {
    const idUsuario = req.params.id;

    const query = `
        DELETE FROM dia_campanha WHERE id_usuario = ?;
    `;

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error('Erro ao excluir campanhas:', err);
            res.status(500).send('Erro ao excluir campanhas');
        } else {
            // Verifica se alguma linha foi afetada
            if (resultados.affectedRows > 0) {
                res.status(200).send('Campanhas excluídas com sucesso');
            } else {
                res.status(404).send('Nenhuma campanha encontrada para o usuário especificado');
            }
        }
    });
});

//conta quasntos usuarios tem
app.get('/countUsers', (req, res) => {
    const query = "SELECT COUNT(id_usuario) AS totalUsuarios FROM usuario";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar usuários:", err);
            res.status(500).json({ error: "Erro ao contar usuários." });
        } else {
            const totalUsuarios = results[0].totalUsuarios;
            res.status(200).json({ totalUsuarios });
        }
    });
});

app.get('/countAllCampanhas', (req, res) => {
    const query = "SELECT COUNT(id_usuario) AS totalCampanhas FROM dia_campanha";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar campanhas:", err);
            return res.status(500).json({ error: "Erro ao contar campanhas no banco de dados." });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Nenhuma campanha encontrada." });
        }

        const totalCampanhas = results[0].totalCampanhas;
        res.status(200).json({ totalCampanhas });
    });
});


// //conta quasntas campanhas tem um usuario em especifico, NÃO APAGA Q PODE SER IMPORTANTE POR FAVOR!!!!!
// app.get('/countCampanhas/:id', (req, res) => {
    // const userId = req.params.id; // faggot id dia
//     const query = "SELECT COUNT(id_campanha) AS totalCampanhas FROM dia_campanha WHERE ";

//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             console.error("Erro ao contar campanhas:", err);
//             res.status(500).json({ error: "Erro ao contar campanhas." });
//         } else {
//             const totalCampanhas = results[0].totalCampanhas;
//             res.status(200).json({ totalCampanhas });
//         }
//     });
// });

app.patch('/desativarUsuario/:id', (req, res) => {
    const idUsuario = req.params.id;

    const query = 'UPDATE usuario SET ativo = 0 WHERE id_usuario = ?';

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error('Erro ao desativar usuário:', err);
            return res.status(500).send('Erro ao desativar usuário');
        }

        if (resultados.affectedRows === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).send('Usuário desativado com sucesso');
    });
})





// Gerar campanhas com IA
app.post('/api/marketing-campaign', async (req, res) => {
    const { idade, local, social, venda, preco, propaganda } = req.body;
    
    // Defina um prompt para a IA
    const prompt = `responda em português brasileiro: Crie uma campanha de marketing para uma loja com o conteúdo para uma semana de postagens na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando esses outros seguintes dados: Idade do público-alvo: ${idade}, Localização: ${local}, Tipo de venda: ${venda}, Ticket médio: ${preco}, Já faz marketing?: ${propaganda}. lembrando que é necessário a descrição da imagem da postagem, e a legenda necessária.`;
    
    try {
        const response = await axios.post('https://api.groq.com/v2/api', {
            "prompt": prompt,
            "temperature": 0.7, // ajuste a temperatura da linguagem para o nível de conservadorismo desejado
            "max_tokens": 256, // ajuste o número de tokens máximo para a resposta desejada
            "top_p": 1.0, // ajuste a probabilidade de seleção para a escolha da resposta
            "frequency_penalty": 0.0, // ajuste a penalidade de frequência para evitar respostas banais
            "presence_penalty": 0.0 // ajuste a penalidade de presença para evitar respostas genéricas
        }, {
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });
        
        res.json(response.data);  // Retorna a resposta para o front-end
    } catch (error) {
        console.error("Erro na API Groq:", error);
        res.status(500).json({ error: "Erro ao gerar a campanha de marketing" });
    }
});

app.listen(3001 , () => {
    console.log(`Servidor rodando em http://localhost:3001`);
});


app.get('/downloadCampanha/:id', (req, res) => {

    const idUsuario = req.params.id;

    const query = `
        SELECT * FROM dia_campanha WHERE id_usuario = ?;
    `;

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar campanhas:', err);
            res.status(500).send('Erro ao buscar campanhas');
        } else {
            // Configura o cabeçalho da resposta HTTP
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="minha-campanha.pdf"');

            // Cria um novo documento PDF
            const doc = new PDFDocument();

            // Envia o conteúdo do PDF diretamente para a resposta
            doc.pipe(res);

            // Adiciona conteúdo ao PDF
            console.log('1');
            doc.fontSize(18).text('Campanha de Marketing', { align: 'center' });
            doc.text('\nDetalhes da campanha:');
            doc.fontSize(12).text('• Promoção válida até 31/12.');
            doc.text('• Descontos progressivos para compras acima de R$ 100.');
            doc.text('\nAproveite agora mesmo!');

            // Finaliza o documento
            console.log('2');
            doc.end();
            res.status(200).json(resultados);
        }
    });

    
});

