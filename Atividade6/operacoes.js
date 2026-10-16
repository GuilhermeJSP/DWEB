let num1 = parseFloat(prompt("Digite o 1° número:"));
let num2 = parseFloat(prompt("Digite o 2° número:"));

let soma = num1 + num2;
let subtracao = num1 - num2;
let produto = num1 * num2;
let divisao = num1 / num2;
let resto = num1 % num2;

alert (
    "Resultados:\n" +
    "- Soma: " + soma + "\n" +
    "- Subtração: " + subtracao + "\n" +
    "- Produto: " + produto + "\n" +
    "- Divisão: " + divisao + "\n" +
    "- Resto da divisão: " + resto
);