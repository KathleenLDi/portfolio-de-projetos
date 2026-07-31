# Portfólio | Kathleen Dias

Site pessoal em HTML, CSS e JavaScript puro, sem framework e sem build.

## Estrutura

```
.
├── index.html          estrutura e conteúdo
├── css/
│   └── estilo.css      todo o visual, com as cores no :root
├── js/
│   └── script.js       editor que digita, troca de telas e animação de entrada
├── imagens/            telas dos projetos e foto
└── mascote.svg         o desenho, solto, caso queira usar como avatar
```

## O que trocar

**Textos**: estão no `index.html`, com o comentário `EDITE AQUI` nos pontos que
valem revisar. A seção Sobre é um rascunho meu, reescreva com suas palavras.

**Cores**: no começo do `css/estilo.css`, dentro do `:root`. As variáveis
`--rosa`, `--lilas` e `--menta` definem a identidade de cada seção.

**Projetos**: cada um é um bloco `<article class="cartao">` no `index.html`.
Copie um inteiro para criar outro. Se o projeto tiver mais de uma tela, some
imagens dentro da `.miniatura` e um botão em `.alternar` para cada uma.

**Frases do editor animado**: no `js/script.js`, nas listas `corpoFuncao`
(o código digitado) e `chamadas` (os pedidos e o que cada um devolve).

**Imagens**: 1200x675 ou 1600x900, proporção 16:9, salvas em `imagens/`.
Tire o print da tela cheia e recorte a barra do navegador.

## Publicar no GitHub Pages

1. Na pasta do projeto:

   ```bash
   git init
   git add .
   git commit -m "Portfólio"
   git branch -M main
   git remote add origin https://github.com/KathleenLDi/portfolio-de-projetos.git
   git push -u origin main
   ```

2. No repositório: **Settings > Pages**. Em *Source*, escolha **Deploy from a branch**,
   com a branch `main` e a pasta `/ (root)`. Salve.
3. Em um ou dois minutos o site aparece em
   `https://kathleenldi.github.io/portfolio-de-projetos/`.

A cada `git push` novo, o Pages atualiza sozinho.

## Ver antes de publicar

Abra o `index.html` com dois cliques. Funciona sem servidor, desde que as pastas
`css`, `js` e `imagens` estejam ao lado dele.
