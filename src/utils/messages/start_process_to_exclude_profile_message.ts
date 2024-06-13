const StartProcessToExcludeProfileMessage = {

    startProcessToExcludeProfileMessage(name: String): string {

        if (name.includes(' '))
            name = name.split(' ')[0];

        return `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; border-bottom: 1px solid #dddddd; padding-bottom: 20px; margin-bottom: 20px;">
            <h1 style="margin: 0; color: #333333;">Solicitação de Exclusão Recebida</h1>
        </div>
        <div style="text-align: center;">
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Olá, ${name}</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Viemos informar que a solicitação de exclusão do seu perfil foi recebida e que seu perfil será excluído em 30 dias.</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Para cancelar a exclusão, por favor, faça login em sua conta e a ação de exclusão será retirada.</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Se você tiver alguma dúvida ou precisar de mais informações, por favor, não hesite em nos contatar.</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Obrigado!</p>
            <p style="font-size: 16px; color: #555555; line-height: 1.5;">Equipe LabsPlus</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
            <p>&copy; 2024 LabsPlus. Todos os direitos reservados.</p>
        </div>
    </div>
</div>
`
    }
};

export { StartProcessToExcludeProfileMessage };