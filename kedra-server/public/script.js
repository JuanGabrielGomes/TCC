const ws = new WebSocket('ws://localhost:8080');

// Evento ao abrir conexão WebSocket
ws.onopen = () => {
    console.log('Conectado ao servidor WebSocket.');
};

// Evento ao receber mensagens do servidor
ws.onmessage = (event) => {
    console.log('Mensagem recebida do servidor:', event.data);

    // Exemplo de processamento de mensagens
    const resposta = JSON.parse(event.data);

    if (resposta.tipo === 'login') {
        if (resposta.sucesso) {
            alert('Login bem-sucedido!');
            window.location.href = '/dashboard.html'; // Redireciona para o dashboard
        } else {
            alert('Login falhou. Verifique suas credenciais.');
        }
    } else if (resposta.tipo === 'cadastrarUsuario') {
        alert(resposta.mensagem);
    } else if (resposta.tipo === 'listarRefeicoes') {
        // Atualiza a interface com as refeições recebidas
        console.log('Refeições:', resposta.dados);
    }
};

// Evento ao fechar conexão WebSocket
ws.onclose = () => {
    console.log('Conexão WebSocket encerrada.');
};

// Evento ao ocorrer erro na conexão WebSocket
ws.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
};

// Eventos para as páginas

// Página de Login
document.getElementById('btnLogin').addEventListener('click', () => {
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;

    const mensagem = JSON.stringify({
        acao: 'login',
        dados: {
            email: email,
            senha: senha
        }
    });

    ws.send(mensagem);
});

// Página de Cadastro (Sign-Up)
document.getElementById('btnSignUp').addEventListener('click', () => {
    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;

    const mensagem = JSON.stringify({
        acao: 'cadastrarUsuario',
        dados: {
            nome: nome,
            email: email,
            senha: senha
        }
    });

    ws.send(mensagem);
});

// Página Dashboard - Criar Refeição
document.getElementById('btnCriarRefeicao').addEventListener('click', () => {
    const nome = document.getElementById('inputNomeRefeicao').value;
    const quantidade = parseFloat(document.getElementById('inputQuantidade').value);
    const intervalo = parseInt(document.getElementById('inputIntervalo').value);

    const mensagem = JSON.stringify({
        acao: 'cadastrarRefeicao',
        dados: {
            nome: nome,
            quantidade: quantidade,
            intervalo: intervalo
        }
    });

    ws.send(mensagem);
});

// Página Dashboard - Visualizar Refeições
document.getElementById('btnVisualizarRefeicoes').addEventListener('click', () => {
    const mensagem = JSON.stringify({
        acao: 'listarRefeicoes'
    });

    ws.send(mensagem);
});
document.getElementById('btnConectar').addEventListener('click', () => {
    const mensagem = JSON.stringify({
        acao: 'conectarDispenser'
    });

    ws.send(mensagem);
});

// Exibe o status da conexão com o ESP32
ws.onmessage = (event) => {
    const resposta = JSON.parse(event.data);

    if (resposta.tipo === 'conectarDispenser') {
        if (resposta.sucesso) {
            alert('Conexão com o ESP32 estabelecida!');
        } else {
            alert('Falha na conexão com o ESP32.');
        }
    }
};

// Página Dashboard - Gerar Relatório
document.getElementById('btnGerarRelatorio').addEventListener('click', () => {
    const mensagem = JSON.stringify({
        acao: 'gerarRelatorio'
    });

    ws.send(mensagem);
});

// Evento ao carregar a página
window.addEventListener('load', () => {
    const mensagem = JSON.stringify({
        acao: 'listarRefeicoes'
    });

    ws.send(mensagem);
});

// Atualiza a interface com as refeições recebidas
ws.onmessage = (event) => {
    const resposta = JSON.parse(event.data);

    if (resposta.tipo === 'listarRefeicoes') {
        const listaRefeicoes = resposta.dados;

        // Atualiza a interface do usuário
        const listaElement = document.getElementById('listaRefeicoes');
        listaElement.innerHTML = ''; // Limpa a lista antes de atualizar

        listaRefeicoes.forEach(refeicao => {
            const item = document.createElement('li');
            item.textContent = `Nome: ${refeicao.nome}, Quantidade: ${refeicao.quantidade}g, Intervalo: ${refeicao.intervalo}min`;
            listaElement.appendChild(item);
        });
    }
};

document.getElementById('btnDistribuir').addEventListener('click', () => {
    const nomeRefeicao = document.getElementById('selectRefeicao').value;

    const mensagem = JSON.stringify({
        acao: 'distribuirAlimento',
        dados: {
            nome: nomeRefeicao
        }
    });

    ws.send(mensagem);
});

// Exibe o status da distribuição
ws.onmessage = (event) => {
    const resposta = JSON.parse(event.data);

    if (resposta.tipo === 'distribuirAlimento') {
        if (resposta.sucesso) {
            alert(`Distribuição de alimento para ${resposta.nome} concluída!`);
        } else {
            alert('Erro na distribuição de alimento.');
        }
    }
};

