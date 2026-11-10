const totalPessoas = 5;
let respostas = [];

const form = document.getElementById('pesquisaForm');
const atualSpan = document.getElementById('atual');
const contadorP = document.getElementById('contador');
const resultadosDiv = document.getElementById('resultados');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const opiniao = parseInt(document.getElementById('opiniao').value);

    respostas.push({ idade, sexo, opiniao });

    form.reset();

    if (respostas.length < totalPessoas) {
        atualSpan.textContent = respostas.length + 1;
    } else {
     
        form.classList.add('hidden');
        contadorP.textContent = "Pesquisa Finalizada!";
        calcularResultados();
        resultadosDiv.classList.remove('hidden');
    }
});

function calcularResultados() {
    let somaIdades = 0;
    let idadeMaisVelha = -Infinity;
    let idadeMaisNova = Infinity;
    let qtdPessimo = 0;
    let qtdOtimoBom = 0;
    let qtdMulheres = 0;
    let qtdHomens = 0;
    let qtdOutros = 0;

    respostas.forEach(p => {
        somaIdades += p.idade;

        if (p.idade > idadeMaisVelha) idadeMaisVelha = p.idade;
        if (p.idade < idadeMaisNova) idadeMaisNova = p.idade;

        if (p.opiniao === 1) qtdPessimo++;
        if (p.opiniao === 4 || p.opiniao === 3) qtdOtimoBom++;

        if (p.sexo === 'F') qtdMulheres++;
        else if (p.sexo === 'M') qtdHomens++;
        else if (p.sexo === 'O') qtdOutros++;
    });

    const mediaIdade = somaIdades / totalPessoas;
    const porcentagemOtimoBom = (qtdOtimoBom / totalPessoas) * 100;


    document.getElementById('resMedia').textContent = mediaIdade.toFixed(2);
    document.getElementById('resVelha').textContent = idadeMaisVelha;
    document.getElementById('resNova').textContent = idadeMaisNova;
    document.getElementById('resPessimo').textContent = qtdPessimo;
    document.getElementById('resPorcentagem').textContent = porcentagemOtimoBom.toFixed(2);
    document.getElementById('resMulheres').textContent = qtdMulheres;
    document.getElementById('resHomens').textContent = qtdHomens;
    document.getElementById('resOutros').textContent = qtdOutros;
}