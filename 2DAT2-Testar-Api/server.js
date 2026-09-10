// ============================================================ //
//     API DE PRODUTOS - Métodos HTTP e Status Codes            //
//     Backend 2DAT2 - 3º Trimestre                             //
// ============================================================ //

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // permite ler o corpo (body) em JSON
app.use(express.static("public")); // serve a página de teste em /public

// "Banco de dados" em memória (um array de objetos)
let produtos = [
  { id: 1, nome: "Teclado Mecânico", preco: 250 },
  { id: 2, nome: "Mouse Gamer", preco: 120 },
  { id: 3, nome: "Monitor 24pol", preco: 900 },
];
let proximoId = 4;

// ------------------------------------------------------------
// 1) LISTAR TODOS -> GET /produtos
// Deve responder 200 (OK) com a lista completa.
// ------------------------------------------------------------
app.get("/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// ------------------------------------------------------------
// 2) BUSCAR UM -> GET /produtos/:id
// Se achar -> 200 (OK) com o produto.
// Se NÃO achar -> 404 (Not Found) com uma mensagem.
// ------------------------------------------------------------
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  // RESOLVIDO: Valida se o produto existe
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

// ------------------------------------------------------------
// 3) CRIAR -> POST /produtos
// Validar: precisa vir "nome" e "preco" no corpo.
// - Se faltar dado -> 400 (Bad Request).
// - Se estiver ok -> 201 (Created) com o produto criado.
// ------------------------------------------------------------
app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;

  // RESOLVIDO: Valida se os campos obrigatórios foram enviados
  if (!nome || preco == null) {
    return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
  }

  const novo = { id: proximoId++, nome, preco };
  produtos.push(novo);

  // RESOLVIDO: Status alterado para 201 (Created)
  res.status(201).json(novo);
});

// ------------------------------------------------------------
// 4) ATUALIZAR -> PUT /produtos/:id
// Se achar -> atualiza e responde 200 (OK).
// Se NÃO achar -> 404 (Not Found).
// ------------------------------------------------------------
app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  // RESOLVIDO: Valida se o produto a ser atualizado existe
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const { nome, preco } = req.body;
  if (nome !== undefined) produto.nome = nome;
  if (preco !== undefined) produto.preco = preco;

  res.status(200).json(produto);
});

// ------------------------------------------------------------
// 5) APAGAR -> DELETE /produtos/:id
// Se achar -> apaga e responde 204 (No Content, sem corpo).
// Se NÃO achar -> 404 (Not Found).
// ------------------------------------------------------------
app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const existe = produtos.some((p) => p.id === id);

  // RESOLVIDO: Valida se o produto a ser excluído existe
  if (!existe) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos = produtos.filter((p) => p.id !== id);

  // RESOLVIDO: Retorna status 204 sem corpo utilizando .end()
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`API no ar em http://localhost:${PORT}`);
});
