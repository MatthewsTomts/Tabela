function situ(media) {
    // Verifica a nota do aluno
    // Caso esteja vazio, a situação será vazia também
    if (media == '') {
        return ''
    } else if (media >= 70){
        // Caso a média esteja acima de 70, a situação será Aprovado
        return 'Aprovado'
    } else if (media >= 50) {
        // Caso a média esteja acima de 50 e abaixo de 70, a situação será Recuperação
        return 'Recuperação'
    } else {
        // Caso a média esteja abaixo de 50, a situação será Reprovado
        return 'Reprovado'
    }
}

function mediaGeral(medias) {
    var soma = 0
    // Faz um loop no medias
    for(const nota of medias) {
        // Verifica se a nota é válida
        if (!isNaN(parseInt(nota))) {
            // Caso seja adiciona em soma
            soma += parseInt(nota)
        } else {
            // Caso não seja retorna '' e a média geral fica vázia
            return ''
        }
    }
    // Caso o for chegue ao final, é calculado a media da sala
    return (soma / medias.length).toFixed(2)
}  

export { situ, mediaGeral }