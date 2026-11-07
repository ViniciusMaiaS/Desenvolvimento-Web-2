const URL_API = "https://picsum.photos/v2/list?limit=36";
const galeria = document.getElementById("galeria");
const mensagem = document.getElementById("mensagem");


async function buscarFotos() {
    const resposta = await fetch(URL_API);

    if (!resposta.ok) {
        throw new Error("Erro HTTP " + resposta.status);
    }

    return await resposta.json();
}

function criarCartao(foto) {
    const cartao = document.createElement("figure");
    cartao.classList.add("cartao");

    const imagem = document.createElement("img");
    imagem.src = "https://picsum.photos/id/" + foto.id + "/400/300";
    imagem.alt = "Foto de " + foto.author;
    imagem.loading = "lazy";

    const legenda = document.createElement("figcaption");
    legenda.textContent = foto.author;
    cartao.appendChild(imagem);
    cartao.appendChild(legenda);

    return cartao;
}

async function carregarGaleria() {
    mensagem.textContent = "Carregando...";
    mensagem.classList.remove("erro");

    try {
        const fotos = await buscarFotos();
        for (const foto of fotos) {
        galeria.appendChild(criarCartao(foto));
    }
    mensagem.textContent = fotos.length + " fotos carregadas.";
    } catch (erro) {
    mensagem.textContent = "Não foi possível carregar as fotos: " + erro.message;
    mensagem.classList.add("erro");
    }
}
carregarGaleria();