function acessar() {
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;

    if (!loginEmail || !loginSenha) {
        alert("Favor preencher todos os campos");
    } else {
        window.location.href = 'cad.html';
    }
}

// Array para armazenar dados de usuários
var dadosLista = []; // Array sem tamanho definido

function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let UserEmail = document.getElementById('UserEmail').value;

    if (nomeUser && UserEmail) {
        // Armazena o objeto com nome e email
        dadosLista.push({ nome: nomeUser, email: UserEmail });
        criarlista();
        document.getElementById('nomeUser').value = "";
        document.getElementById('UserEmail').value = "";
    } else {
        alert('Favor informar o nome e o email para cadastro');
    }
}

// FUNÇÃO PARA CRIAR LISTA
function criarlista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email do Usuário</th><th>Ações</th></tr>";

    // i é usado para acessar a posição do array
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td><button type='button' onclick='editar(" + i + ")'>Editar</button><button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('table').innerHTML = tabela;
}

// FUNÇÃO PARA EDITAR NOMES E EMAILS DA LISTA
function editar(index) {
    document.getElementById('nomeUser').value = dadosLista[index].nome;
    document.getElementById('UserEmail').value = dadosLista[index].email;
    dadosLista.splice(index, 1); 
    criarlista();
}

// FUNÇÃO PARA EXCLUIR NOME DA LISTA
function excluir(index) {
    // O splice altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    dadosLista.splice(index, 1); 
    criarlista();
}