// Função para mostrar a seção correspondente e armazenar o último menu acessado
function mostrarSecao(secao) {
    var secoes = document.querySelectorAll('.section');
    for (var i = 0; i < secoes.length; i++) {
        secoes[i].style.display = 'none';
    }
    document.getElementById(secao).style.display = 'block';
    
    // Armazenar o menu acessado
    armazenarUltimoMenu(secao);
}

// Função para armazenar o último menu acessado
function armazenarUltimoMenu(menu) {
    localStorage.setItem("ultimoMenu", menu);
}

// Função para formatar a data para o formato dd/mm/aaaa
function formatarDataParaDDMMYYYY(data) {
    var partes = data.split('-');
    return partes[2] + '/' + partes[1] + '/' + partes[0];
}

// Função para adicionar uma nova conta
function adicionarConta() {
    var descricao = document.getElementById("descricao").value;
    var tipo = document.getElementById("tipo").value;
    var valor = parseFloat(document.getElementById("valor").value);
    var dataVencimento = document.getElementById("data-vencimento").value;

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
    novaLinha.insertCell(3).textContent = dataVencimento;

    var acao = novaLinha.insertCell(4);
    acao.innerHTML = '<button class="remover-btn">Remover</button>';
    acao.querySelector('.remover-btn').addEventListener('click', function () {
        removerConta(this);
    });

    atualizarTotal();
    salvarTodosOsDados();
    // Limpar os campos do formulário
    document.getElementById("descricao").value = '';
    document.getElementById("tipo").value = '';
    document.getElementById("valor").value = '';
    document.getElementById("data-vencimento").value = '';    
}

// Função para remover uma conta
function removerConta(botao) {
    var linha = botao.parentNode.parentNode;
    linha.remove();
    atualizarTotal();
    salvarTodosOsDados();
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    var descricaoTarefa = document.getElementById("descricaoTarefa").value;
    var observacaoTarefa = document.getElementById("observacaoTarefa").value;
    var dataEntregaTarefa = document.getElementById("dataEntregaTarefa").value;

    if (!descricaoTarefa || !observacaoTarefa || !dataEntregaTarefa) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var tabelaTarefas = document.getElementById("tbodyTarefas");
    var novaLinha = tabelaTarefas.insertRow();

    novaLinha.insertCell(0).textContent = descricaoTarefa;
    novaLinha.insertCell(1).textContent = observacaoTarefa;
    novaLinha.insertCell(2).textContent = formatarDataParaDDMMYYYY(dataEntregaTarefa);

    var acao = novaLinha.insertCell(3);
    acao.innerHTML = '<button class="remover-btn">Remover</button>';
    acao.querySelector('.remover-btn').addEventListener('click', function () {
        removerTarefa(this);
    });

    atualizarTotalTarefas(); // Atualiza o total de tarefas
    salvarTodosOsDados();

    // Limpar os campos do formulário
    document.getElementById("descricaoTarefa").value = '';
    document.getElementById("observacaoTarefa").value = '';
    document.getElementById("dataEntregaTarefa").value = '';    
}

// Função para remover uma tarefa
function removerTarefa(botao) {
    var linha = botao.parentNode.parentNode;
    linha.remove();
    atualizarTotalTarefas(); // Atualiza o total de tarefas após a remoção
    salvarTodosOsDados();
}

// Função para atualizar o total de tarefas
function atualizarTotalTarefas() {
    var tabelaTarefas = document.getElementById("tbodyTarefas");
    var totalTarefas = tabelaTarefas.rows.length;

    document.getElementById("totalTarefas").textContent = "Total de Tarefas: " + totalTarefas;
}

// Função para adicionar um novo item ao supermercado
function adicionarItem() {
    var nomeItem = document.getElementById("nomeItem").value;
    var quantidadeItem = document.getElementById("quantidadeItem").value;

    if (!nomeItem || !quantidadeItem || quantidadeItem <= 0) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    var novaLinha = tabelaSupermercado.insertRow();

    novaLinha.insertCell(0).textContent = nomeItem;
    novaLinha.insertCell(1).textContent = quantidadeItem;

    var acao = novaLinha.insertCell(2);
    acao.innerHTML = '<button class="remover-btn">Remover</button>';
    acao.querySelector('.remover-btn').addEventListener('click', function () {
        removerItemSupermercado(this);
    });

    atualizarTotalItens(); // Atualiza o total de itens no supermercado
    salvarTodosOsDados();

    // Limpar os campos do formulário
    document.getElementById("nomeItem").value = '';
    document.getElementById("quantidadeItem").value = '';    
}

// Função para remover um item do supermercado
function removerItemSupermercado(botao) {
    var linha = botao.parentNode.parentNode;
    linha.remove();
    atualizarTotalItens(); // Atualiza o total de itens após a remoção
    salvarTodosOsDados();
}

// Função para atualizar o total de itens no supermercado
function atualizarTotalItens() {
    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    var totalItens = 0;

    for (var i = 0; i < tabelaSupermercado.rows.length; i++) {
        var quantidadeItem = parseInt(tabelaSupermercado.rows[i].cells[1].textContent);
        totalItens += quantidadeItem;
    }

    document.getElementById("totalItens").textContent = "Total de Itens: " + totalItens;
}

