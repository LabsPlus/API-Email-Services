const EmailChangeWithSuccessHtml = {
    message() {
        return `
        <!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alteração de Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message {
      font-size: 1.2em;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Alteração de Email</h1>
    <p class="message">O seu email foi alterado com sucesso!</p>
  </div>
</body>
</html>
        `;
    }
}

export { EmailChangeWithSuccessHtml };