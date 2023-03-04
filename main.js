import { linQtd, setLinQtd, notasQtd, setNotasQtd, medias, setMedias, montarTabela } 
from "./modules/tabela.mjs";

var ordem = -1 // Inicia com a ordem decrescente

montarTabela(0) // Cria a tabela no momento em que a página é carregada

function calcular() {
    // Cria uma lista local para calcular as medias dos alunos
    var mediasLocal = []
    // Cria um loop de acordo com as linhas
    for(var i = 0; i < linQtd; i++) {
        var soma = 0
        // Soma todas as notas daquela linhas, fazendo a busca através do id
        for (var j = 0; j < notasQtd; j++) {
            soma += parseInt(document.getElementById(`not${i}${j}`).value)
        }
        // Logo após calcula a média
        var med = soma / notasQtd

        // Caso a média seja NaN, ou seja, esteja faltando uma nota na linha, a média continua vazia
        if (isNaN(med)) {
            mediasLocal.splice(i, 0, '')
        } else {
            // Se não adiciona a média a lista de média com duas casas decimais
            mediasLocal.splice(i, 0, med.toFixed(2))
        }
    }
    // Envia a lista com as novas dos alunos para ser armazenado na lista medias
    setMedias(mediasLocal)
    montarTabela(0)
}

function addLin() { 
    // Verifica se as linhas já atingiram o limite de 10
    if (linQtd < 10){
        // Caso não adiciona mais uma
        setLinQtd(linQtd + 1)
        medias.push('')
    } else {
        // Se sim, avisa ao usuário
        alert('Limite de linhas atingido.')
    }
    montarTabela(0)
}

function addNotas() {
    if (notasQtd < 6){
        // Se tiver menos de 6 notas, adiciona mais um a variável notasQtd
        setNotasQtd(notasQtd + 1)
    } else {
        alert('Limite de notas atingido.')
    }
    var mediasLocal = []
    for (var i = 0; i < linQtd; i++) {
        // Torna todas as medias em ''
        mediasLocal.push('')
    }
    // Pega a lista de medias '' e seta na variavel principal
    setMedias(mediasLocal)
    montarTabela(0)
}

function delLin() {
    // Verifica se há apenas uma linha na tabela
    if (linQtd > 1){
        // Se tiver mais, remove uma e retira a ultima média da lista
        setLinQtd(linQtd - 1)
        setMedias(medias.slice(0, -1));
    } else {
        // Se não avisa ao usuário que não é permitido remover mais linhas
        alert('Limite de linhas atingido.')
    }
    montarTabela(0)
}

function delNotas() {
    // Verifica se há apenas uma nota na tabela
    if (notasQtd > 1){
        // Se tiver mais, remove uma
        setNotasQtd(notasQtd - 1)
    } else {
        // Se não avisa ao usuário que não é permitido remover mais notas
        alert('Limite de notas atingido.')
    }
    montarTabela(0)
}

function ordemAlph() {
    // Se o botão Ordem Alfabética for apertado a tabela é gerado com ordem alfabética
    ordem = 2
    montarTabela(ordem)
}

function ordemNum() {
    // Se o botão Ordem Crescente/Descrescent for apertado a tabela é gerado em ordem Crescente/Descrescente
    // Muda a ordem anterior
    ordem = parseInt(document.getElementById("odd").innerText) * -1

    // Caso a ordem anterior tenha sido alfabética
    if (ordem == -2) {
        ordem += 1
    }

    // Caso a ordem for 0, ou seja mantendo a ordem atual, ele troca para ordem crescente
    if (ordem == 0) ordem = 1
    montarTabela(ordem)
}

// Adiciona as funções aos botões referentes
document.querySelector('#calc').onclick = function() {
    calcular();
};

document.querySelector('#addLin').onclick = function() {
    addLin();
};

document.querySelector('#addNot').onclick = function() {
    addNotas();
};

document.querySelector('#delLin').onclick = function() {
    delLin();
};

document.querySelector('#delNot').onclick = function() {
    delNotas();
};

document.querySelector('#ordAlph').onclick = function() {
    ordemAlph();
};

document.querySelector('#ordNum').onclick = function() {
    ordemNum();
};
