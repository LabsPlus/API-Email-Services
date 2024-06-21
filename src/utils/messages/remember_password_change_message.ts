const RememberPasswordChangeMessage = {
    rememberPasswordChangeMessage(name: string): string {

        if (name.includes(' '))
            name = name.split(' ')[0];

        const frontEndLink = process.env.FRONT_END_URL || 'http://localhost:4200';

        return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; border-bottom: 1px solid #dddddd; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #333333;">Alteração de Senha Recomendada</h1>
        </div>
        <div style="text-align: left;">
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Olá, ${name} </p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Percebemos que sua senha atual está próxima de completar 60 dias desde a última alteração. Para garantir a segurança da sua conta, recomendamos que você altere sua senha o mais breve possível.</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Para alterar sua senha, clique no link abaixo:</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;"><a href="${frontEndLink}" style="color: #1a73e8; text-decoration: none;">Alterar Senha</a></p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Atenciosamente,<br>Equipe Enviei</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
            <p>&copy; 2024 LabsPlus. Todos os direitos reservados.</p>
        </div>
    </div>
</div>
        `;
    }
};

export { RememberPasswordChangeMessage };