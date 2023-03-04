import { situ, mediaGeral } from "./calculo.js";

var linQtd = 1 // Determina a quantidade de linhas/alunos
var notasQtd = 1 // Determina a quantidade de notas
var medias = ['']

function setLinQtd(value) {
    // Seta um novo valor para linQtd
    linQtd = value
}

function setNotasQtd(value) {
    // Seta um novo valor para notasQtd
    notasQtd = value
}

function setMedias(value) {
    // Seta um novo valor para medias
    medias = value
}

function montarTabela(ordem) {
    // Busca o elemento div com id space, onde será feita a tabela
    var div = document.getElementById('space') 
    var dados = datasLin(ordem) // Chama a função que busca os dados digitados pelo usuário
    // Na linha abaixo é inserido a tabela nova dentro do html
    div.innerHTML = `
    <table class="table" id="tabela">
        <thead>
            <tr>
            <th scope="col">N°</th>
            <th scope="col">Nome</th>
            ${montarHeadNotas()} <!-- Chama a função que cria o cabeçalho -->
            <th scope="col">Média</th>
            <th scope="col">Situação</th>
            </tr>
        </thead>
        <tbody id="tbody">
            ${montarLin(medias, dados[0], dados[1])} <!-- Chama a função que cria as linhas -->
            <td colspan="${notasQtd + 4}"> <!-- Cria um data cell que ocupa toda a largura da tabela -->
                <!-- Chama a função que calcula a média da sala --!>
                <output>A média geral da sala: <br>Geral: ${mediaGeral(medias)}</output>
            </td>
        </tbody>
        <p id="odd" hidden>${ordem}</p> <!-- Número que dirá qual a ordem que dados serão organizados -->
    </table>
    `
}

function datasLin(ordem) {
    var nomes = []
    var notasGeral = []

    // A cada loop irá pegar os nomes dos alunos
    for (var i = 0; i < linQtd; i++) {
        // Busca o elemento que armazena os nomes de acordo com o id, que é determinado pela linha
        var eleNome = document.getElementById(`nome${i}`)
        // Verifica se o elemento é undefined, se não for armazena na lista de nomes
        if (eleNome && eleNome.value !== undefined) {
            nomes.push(eleNome.value)
        } else {
            nomes.push('')
        }

        var notas = []
        // A cada loop irá pegar as notas do aluno atual
        for (var j = 0; j < notasQtd; j++) {
            // Busca o elemento que armazena os nomes de acordo com o id, que é determinado pela linha e coluna
            var eleNotas = document.getElementById(`not${i}${j}`)
            // Verifica se o elemento é undefined, se não for armazena na lista de notas
            if (eleNotas && eleNotas.value !== undefined) {
                notas.push(eleNotas.value)
            } else {
                notas.push('')
            }
        }
        // Armazena as notas do aluno atual na lista de notas da sala, criando uma matriz
        notasGeral.push(notas)
    }
    return ordernar(nomes, notasGeral, ordem)
}

function ordernar(nomes, notasGeral, ordem) {
    // Cria uma lista que armazenará os dados de cada linha
    var lista = [];
    for (var j = 0; j < nomes.length; j++) 
        lista.push({'nome': nomes[j], 'nota': notasGeral[j], 'media': medias[j]});
    // Utilizando a lista criada organizará as notas de acordo com os nomes, 
    // que serão ordenados em ordem alfabética
    // se ordem for == 2, se não se for diferente de 0 e igual a -1, é descrescente
    // se for igual a 1, é crescente
    if (ordem == 2) {
        lista.sort(function(a, b) {
            return ((a.nome < b.nome) ? -1 : ((a.nome == b.nome) ? 0 : 1));
        });
    } else if (ordem != 0) {
        lista.sort(function(a, b) {
            return (a.media - b.media) * ordem;
        });
    }

    // Utilizando a lista das linhas, irá atualizar as listas de nome, notas da sala e medias
    for (var k = 0; k < lista.length; k++) {
        nomes[k] = lista[k].nome;
        notasGeral[k] = lista[k].nota;
        medias[k] = lista[k].media;
    }
    return [nomes, notasGeral]
}

function montarHeadNotas() {
    var notas = ''
    // Monta um head pras notas de acordo com a quantidade de notas
    // que é definido pelo notasQtd
    for(var i = 1; i <= notasQtd; i++) {
        notas += `<th scope='col'>Nota ${i}</th>`
    }
    return notas
}

function montarLin(medias, nomes, notasGeral) {
    var linhas = ''

    // Cria as linhas da tabela
    for(var i = 0; i < linQtd; i++) {
        // Monta as notas da linha atual, utilizando as notas da sala, e o index linha atual
        var notaInd = montarNotaLin(i, notasGeral) 
        linhas += `
        <tr>
        <!-- Cria a numeração da linha -->
        <th>${i+1}</th>
        <!-- Cria a linha utilizando o nome da linha atual, e criando o id de acordo com a linha -->
        <td><input type="text" class="form-control" id="nome${i}" placeholder="nome" value="${nomes[i]}"></td>
        <!-- Adiciona a linha criada na função montarNotaLin -->
        ${notaInd}
        <!-- Adiciona a média do aluno de acordo com a linha -->
        <td><output>${medias[i]}</output></td>
        <!-- Chama a função que verifica qual a situação do aluno atual -->
        <td><output>${situ(medias[i])}</output></td>
        </tr>
        `
    }
    return linhas
}

function montarNotaLin(i, notasGeral) {
    var notasLin = ''
    for(var j = 0; j < notasQtd; j++) {
        // Cria as data cells das notas, com o id criado a partir da linha e coluna que ele taá
        notasLin += `<td><input type="number" class="form-control" id="not${i}${j}" 
        value="${notasGeral[i][j]}"></td>`
        // Busca a nota que está na linha e na coluna atual
    }
    return notasLin
} 

export { linQtd, setLinQtd, notasQtd, setNotasQtd, medias, setMedias, montarTabela }