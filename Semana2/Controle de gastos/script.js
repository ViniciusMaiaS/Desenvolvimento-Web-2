
const form = document.getElementById("formGasto");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoCategoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");
const totalGeral = document.getElementById("totalGeral");
const vazio = document.getElementById("vazio");
const listaGastos = document.getElementById("listaGastos");

const nomesCategorias = {
  alimentacao: "Alimentação",
  transporte: "Transporte",
  lazer: "Lazer",
  estudos: "Estudos",
  outros: "Outros"
};

// Dados salvos
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Formata valores em reais
function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Mostra mensagens
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem";
  mensagem.classList.add(tipo);
}

// Salva os gastos
function salvar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Valida os campos
function validar(descricao, textoValor, categoria) {
  if (descricao === "") {
    return "Informe a descrição do gasto.";
  }

  if (textoValor === "" || Number.isNaN(Number(textoValor))) {
    return "Informe um valor numérico.";
  }

  if (Number(textoValor) <= 0) {
    return "O valor deve ser maior que zero.";
  }

  if (categoria === "") {
    return "Selecione uma categoria.";
  }

  return "";
}

// Cria uma linha na tabela
function criarLinha(gasto) {
  const tr = document.createElement("tr");
  tr.dataset.id = gasto.id;

  const tdDescricao = document.createElement("td");
  tdDescricao.textContent = gasto.descricao;

  const tdCategoria = document.createElement("td");
  const badge = document.createElement("span");
  badge.classList.add("badge", gasto.categoria);
  badge.textContent = nomesCategorias[gasto.categoria];
  tdCategoria.appendChild(badge);

  const tdValor = document.createElement("td");
  tdValor.classList.add("valor");
  tdValor.textContent = formatar(gasto.valor);

  const tdAcao = document.createElement("td");
  const botao = document.createElement("button");
  botao.type = "button";
  botao.classList.add("remover");
  botao.textContent = "Remover";
  tdAcao.appendChild(botao);

  tr.appendChild(tdDescricao);
  tr.appendChild(tdCategoria);
  tr.appendChild(tdValor);
  tr.appendChild(tdAcao);

  return tr;
}

// Atualiza os totais
function atualizarResumo() {
  const totais = {
    alimentacao: 0,
    transporte: 0,
    lazer: 0,
    estudos: 0,
    outros: 0
  };

  let geral = 0;

  for (const gasto of gastos) {
    const valorCentavos = Math.round(gasto.valor * 100);

    totais[gasto.categoria] += valorCentavos;
    geral += valorCentavos;
  }

  totalGeral.textContent = formatar(geral / 100);

  for (const categoria in totais) {
    document.getElementById("total-" + categoria).textContent =
      formatar(totais[categoria] / 100);
  }
}

// Atualiza a tabela
function renderizar() {
  listaGastos.textContent = "";

  for (const gasto of gastos) {
    listaGastos.appendChild(criarLinha(gasto));
  }

  vazio.classList.toggle("oculto", gastos.length > 0);

  atualizarResumo();
}

// Cadastra um gasto
form.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const descricao = campoDescricao.value.trim();
  const textoValor = campoValor.value;
  const categoria = campoCategoria.value;

  const problema = validar(descricao, textoValor, categoria);

  if (problema !== "") {
    mostrarMensagem(problema, "erro");
    return;
  }

  const gasto = {
    id: Date.now(),
    descricao: descricao,
    valor: Math.round(Number(textoValor) * 100) / 100,
    categoria: categoria
  };

  gastos.push(gasto);

  salvar();
  renderizar();

  form.reset();
  campoDescricao.focus();

  mostrarMensagem("Gasto adicionado com sucesso!", "sucesso");
});

// Remove um gasto
listaGastos.addEventListener("click", function(evento) {
  const botao = evento.target.closest(".remover");

  if (!botao) {
    return;
  }

  const linha = botao.closest("tr");
  const id = Number(linha.dataset.id);

  gastos = gastos.filter(function(gasto) {
    return gasto.id !== id;
  });

  salvar();
  renderizar();
});

// Carrega os gastos
renderizar();
