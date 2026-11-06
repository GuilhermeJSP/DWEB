function jogar(escolhaUsuario) {

    let numeroAleatorio = Math.floor(Math.random() * 3);// Gera um número aleatório entre 0 e 2 para representar a escolha do computador
    let escolhaComputador = "";// Variável para armazenar a escolha do computador

    if (numeroAleatorio === 0) {
        escolhaComputador = "Pedra";
    } else if (numeroAleatorio === 1) {
        escolhaComputador = "Papel";
    } else {
        escolhaComputador = "Tesoura";
    }

    
    let resultadoPartida = "";// Variável para armazenar o resultado da partida

    if (escolhaUsuario === escolhaComputador) {
        resultadoPartida = "Empate! Ambos escolheram " + escolhaUsuario;
    } 
    else if (
        (escolhaUsuario === "Pedra" && escolhaComputador === "Tesoura") ||
        (escolhaUsuario === "Tesoura" && escolhaComputador === "Papel") ||
        (escolhaUsuario === "Papel" && escolhaComputador === "Pedra")
    ) {
        resultadoPartida = "Você venceu! " + escolhaUsuario + " ganha de " + escolhaComputador;
    } 
    else {
        resultadoPartida = "O computador venceu! " + escolhaComputador + " ganha de " + escolhaUsuario;
    }

    let mensagemFinal = "Computador escolheu: " + escolhaComputador + "\n\n" + resultadoPartida;

    let painelMensagem = document.getElementById("mensagem");
    painelMensagem.innerHTML = "Computador escolheu: <strong>" + escolhaComputador + "</strong><br>" + resultadoPartida;
}