// Função para atualizar o valor total e controlar a visibilidade do botão de exportação
function atualizarTotal() {
    var tabela = document.getElementById("tbodyContas");
    var total = 0;

    for (var i = 0; i < tabela.rows.length; i++) {
        var valor = parseFloat(tabela.rows[i].cells[2].textContent.replace(/[^\d.-]/g, '').replace(',', '.'));
        total += valor;
    }

    document.getElementById("valorTotal").textContent = "R$ " + total.toFixed(2);

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

    var tarefas = [];
    var tabelaTarefas = document.getElementById("tbodyTarefas");
    for (var i = 0; i < tabelaTarefas.rows.length; i++) {
        var descricaoTarefa = tabelaTarefas.rows[i].cells[0].textContent;
        var observacaoTarefa = tabelaTarefas.rows[i].cells[1].textContent;
        var dataEntregaTarefa = tabelaTarefas.rows[i].cells[2].textContent;
        tarefas.push({ descricao: descricaoTarefa, observacao: observacaoTarefa, dataEntrega: dataEntregaTarefa });
    }

    var supermercado = [];
    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    for (var i = 0; i < tabelaSupermercado.rows.length; i++) {
        var nomeItem = tabelaSupermercado.rows[i].cells[0].textContent;
        var quantidadeItem = tabelaSupermercado.rows[i].cells[1].textContent;
        supermercado.push({ nome: nomeItem, quantidade: quantidadeItem });
    }

    localStorage.setItem("contas", JSON.stringify(contas));
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("supermercado", JSON.stringify(supermercado));
}

// Função para carregar todos os dados do localStorage
function carregarTodosOsDados() {
    // Carregar as contas
    var contas = JSON.parse(localStorage.getItem("contas")) || [];
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

    // Carregar as tarefas
    var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
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

    // Carregar os itens do supermercado
    var supermercado = JSON.parse(localStorage.getItem("supermercado")) || [];
    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    supermercado.forEach(function (item) {
        var novaLinha = tabelaSupermercado.insertRow();
        novaLinha.insertCell(0).textContent = item.nome;
        novaLinha.insertCell(1).textContent = item.quantidade;
        var acao = novaLinha.insertCell(2);
        acao.innerHTML = '<button class="remover-btn">Remover</button>';
        acao.querySelector('.remover-btn').addEventListener('click', function () {
            removerItemSupermercado(this);
        });
    });

    // Atualizar totais após carregar os dados
    atualizarTotal(); // Total de contas
    atualizarTotalItens(); // Total de itens
    atualizarTotalTarefas(); // Total de tarefas
}

// Função para resetar as contas
function resetarContas() {
    var tabelaContas = document.getElementById("tbodyContas");
    tabelaContas.innerHTML = ''; // Limpa a tabela
    localStorage.removeItem("contas"); // Limpa o localStorage
    atualizarTotal(); // Atualiza o total
}

// Função para resetar as tarefas
function resetarTarefas() {
    var tabelaTarefas = document.getElementById("tbodyTarefas");
    tabelaTarefas.innerHTML = ''; // Limpa a tabela
    localStorage.removeItem("tarefas"); // Limpa o localStorage
}

// Função para resetar o supermercado
function resetarSupermercado() {
    var tabelaSupermercado = document.getElementById("tbodySupermercado");
    tabelaSupermercado.innerHTML = ''; // Limpa a tabela
    localStorage.removeItem("supermercado"); // Limpa o localStorage
}

// Função para resetar todos os dados
function resetarTodos() {
    resetarContas();
    resetarTarefas();
    resetarSupermercado();
    alert("Todas as seções foram resetadas!");
}

// Carregar dados ao inicializar
window.onload = carregarTodosOsDados;

// Chama a função de carregar dados ao carregar a página
window.onload = function () {
    carregarTodosOsDados();
    exibirSupermercado();  // Assegura que os itens do supermercado sejam exibidos ao carregar a página
}

// Função para exportar dados com formatação e total
function exportarDados() {
    var contas = JSON.parse(localStorage.getItem("contas")) || [];
    var conteudo = "+------------------------------------------+-------------------+-------------------+---------------------+\n";
    conteudo += "| Descrição                               | Tipo              | Valor             | Data de Vencimento  |\n";
    conteudo += "+------------------------------------------+-------------------+-------------------+---------------------+\n";
    contas.forEach(function(conta) {
        conteudo += `| ${conta.descricao.padEnd(40)} | ${conta.tipo.padEnd(17)} | R$ ${conta.valor.toFixed(2).padStart(14)} | ${conta.dataVencimento.padEnd(19)} |\n`;
    });
    conteudo += "+------------------------------------------+-------------------+-------------------+---------------------+\n";
    conteudo += `Total:                                      |                   | R$ ${document.getElementById("valorTotal").textContent.slice(3)}\n`;
    var blob = new Blob([conteudo], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'contas.txt';
    a.click();
}
