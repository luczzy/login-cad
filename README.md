# **Cadastro de usuários**

## **Objetivo**

Este projeto é uma aplicação web simples que permite aos usuários se cadastrar e fazer login.

## **Preview**

![Preview](/img/recvalidacao.gif)

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
        // alert("Campos preenchidos com sucesso");
        window.location.href = 'cad.html';
    }
}
```

### ``Armazenando o nome e o email do usuário em array``

Esta função armazena os dados do usuário em um array e chama outra função para atualizar a lista de nomes na tela. 

O valor inserido no campo de nome é capturado e armazenado na variável 'nomeUser'. Para armazenar o email, o valor é inserido na variável 'UserEmail' Se os dois campos estiver vazio, um alerta é exibido pedindo que o usuário preencha o nome e o email. Se os dados forem válido, ele é adicionado ao array dadosLista usando o método push(). A função criarlista() é chamada para atualizar a tabela com os novos dados. O campo de entrada é limpo para permitir a inserção de novos dados.

```js
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
```

### ``Criando a lista``
Atualiza a tabela HTML com os nomes armazenados no array dadosLista. A função define a estrutura básica da tabela, com os cabeçalhos "Nome Usuário", "Email do Usuário" e "Ações".

Utiliza um laço de repetição for para percorrer todos os elementos do array dadosLista. Para cada nome e email inserido no array, uma nova linha é adicionada à tabela. Cada linha contém o nome com email, e dois botões, um para editar e outro para excluir. E a tabela HTML é atualizada com as novas linhas criadas.

```js
function criarlista() {
    let tabela = "<tr><th>Nome Usuário</th><th>Email do Usuário</th><th>Ações</th></tr>";

    // i é usado para acessar a posição do array
    for (let i = 0; i < dadosLista.length; i++) {
        tabela += "<tr><td>" + dadosLista[i].nome + "</td><td>" + dadosLista[i].email + "</td><td><button type='button' onclick='editar(" + i + ")'>Editar</button><button type='button' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
    }
    document.getElementById('table').innerHTML = tabela;
}
```

### ``Função para editar a lista``

Essa função permite ao usuário editar o nome e o email existente na lista.

Os dados ao ser editado é exibido novamente no campo de entrada (input), permitindo que o usuário o modifique. Os dados originais é removido do array dadosLista usando o método splice(). Esse método remove o elemento na posição i - 1, pois os índices do array começam em 0, enquanto os índices da tabela HTML começam em 1.

```js
function editar(index) {
    document.getElementById('nomeUser').value = dadosLista[index].nome;
    document.getElementById('UserEmail').value = dadosLista[index].email;
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