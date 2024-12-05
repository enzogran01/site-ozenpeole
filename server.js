// importa os pacotes necessários
const PDFDocument = require('pdfkit');
const fs = require('fs');

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Se você ainda não tiver, instale o cors
const mysql = require('mysql2');
const { send } = require('process');
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

    // Verifica se o email está na tabela do usuário
    const userQuery = 'SELECT * FROM usuario WHERE nm_email = ?';
    db.query(userQuery, [email], (err, userResults) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
        
        // Se o usuário for encontrado
        if (userResults.length > 0) {
            const user = userResults[0];

            // Verifica se o status do usuário é inativo
            if (user.ativo === 0) {
                return res.status(403).json({ message: 'Sua conta foi desativada, faça novo cadastro.' });
            }

            // Verifica se a senha bate
            if (password === user.cd_senha) {
                // Login do usuário bem-sucedido
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
                        // Login de administrador bem-sucedido
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



//verifica senha
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

app.post('/verificarEmail', (req, res) => {
    const { id, email } = req.body;

    if (!id || !email) {
        return res.status(400).json({ success: false, message: 'Dados incompletos' });
    }

    const query = 'SELECT * FROM usuario WHERE id_usuario = ? AND nm_email = ?';
    db.query(query, [id, email], (err, resultados) => {
        if (err) {
            console.error('Erro ao verificar email:', err);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (resultados.length > 0) {
            return res.status(200).json({ success: true, message: 'Email verificado com sucesso' });
        } else {
            return res.status(401).json({ success: false, message: 'Email incorreto ou usuário não encontrado' });
        }
    });
});

//mostra tabela de usuario no administrador
app.get('/show-users', (req, res) => {
    const query = "SELECT * FROM usuario;";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar usuários:", err);
            res.status(500).json({ error: "Erro ao contar usuários." });
        } else {
            const usuarios = results;
            res.status(200).json({ usuarios });
        }
    });
});

//mostra tabela de admin no administrador
app.get('/show-admins', (req, res) => {
    const query = "SELECT * FROM administrador;";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao contar administradores:", err);
            res.status(500).json({ error: "Erro ao contar admins." });
        } else {
            const administradores = results;
            res.status(200).json({ administradores });
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

//conta campanhas no admin
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

//desativa usuario
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






//download da campanha
app.get('/downloadCampanha/:id', (req, res) => {
    const idUsuario = req.params.id;

    const query = `
        SELECT u.nm_usuario, d.*
        FROM usuario u
        JOIN dia_campanha d ON u.id_usuario = d.id_usuario
        WHERE u.id_usuario = ?;
    `;

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar campanhas:', err);
            res.status(500).send('Erro ao buscar campanhas');
        } else if (resultados.length === 0) {
            res.status(404).send('Nenhuma campanha encontrada para este usuário.');
        } else {
            const nomeUsuario = resultados[0].nm_usuario; // Nome do usuário
            const campanhas = resultados;

            // Configura o cabeçalho da resposta HTTP
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=minha-campanha.pdf');

            const doc = new PDFDocument({ size: 'A4', margin: 50 });

            // Conectando o fluxo do documento diretamente à resposta HTTP
            doc.pipe(res);

            // Caminho do logotipo
            const logoPath = './viewCampanha/img/ozenpelogo.png';

            // Estilos e cores
            const colors = {
                background: '#ffffff', // Branco
                title: '#1a53e3',      // Azul
                subtitle: '#f95a33',   // Laranja
                text: '#313638'        // Cinza
            };

            // Página inicial (com destaque para o logo e nome do usuário)
            doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.background);
            doc.image(logoPath, doc.page.width/ 2 - 75, 50, { width: 130, height: 130 }); // Logotipo menor

            doc.moveDown(15); // Espaço suficiente para evitar sobreposição

            doc.fillColor(colors.text)
                .fontSize(16)
                .text('Campanha do', { align: 'center', baseline: 'bottom' });

            doc.fillColor(colors.title)
                .fontSize(20)
                .text(nomeUsuario, { align: 'center' });

            doc.moveDown(2);

            // Exibindo o número da campanha apenas uma vez
            doc.fillColor(colors.title)
                .fontSize(22)
                .text(`Número da Campanha: ${campanhas[0].id_usuario}`, { align: 'center' });

            doc.moveDown(3);

            // Adicionando título para a seção de campanhas
            doc.fillColor(colors.subtitle)
                .fontSize(18)
                .text('Dias da Campanha:', { align: 'left' });

            doc.moveDown(2);

            // Variável para controlar a quebra de página a cada 7 dias
            let diaCount = 0;

            // Listando todos os dias de campanha
            campanhas.forEach((campanha, index) => {
                if (diaCount > 0 && diaCount % 7 === 0) {
                    // Adiciona nova página a cada 7 dias
                    doc.addPage();
                    doc.rect(0, 0, doc.page.width, doc.page.height).fill(colors.background);

                    doc.fillColor(colors.subtitle)
                        .fontSize(18)
                        .text('Campanha:', { align: 'left' });

                    doc.moveDown(2);
                }

                doc.fillColor(colors.subtitle)
                    .fontSize(14)
                    .text(`Dia ${index + 1}:`, 50);

                doc.fillColor(colors.text)
                    .fontSize(12)
                    .text(`Data: ${campanha.dt_dia}`, { indent: 20 });

                doc.text(`Legenda: ${campanha.ds_legenda}`, { indent: 20, align: 'justify' });

                doc.text(`Imagem: ${campanha.ds_imagem}`, { indent: 20, align: 'justify' });

                doc.text(`Hora da Postagem: ${campanha.hr_postagem}`, { indent: 20 });

                doc.moveDown(3); // Espaçamento maior entre os dias

                diaCount++;
            });

            // Finalizando o documento
            doc.end();
        }
    });
});



