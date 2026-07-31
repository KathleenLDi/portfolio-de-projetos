document.getElementById("ano").textContent = new Date().getFullYear();

const paradinho = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* editor que se escreve sozinho e devolve um projeto real a cada chamada */
const corpoFuncao = [
  [["function ","tk-chave"],["projeto","tk-func"],["(","tk-pont"],["pedido","tk-var"],[") {","tk-pont"]],
  [["  const ","tk-chave"],["problema","tk-var"],[" = ","tk-pont"],["entender","tk-func"],["(pedido)","tk-pont"]],
  [["  const ","tk-chave"],["tela","tk-var"],[" = ","tk-pont"],["desenhar","tk-func"],["(problema)","tk-pont"]],
  [["  return ","tk-chave"],["publicar","tk-func"],["(tela)","tk-pont"]],
  [["}","tk-pont"]],
  []
];

const chamadas = [
  { arg: '"agendar o banho do pet"',   devolve: "cantinhodobanho.com.br" },
  { arg: '"rastrear o equipamento"',   devolve: "logitel" },
  { arg: '"simular um consórcio"',     devolve: "rsinter.com.br" },
  { arg: '"organizar o mês"',          devolve: "órbita" }
];

const areaCodigo = document.getElementById("codigo");
const areaRetorno = document.getElementById("retorno");

function criarLinha(){
  const l = document.createElement("div");
  l.className = "linha";
  l.innerHTML = '<span class="n"></span><span class="c"></span>';
  areaCodigo.appendChild(l);
  l.querySelector(".n").textContent = areaCodigo.children.length;
  return l.querySelector(".c");
}

function escreverPedaco(alvo, texto, classe, aoTerminar){
  const s = document.createElement("span");
  s.className = classe;
  alvo.appendChild(s);
  let n = 0;
  const t = setInterval(() => {
    s.textContent = texto.slice(0, ++n);
    if (n >= texto.length){ clearInterval(t); aoTerminar(); }
  }, 32);
}

function escreverLinha(pedacos, aoTerminar){
  const alvo = criarLinha();
  let i = 0;
  (function proximo(){
    if (i >= pedacos.length) return setTimeout(aoTerminar, 120);
    const [texto, classe] = pedacos[i++];
    escreverPedaco(alvo, texto, classe, proximo);
  })();
}

function rodarChamadas(indice){
  const c = chamadas[indice % chamadas.length];
  const alvo = criarLinha();
  const linha = alvo.parentElement;
  const pedacos = [["projeto","tk-func"],["(","tk-pont"],[c.arg,"tk-txt"],[")","tk-pont"]];
  let i = 0;
  (function proximo(){
    if (i < pedacos.length){
      const [texto, classe] = pedacos[i++];
      return escreverPedaco(alvo, texto, classe, proximo);
    }
    areaRetorno.innerHTML = '<span>&#8627;</span> <b>' + c.devolve + '</b>';
    areaRetorno.classList.add("visivel");
    setTimeout(() => {
      areaRetorno.classList.remove("visivel");
      setTimeout(() => { linha.remove(); rodarChamadas(indice + 1); }, 500);
    }, 3200);
  })();
}

function escreverTudo(){
  let i = 0;
  (function proxima(){
    if (i >= corpoFuncao.length) return rodarChamadas(0);
    escreverLinha(corpoFuncao[i++], proxima);
  })();
}

if (areaCodigo){
  if (paradinho){
    corpoFuncao.forEach(pedacos => {
      const alvo = criarLinha();
      pedacos.forEach(([texto, classe]) => {
        const s = document.createElement("span");
        s.className = classe; s.textContent = texto; alvo.appendChild(s);
      });
    });
    const alvo = criarLinha();
    [["projeto","tk-func"],["(","tk-pont"],[chamadas[0].arg,"tk-txt"],[")","tk-pont"]]
      .forEach(([texto, classe]) => {
        const s = document.createElement("span");
        s.className = classe; s.textContent = texto; alvo.appendChild(s);
      });
    areaRetorno.innerHTML = '<span>&#8627;</span> <b>' + chamadas[0].devolve + '</b>';
    areaRetorno.classList.add("visivel");
  } else {
    const olho = new IntersectionObserver((e) => {
      if (e[0].isIntersecting){ olho.disconnect(); escreverTudo(); }
    }, { threshold: .3 });
    olho.observe(areaCodigo);
  }
}

document.querySelectorAll(".miniatura").forEach(m => {
  if (!m.querySelector("img.ativa")) m.querySelector("img")?.classList.add("ativa");
});

document.querySelectorAll(".miniatura img").forEach(img => {
  img.addEventListener("error", () => {
    const moldura = img.closest(".miniatura");
    img.remove();
    if (!moldura.querySelector("img")) moldura.classList.add("vazia");
  });
});

document.querySelectorAll(".alternar").forEach(grupo => {
  const telas = grupo.closest(".miniatura").querySelectorAll("img");
  grupo.querySelectorAll("button").forEach(botao => {
    botao.addEventListener("click", () => {
      const i = Number(botao.dataset.tela);
      telas.forEach((t, j) => t.classList.toggle("ativa", j === i));
      grupo.querySelectorAll("button").forEach(b => b.classList.toggle("ativo", b === botao));
    });
  });
});

const alvos = document.querySelectorAll(".surge");
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visivel"), i * 90);
      observador.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -60px" });

alvos.forEach(a => observador.observe(a));
