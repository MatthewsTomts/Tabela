var linQtd = 1
var notasQtd = 1
var medias = ['']
var ordem = -1

function montarTabela(ordem) {
    var tabela = document.getElementById('tabela')
    dados = datasLin(ordem)
    tabela.innerHTML = `
    <thead>
        <tr>
        <th scope="col">N°</th>
        <th scope="col">Nome</th>
        ${montarHeadNotas()}
        <th scope="col">Média</th>
        <th scope="col">Situação</th>
        </tr>
    </thead>
    <tbody id="tbody">
        ${montarLin(medias, dados[0], dados[1])}
        <td colspan="${notasQtd + 4}"><output>A média geral da sala: <br>Geral: ${mediaGeral(medias)}</output></td>
    </tbody>
    <p id="odd" hidden>${ordem}</p>
    `
}

function montarHeadNotas() {
    var notas = ''
    for(i = 1; i <= notasQtd; i++) {
        notas += `<th scope='col'>Nota ${i}</th>`
    }
    return notas
}

function datasLin(ordem) {
    var nomes = []
    var notasGeral = []

    for (i = 0; i < linQtd; i++) {
        var eleNome = document.getElementById(`nome${i}`)
        if (eleNome && eleNome.value !== undefined) {
            nomes.push(eleNome.value)
        } else {
            nomes.push('')
        }

        var notas = []
        for (j = 0; j < notasQtd; j++) {
            var eleNotas = document.getElementById(`not${i}${j}`)
            if (eleNotas && eleNotas.value !== undefined) {
                notas.push(eleNotas.value)
            } else {
                notas.push('')
            }
        }
        notasGeral.push(notas)
    }
    
    var lista = [];
    for (var j = 0; j < nomes.length; j++) 
        lista.push({'nome': nomes[j], 'nota': notasGeral[j], 'media': medias[j]});
    if (ordem == 2) {
        lista.sort(function(a, b) {
            return ((a.nome < b.nome) ? -1 : ((a.nome == b.nome) ? 0 : 1));
        });
    } else if (ordem != 0) {
        lista.sort(function(a, b) {
            return (a.media - b.media) * ordem;
        });
    }
    for (var k = 0; k < lista.length; k++) {
        nomes[k] = lista[k].nome;
        notasGeral[k] = lista[k].nota;
        medias[k] = lista[k].media;
    }
    return [nomes, notasGeral]
}

function montarLin(medias, nomes, notasGeral) {
    var linhas = ''

    for(i = 0; i < linQtd; i++) {
        notaInd = montarNotaLin(i, notasGeral)
        linhas += `
        <tr>
        <th>${i+1}</th>
        <td><input type="text" class="form-control" id="nome${i}" placeholder="nome" value="${nomes[i]}"></td>
        ${notaInd}
        <td><output>${medias[i]}</output></td>
        <td><output>${situ(medias[i])}</output></td>
        </tr>
        `
    }
    return linhas
}

function montarNotaLin(i, notasGeral) {
    var notasLin = ''
    for(j = 0; j < notasQtd; j++) {
        notasLin += `<td><input type="number" class="form-control" id="not${i}${j}" value="${notasGeral[i][j]}"></td>`
    }
    return notasLin
}

function addLin() { 
    if (linQtd < 10){
        linQtd += 1
        medias.push('')
    } else {
        alert('Limite de linhas atingido.')
    }
    montarTabela(0)
}

function addNotas() {
    if (notasQtd < 6){
        notasQtd += 1
    } else {
        alert('Limite de notas atingido.')
    }
    medias = []
    for (i = 0; i < notasQtd; i++) {
        medias.push('')
    }
    montarTabela(0)
}

function delLin() {
    if (linQtd > 1){
        linQtd -= 1
        medias.slice(0, -1);
    } else {
        alert('Limite de linhas atingido.')
    }
    montarTabela(0)
}

function delNotas() {
    if (notasQtd > 1){
        notasQtd -= 1
    } else {
        alert('Limite de notas atingido.')
    }
    montarTabela(0)
}

function calcular() {
    medias = []
    for(i = 0; i < linQtd; i++) {
        var soma = 0
        for (j = 0; j < notasQtd; j++) {
            soma += parseInt(document.getElementById(`not${i}${j}`).value)
        }
        var med = soma / notasQtd
        if (isNaN(med)) {
            medias.splice(i, 0, '')
        } else {
            medias.splice(i, 0, med.toFixed(2))
        }
    }
    montarTabela(0)
}

function situ(media) {
    if (media == '') {
        return ''
    } if (media >= 70){
        return 'Aprovado'
    } else if (media >= 50) {
        return 'Recuperação'
    } else {
        return 'Reprovado'
    }
}

function mediaGeral(medias) {
    var soma = 0
    for(const nota of medias) {
        if (!isNaN(parseInt(nota))) {
            soma += parseInt(nota)
        } else {
            return ''
        }
    }
    return (soma / medias.length).toFixed(2)
}

function ordemAlph() {
    ordem = 2
    montarTabela(ordem)
}

function ordemNum() {
    ordem = parseInt(document.getElementById("odd").innerText) * -1
    if (ordem == 2) {
        ordem -= 1
    } else if (ordem == -2 ) {
        ordem += 1
    }
    if (ordem == 0) ordem = 1
    montarTabela(ordem)
}
