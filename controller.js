// VALIDAR ACESSO EM TELA DE LOGIN
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

// FUNÇÃO QUE ARMAZENA EM ARRAY NOME NA TELA DE CADASTRO
var dadosLista = []; // Array sem tamanho definido
function salvarUser(){
    let nomeUser = document.getElementById('nomeUser').value;
   
    if(nomeUser){
        dadosLista.push(nomeUser);
      //console.log(dadosLista);
      criarlista()
        document.getElementById('nomeUser').value = "";
    }else{
        alert('Favor informar o nome para cadastro');
    }
}
 
// FUNÇÃO PARA CRIAR LISTA
function criarlista(){
    // Laço de repetição for
    let tabela = document.getElementById ('table').innerHTML = "<tr><th>Nome Usuário</th><th>Ações</th></tr>"
    // i é usado para acessar a posição do array
    for(let i = 0; i <= (dadosLista.length-1) ; i++){
        tabela += "<tr><td>" + dadosLista [i] + "</td><td><button type='button' onclick='editar(this.parentNode.parentNode.rowIndex)'>Editar</button><button type='button' onclick='excluir(this.parentNode.parentNode.rowIndex)'>Excluir</button></td></tr>";
        document.getElementById('table').innerHTML = tabela;
    }
}

// FUNÇÃO PARA EDITAR NOMES DA LISTA
function editar(i){
    document.getElementById('nomeUser').value = dadosLista[(i - 1)];
    dadosLista.splice(dadosLista[(i - 1)], 1); 
}

// FUNÇÃO PARA EXCLUIR NOME DA LISTA
function excluir(i){
    // O splice altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
    dadosLista.splice((i-1), 1); 
    document.getElementById('table').deleteRow(i);
}