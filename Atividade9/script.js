
function maiorDeTres(n1, n2, n3) {
    if (n1 >= n2 && n1 >= n3) return n1;
    if (n2 >= n1 && n2 >= n3) return n2;
    return n3;
}

function ordenarTres(n1, n2, n3) {
    let a = n1, b = n2, c = n3;
    let aux;

    if (a > b) { aux = a; a = b; b = aux; }
    if (a > c) { aux = a; a = c; c = aux; }
    if (b > c) { aux = b; b = c; c = aux; }

    return [a, b, c];
}

function verificarPalindromo(str) {
    if (!str) return "Digite uma palavra válida";

    let limpa = str.toLowerCase().replace(/\s+/g, '');
    let invertida = limpa.split('').reverse().join('');

    return limpa === invertida ? "É palíndromo" : "Não é palíndromo";
}

function verificarSubconjunto(p1, p2) {
    if (!p1 || !p2 || p1.trim() === "" || p2.trim() === "") {
        return "erro";
    }

    return p1.includes(p2) ? "é um subconjunto" : "não é um subconjunto";
}

function diaDaSemana(dataParam) {
    if (!dataParam) return "Selecione uma data";

    let d = new Date(dataParam + 'T00:00:00');

    const dias = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    return dias[d.getDay()];
}

function testar1() {
    let v1 = Number(document.getElementById('n1').value);
    let v2 = Number(document.getElementById('n2').value);
    let v3 = Number(document.getElementById('n3').value);

    document.getElementById('res1').innerText = maiorDeTres(v1, v2, v3);
}

function testar2() {
    let v1 = Number(document.getElementById('o1').value);
    let v2 = Number(document.getElementById('o2').value);
    let v3 = Number(document.getElementById('o3').value);

    document.getElementById('res2').innerText = ordenarTres(v1, v2, v3).join(', ');
}

function testar3() {
    let texto = document.getElementById('palavra').value;

    document.getElementById('res3').innerText = verificarPalindromo(texto);
}

function testar4() {
    let p1 = document.getElementById('sub1').value;
    let p2 = document.getElementById('sub2').value;

    document.getElementById('res4').innerText = verificarSubconjunto(p1, p2);
}

function testar5() {
    let data = document.getElementById('dataInput').value;

    document.getElementById('res5').innerText = diaDaSemana(data);
}
