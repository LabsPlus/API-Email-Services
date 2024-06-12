const UpdateEmailMessage = {
    updateEmailMessage(nome: string, link: string) {
        return `

        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; border-bottom: 1px solid #dddddd; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #333333;">Confirmação de Alteração de Email</h1>
        </div>
        <div style="text-align: center;">
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Olá, ${nome}</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Recebemos uma solicitação para alterar o seu endereço de email. Para confirmar essa alteração, clique no link abaixo:</p>
            <a href="${link}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirmar Alteração</a>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Se você não solicitou esta alteração, por favor ignore este email.</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Obrigado!</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Equipe LabsPlus</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
            <p>&copy; 2024 LabsPlus. Todos os direitos reservados.</p>
        </div>
    </div>
</div>
    `;
    }
};

export { UpdateEmailMessage };