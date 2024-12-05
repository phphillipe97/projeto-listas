// Função para mostrar a seção correspondente
function mostrarSecao(secao) {
    // Esconde todas as seções
    var secoes = document.querySelectorAll('.section');
    for (var i = 0; i < secoes.length; i++) {
        secoes[i].style.display = 'none';
    }

    // Mostra a seção correspondente
    document.getElementById(secao).style.display = 'block';
}

// Função para formatar a data para o formato dd/mm/aaaa
function formatarDataParaDDMMYYYY(data) {
    var partes = data.split('-');  // Quebra a data no formato aaaa-mm-dd
    return partes[2] + '/' + partes[1] + '/' + partes[0];  // Formato dd/mm/aaaa
}

// Função para adicionar uma nova conta
function adicionarConta() {
    var descricao = document.getElementById("descricao").value;
    var tipo = document.getElementById("tipo").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var dataVencimento = document.getElementById("data-vencimento").value;

    // Verifica se os campos estão preenchidos
    if (!descricao || !tipo || !valor || !dataVencimento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (isNaN(valor) || valor <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    var tabela = document.getElementById("tbodyContas");
    var novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).textContent = descricao;
    novaLinha.insertCell(1).textContent = tipo;
    novaLinha.insertCell(2).textContent = "R$ " + valor.toFixed(2);
    novaLinha.insertCell(3).textContent = dataVencimento;  // Exibe a data no formato dd/mm/aaaa

    var acao = novaLinha.insertCell(4);
    acao.innerHTML = '<button class="remover-btn">Remover</button>';
    acao.querySelector('.remover-btn').addEventListener('click', function () {
        removerConta(this);
    });

    atualizarTotal();
    salvarTodosOsDados();
}

// Função para remover uma conta
function removerConta(botao) {
    var linha = botao.parentNode.parentNode;
    linha.remove();
    atualizarTotal();
    salvarTodosOsDados();
}

// Função para atualizar o valor total e controlar a visibilidade do botão de exportação
function atualizarTotal() {
    var tabela = document.getElementById("tbodyContas");
    var total = 0;

    // Calcula o total de todas as contas
    for (var i = 0; i < tabela.rows.length; i++) {
        var valor = parseFloat(tabela.rows[i].cells[2].textContent.replace(/[^\d.-]/g, '').replace(',', '.'));
        total += valor;
    }

    // Exibe o total formatado
    document.getElementById("valorTotal").textContent = "R$ " + total.toFixed(2);

    // Controle da visibilidade do botão de exportação
    var btnExportar = document.getElementById("btnExportar");
    btnExportar.style.display = (total > 0) ? "inline-block" : "none";
}

// Função para salvar todos os dados no localStorage (contas, tarefas e supermercado)
function salvarTodosOsDados() {
    var contas = [];
    var tabelaContas = document.getElementById("tbodyContas");
    for (var i = 0; i < tabelaContas.rows.length; i++) {
        var descricao = tabelaContas.rows[i].cells[0].textContent;
        var tipo = tabelaContas.rows[i].cells[1].textContent;
        var valor = parseFloat(tabelaContas.rows[i].cells[2].textContent.replace(/[^\d.-]/g, '').replace(',', '.'));
        var dataVencimento = tabelaContas.rows[i].cells[3].textContent;
        contas.push({ descricao, tipo, valor, dataVencimento });
    }

    var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    var supermercado = JSON.parse(localStorage.getItem("supermercado")) || [];

    localStorage.setItem("contas", JSON.stringify(contas));
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("supermercado", JSON.stringify(supermercado));
}

// Função para carregar todos os dados do localStorage
function carregarTodosOsDados() {
    var contas = JSON.parse(localStorage.getItem("contas")) || [];
    var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    var supermercado = JSON.parse(localStorage.getItem("supermercado")) || [];

    // Carregar as contas
    var tabelaContas = document.getElementById("tbodyContas");
    contas.forEach(function (conta) {
        var novaLinha = tabelaContas.insertRow();
        novaLinha.insertCell(0).textContent = conta.descricao;
        novaLinha.insertCell(1).textContent = conta.tipo;
        novaLinha.insertCell(2).textContent = "R$ " + conta.valor.toFixed(2);
        novaLinha.insertCell(3).textContent = conta.dataVencimento;
        var acao = novaLinha.insertCell(4);
        acao.innerHTML = '<button class="remover-btn">Remover</button>';
        acao.querySelector('.remover-btn').addEventListener('click', function () {
            removerConta(this);
        });
    });

    // Carregar as tarefas (supondo uma estrutura similar à de contas)
    var tabelaTarefas = document.getElementById("tbodyTarefas");
    tarefas.forEach(function (tarefa) {
        var novaLinha = tabelaTarefas.insertRow();
        novaLinha.insertCell(0).textContent = tarefa.descricao;
        novaLinha.insertCell(1).textContent = tarefa.observacao;
        novaLinha.insertCell(2).textContent = tarefa.dataEntrega;
        var acao = novaLinha.insertCell(3);
        acao.innerHTML = '<button class="remover-btn">Remover</button>';
        acao.querySelector('.remover-btn').addEventListener('click', function () {
            removerTarefa(this);
        });
    });

    // Carregar itens de supermercado
    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    supermercado.forEach(function (item) {
        var novaLinha = tabelaSupermercado.insertRow();
        novaLinha.insertCell(0).textContent = item.nome;
        novaLinha.insertCell(1).textContent = item.quantidade;
        novaLinha.insertCell(2).textContent = "R$ " + item.preco.toFixed(2);
        var acao = novaLinha.insertCell(3);
        acao.innerHTML = '<button class="remover-btn">Remover</button>';
        acao.querySelector('.remover-btn').addEventListener('click', function () {
            removerItemSupermercado(this);
        });
    });

    // Atualizar total das contas
    atualizarTotal();
}

// Função para adicionar uma tarefa
function adicionarTarefa() {
    var descricao = document.getElementById("descricaoTarefa").value;
    var observacao = document.getElementById("observacaoTarefa").value;
    var dataEntrega = document.getElementById("dataEntregaTarefa").value;

    if (!descricao || !observacao || !dataEntrega) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var tarefa = { descricao, observacao, dataEntrega };
    var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push(tarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    exibirTarefas();
    document.getElementById("descricaoTarefa").value = '';
    document.getElementById("observacaoTarefa").value = '';
    document.getElementById("dataEntregaTarefa").value = '';
}

// Função para exibir as tarefas
function exibirTarefas() {
    var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    var tbody = document.getElementById("tbodyTarefas");
    tbody.innerHTML = '';
    tarefas.forEach(function (tarefa, index) {
        var linha = tbody.insertRow();
        linha.insertCell(0).textContent = tarefa.descricao;
        linha.insertCell(1).textContent = tarefa.observacao;
        linha.insertCell(2).textContent = tarefa.dataEntrega;
        var acoes = linha.insertCell(3);
        acoes.innerHTML = `
            <button onclick="editarTarefa(${index})">Editar</button>
            <button onclick="removerTarefa(${index})">Excluir</button>
        `;
    });
}

// Função para remover uma tarefa
function removerTarefa(index) {
    var tarefas = JSON.parse(localStorage.getItem("tarefas"));
    tarefas.splice(index, 1);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    exibirTarefas();
}

// Função para adicionar item no supermercado
function adicionarItem() {
    var nome = document.getElementById("nomeItem").value;
    var quantidade = document.getElementById("quantidadeItem").value;

    // Verificar se todos os campos foram preenchidos e se os dados são válidos
    if (!nome || !quantidade || isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    var item = { nome, quantidade: parseInt(quantidade) };  // Convertendo quantidade para número inteiro
    var supermercado = JSON.parse(localStorage.getItem("supermercado")) || [];
    supermercado.push(item);
    localStorage.setItem("supermercado", JSON.stringify(supermercado));

    // Após salvar os dados, atualizar a tabela de itens
    exibirSupermercado();  // Certifique-se de chamar a função para exibir os itens
}

// Função para exibir os itens do supermercado
function exibirSupermercado() {
    var supermercado = JSON.parse(localStorage.getItem("supermercado")) || [];
    var tbody = document.getElementById("tbodySupermercado");
    tbody.innerHTML = '';  // Limpa a tabela antes de preencher

    supermercado.forEach(function (item, index) {
        var linha = tbody.insertRow();
        linha.insertCell(0).textContent = item.nome;
        linha.insertCell(1).textContent = item.quantidade;
        var acoes = linha.insertCell(3);
        acoes.innerHTML = ` <button onclick="removerItemSupermercado(${index})">Excluir</button>`;
    });
}

// Função para remover item do supermercado
function removerItemSupermercado(index) {
    var supermercado = JSON.parse(localStorage.getItem("supermercado"));
    supermercado.splice(index, 1);
    localStorage.setItem("supermercado", JSON.stringify(supermercado));
    exibirSupermercado();
}

// Chama a função de carregar dados ao carregar a página
window.onload = function () {
    carregarTodosOsDados();
    exibirSupermercado();  // Assegura que os itens do supermercado sejam exibidos ao carregar a página
}

