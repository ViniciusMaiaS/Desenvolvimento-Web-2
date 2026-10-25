const prompt = require("prompt-sync")();

function avaliarRiscoDeCredito(rendaMensal, dividaAtual) {
    rendaMensal = parseFloat(rendaMensal);
    dividaAtual = parseFloat(dividaAtual);

    let TE = (dividaAtual / rendaMensal) * 100;

    if (TE < 10) {
        return "Risco Baixo";
    } else if (TE < 30) {
        return "Risco Moderado";
    } else {
        return "Risco Alto";
    }
}

let rendaMensal = prompt("Digite sua renda mensal: ");
let dividaAtual = prompt("Digite sua dívida atual: ");

let risco = avaliarRiscoDeCredito(rendaMensal, dividaAtual);

console.log(`Classificação de risco: ${risco}`);