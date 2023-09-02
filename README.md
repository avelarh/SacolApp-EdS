# TP1 Engenharia de Software 

# Objetivo: 
O objetivo do projeto é desenvolver um sistema de compras de um supermercado, possibilitando que usuários
adicionem itens, que são cadastrados pelo vendedor, ao carrinho. O sistema chamará SacolApp.

# Features: 
- cadastrar usuário
- fazer login
- adicionar itens ao carrinho
- editar item(descrição, quantidade)
- exluir itens do carrinho
  
# Membros da equipe: 
## Front-end:
- Bernardo do Nascimento Nunes 
- Gabriela Tavares Barreto
## Back-end
- Enzo Pinheiro Pierazolli
- Avelar Ribeiro Hostalácio

# Tecnologias 
- React Native
- Express
- Node
- Typescript
- SQLite

# Backlog do Produto
-História #1: Como um usuário do sistema, quero conseguir me cadastrar no sistema
-História #2: Como um usuário do sistema, quero fazer login com e-mail e senha para acessar o sistema, mantendo a segurança dos dados.
-História 3: Como um usuário do sistema, quero adicionar itens ao meu carrinho de compra no sistema.
-História 4: Como um administrador do sistema, quero poder adicionar produtos disponíveis para compra no meu sistema.
-História 5: Como um usuário do sistema, quero poder editar meus produtos no carrinho de compras, seja editá-los ou excluí-los.
-História 6: Como um usuário do sistema, quero poder pesquisar produtos por categorias
-História 7: Como um usuário do sistema, quero marcar produtos como favoritos e armazená-los em uma aba dedicada
-História 8: Como um usuário do sistema, quero poder recuperar minha senha por email caso eu esqueça-a
-História 9: Como um usuário do sistema, quero poder realizar a compra dos produtos
História 10: Como um usuário do sistema, quero poder filtrar os produtos em função de seu preço

# Backlog do sprint
-História #1: Como um usuário do sistema, quero conseguir me cadastrar no sistema
  Tarefas e responsáveis:
  #F03 [FE] Tela de cadastro de usuário - parte visual
  #F04 [FE] Tela de cadastro de usuário - conexão com o back
  #B02 [BE] Rotas para CRUD do usuário: [Enzo]

-História #2: Como um usuário do sistema, quero fazer login com e-mail e senha para acessar o sistema, mantendo a segurança dos dados.
  Tarefas e responsáveis:
  #F01 [FE] Tela de login - parte visual
  #F02 [FE] Tela de login - conexão com o back
  #B08 [BE] Rotas de Login [Avelar]
  #B03 [BE] Autenticação Login com JWT: [Avelar]

-História 3: Como um usuário do sistema, quero adicionar itens ao meu carrinho de compra no sistema.
  Tarefas e responsáveis:
  #F05 [FE] Tela de listagem de produtos
  #F07 [FE] Edição de produtos do carrinho
  #B06 [BE] Rotas para adição de produtos ao carrinho: [Enzo]
  #F06 [FE] Modal para adicionar produto

-História 4: Como um administrador do sistema, quero poder adicionar produtos disponíveis para compra no meu sistema.
  Tarefas e responsáveis:
  #F08 [FE] Sistema de cadastramento de um produto, por um admin
  #B05 [BE] Rotas para CRUD de produtos: [Avelar]
  #B04 [BE] Rotas para CRUD de admin: [Avelar]
