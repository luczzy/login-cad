function acessar() {
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;

    if (!loginEmail || !loginSenha) {
        alert("Favor preencher todos os campos");
    } else {
        window.location.href = 'cad.html';
    }
}

function validarEmail(){
    // Obtem o valor do campo de email
    if(document.forms[0].email.value == "" ||
       document.forms[0].email.value.indexOf('@') == -1 ||
       document.forms[0].email.value.indexOf('.') == -1){
        // Verifica se o email inserido é válido
        alert("Por favor, informe um e-mail válido");
        return false;
        // Se o email informado for o correto, ira aparecer um alert na tela
       }else alert("Email informado com sucesso")
        document.getElementById('email').innerHTML = document.forms[0].email.value;
       }

// Array para armazenar dados de usuários
var dadosLista = []; // Array sem tamanho definido

function salvarUser() {
    let nomeUser = document.getElementById('nomeUser').value;
    let UserEmail = document.getElementById('UserEmail').value;
    let CPF = document.getElementById('userCpf').value;

    if (!nomeUser || !UserEmail || !CPF) {
        alert('Favor informar o nome, email e CPF para cadastro');
        return;
    }

    if (!validarEmail(UserEmail)) {
        alert('Por favor, informe um e-mail válido');
        return;
    }

    if (!validarCpf(CPF)) {
        alert('Por favor, informe um CPF válido');
        return;
    }

    // Armazena o objeto com nome, email e cpf
    dadosLista.push({ nome: nomeUser, email: UserEmail, cpf: CPF });
    criarlista();

    // Limpa os campos após salvar
    document.getElementById('nomeUser').value = "";
    document.getElementById('UserEmail').value = "";
    document.getElementById('userCpf').value = "";
}

// FUNÇÃO PARA VALIDAR EMAIL
function validarEmail(email) {
    // Expressão regular para validar e-mails
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// FUNÇÃO PARA VALIDAR CPF
function validarCpf(cpf) {
    // Expressão regular para verificar o formato "000.000.000-00"
    const userCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    // Verifica se o CPF corresponde ao formato desejado
    if (!userCpf.test(cpf)) {
        return false;
    }

    // Remove caracteres não numéricos para validar os dígitos verificadores
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    // Validando 10º dígito do CPF - o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    // Validando 11º dígito do CPF - o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

// Adicionando escutador ao formulário
document.getElementById('cpfForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const msg = document.getElementById('message');

    if (validarCpf(cpf)) {
        msg.textContent = 'O CPF é válido!';
        msg.style.color = 'green';
    } else {
        msg.textContent = 'O CPF é inválido!';
        msg.style.color = 'red';
    }
});

// FUNÇÃO PARA CRIAR LISTA
function criarlista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email do Usuário</th><th>CPF</th><th>Ações</th></tr>";

    // i é usado para acessar a posição do array
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td>" + dadosLista[i].cpf + "</td>";
        tabela += "<td><button type='button' onclick='editar(" + i + ")'>Editar</button>";
        tabela += "<button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('table').innerHTML = tabela;
}

// FUNÇÃO PARA EDITAR NOMES E EMAILS DA LISTA
function editar(index) {
    document.getElementById('nomeUser').value = dadosLista[index].nome;
    document.getElementById('UserEmail').value = dadosLista[index].email;
    document.getElementById('userCpf').value = dadosLista[index].cpf;
    dadosLista.splice(index, 1);
    criarlista();
}

// FUNÇÃO PARA EXCLUIR NOME DA LISTA
function excluir(index) {
    // O splice altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    dadosLista.splice(index, 1);
    criarlista();
}
