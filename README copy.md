# Documentação da API

# Rotas
<details>
  <summary><strong>api/status</strong></summary>

  ### Status da API de Envio de E-mails

  A rota `/api/status` é utilizada para verificar o status operacional da API de envio de e-mails.

  **Operação:** `GET`

  **JSON Padrão:**
  Não há parâmetros necessários para esta rota.

  **Variações:**
  - Nenhuma variação específica para esta rota.

  **Response Esperado:**
  ```json
  {
    "status": "OK",
    "mensagem": "A API de envio de e-mails está operacional."
  }
