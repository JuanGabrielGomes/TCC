const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

// Configuração do servidor HTTP
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/landingPage.html');
});

// Configuração do WebSocket
const wss = new WebSocket.Server({ port: 8080 });

let esp32Connection = null; // Armazena a conexão com o ESP32

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado.');

    ws.on('message', (message) => {
        console.log('Mensagem recebida:', message);

        const comando = JSON.parse(message);

        if (comando.acao === 'esp32-client') {
            esp32Connection = ws;
            console.log('ESP32 conectado.');
        } else if (comando.acao === 'conectarDispenser') {
            if (esp32Connection) {
                ws.send(JSON.stringify({ tipo: 'conectarDispenser', sucesso: true }));
            } else {
                ws.send(JSON.stringify({ tipo: 'conectarDispenser', sucesso: false }));
            }
        } else if (comando.acao === 'distribuirAlimento') {
            if (esp32Connection) {
                esp32Connection.send(message);
                ws.send(JSON.stringify({
                    tipo: 'distribuirAlimento',
                    sucesso: true,
                    mensagem: `Comando para distribuir ${comando.dados.nome} enviado ao ESP32!`
                }));
            } else {
                ws.send(JSON.stringify({
                    tipo: 'distribuirAlimento',
                    sucesso: false,
                    mensagem: 'ESP32 não conectado.'
                }));
            }
        } else if (esp32Connection) {
            esp32Connection.send(message);
            ws.send(JSON.stringify({
                tipo: comando.acao,
                sucesso: true,
                mensagem: `Comando ${comando.acao} enviado ao ESP32 com sucesso!`
            }));
        } else {
            console.log('ESP32 não está conectado.');
            ws.send(JSON.stringify({
                tipo: comando.acao,
                sucesso: false,
                mensagem: 'ESP32 não conectado.'
            }));
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

// Inicializa o servidor HTTP
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
