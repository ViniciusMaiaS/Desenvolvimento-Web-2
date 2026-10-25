const prompt = require("prompt-sync")();

let palavra = prompt("Digite uma palavra: ");

console.log(`Quantidade de caracteres: ${palavra.length}`);

let invertida = palavra.split('').reverse().join('');

if (palavra === invertida) {
    console.log("A palavra é um palíndromo.");
} else {
    console.log("A palavra não é um palíndromo.");
}