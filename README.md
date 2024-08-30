# **Cadastro de usuários**

## **Objetivo**

Este projeto é uma aplicação web simples que permite aos usuários se cadastrar e fazer login.

## **Preview**

![Preview](/img/recvalidacaov2.gif)

## **Funcionalidades**

- Cadastro de Usuários: Permite aos usuários se cadastrar inserindo nome e email, que são armazenados em um array.

- Login: Verifica o preenchimento dos campos de login e redireciona para a página de cadastro se os dados estiverem corretos.

- Validação de CPF: Verifica se o CPF fornecido está no formato correto e é válido de acordo com as regras estabelecidas.

- Validação de Email: Verifica se o email fornecido está no formato correto e é válido de acordo com as normas gerais de email.

## **Funções do js**

### ``Validando acesso em tela de login``

Esta função é responsável por validar os campos de login e redirecionar o usuário para a página de cadastro (cad.html) se os campos forem preenchidos corretamente.

As variáveis loginEmail e loginSenha recebem os valores inseridos pelo usuário nos campos de e-mail e senha,
respectivamente. O if verifica se algum dos campos está vazio. Caso estejam, um alerta é exibido solicitando o preenchimento. Se ambos os campos estiverem preenchidos, o usuário é redirecionado para a página de cadastro.

```js
function acessar(){
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;

    if(!loginEmail || !loginSenha){
        alert("Favor preencher todos os campos");
    }else{
        window.location.href = 'cad.html';
    }
}
```

### ``Armazenando o nome, email e cpf do usuário em array``

Esta função armazena os dados do usuário em um array e chama outra função para atualizar a lista de nomes na tela. 

O valor inserido no campo de nome é capturado e armazenado na variável ``'nomeUser'``. Para armazenar o email, o valor é inserido na variável ``'UserEmail'``. Para armazenar o cpf, o valor é inserido na variável ``'userCpf'``. Se os três campos estiver vazio, um alerta é exibido pedindo que o usuário preencha o nome e o email. Se os dados forem válido, ele é adicionado ao array dadosLista usando o método push(). A função criarlista() é chamada para atualizar a tabela com os novos dados. O campo de entrada é limpo para permitir a inserção de novos dados.

```js
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
```

### ``Criando a lista``

Atualiza a tabela HTML com os nomes armazenados no array dadosLista. A função define a estrutura básica da tabela, com os cabeçalhos "Nome Usuário", "Email do Usuário" e "Ações".

Utiliza um laço de repetição for para percorrer todos os elementos do array dadosLista. Para cada nome e email inserido no array, uma nova linha é adicionada à tabela. Cada linha contém o nome com email, e dois botões, um para editar e outro para excluir. E a tabela HTML é atualizada com as novas linhas criadas.

### ``Função para validar o email``
Verifica se o email está no formato correto.

```js
function validarEmail(email) {
    // Expressão regular para validar e-mails
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
```
### ``Adicionando escutador e validando cpf``
Valida o CPF de acordo com o formato e regras de dígitos verificadores, também adiciona escutador.

```js
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
```

### ``Função para criar lista``

Atualiza a tabela HTML com os nomes armazenados no array dadosLista. A função define a estrutura básica da tabela, com os cabeçalhos "Nome Usuário", "Email do Usuário", "CPF" e "Ações".

Utiliza um laço de repetição for para percorrer todos os elementos do array dadosLista. Para cada nome, email e cpf inserido no array, uma nova linha é adicionada à tabela. Cada linha contém o nome com email e cpf, e dois botões, um para editar e outro para excluir. E a tabela HTML é atualizada com as novas linhas criadas.

```js
function criarlista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email do Usuário</th><th>CPF</th><th>Ações</th></tr>";

    // i é usado para acessar a posição do array
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td>" + dadosLista[i].cpf + "</td>";
        tabela += "<td><button type='button' onclick='editar(" + i + ")'>Editar</button>";
        tabela += "<button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('table').innerHTML = tabela;
}ById('table').innerHTML = tabela;
```

### ``Função para editar a lista``

Essa função permite ao usuário editar o nome, email e cpf existente na lista.

Os dados ao ser editado é exibido novamente no campo de entrada (input), permitindo que o usuário o modifique. Os dados originais é removido do array dadosLista usando o método splice(). Esse método remove o elemento na posição i - 1, pois os índices do array começam em 0, enquanto os índices da tabela HTML começam em 1.

```js
function editar(index) {
    document.getElementById('nomeUser').value = dadosLista[index].nome;
    document.getElementById('UserEmail').value = dadosLista[index].email;
    document.getElementById('userCpf').value = dadosLista[index].cpf;
    dadosLista.splice(index, 1);
    criarlista();
}
```

### ``Função para excluir a lista``

Remove um nome da lista e atualiza a tabela

O nome correspondente ao índice i - 1 é removido do array dadosLista. A linha correspondente é removida da tabela HTML utilizando o método deleteRow().

```js
function excluir(i){
    // O splice altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    dadosLista.splice((i-1), 1); 
    document.getElementById('table').deleteRow(i);
}
```

## **Tecnologias utilizadas**

O projeto foi desenvolvido utilizando HTML, CSS, JavaScript e Bootstrap.

## **Fontes utilizadas**

https://developer.mozilla.org/

https://chatgpt.com

## **Autores**

Deivid Marques.