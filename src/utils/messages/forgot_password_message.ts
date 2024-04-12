const ForgotPasswordMessage = {

    forgotPasswordMessage(link: String): string{
        return `
      <p>Prezado usuário,</br>
        Você recebeu este e-mail porque solicitou a recuperação de senha na aplicação Enviei.
        O link expira em 1 hora. Se não solicitou a recuperação, ignore este e-mail.
        </br> </br> <strong> Clique no link abaixo para redefinir sua senha </strong>
      </p>
      <center>
        <a href="${link}" style="display:inline-block;padding:10px 20px;background-color:#008000;color:#fff;text-decoration:none;border-radius:5px;">
          Recuperação de senha
        </a>
      </center>`;
    }
}

export { ForgotPasswordMessage };