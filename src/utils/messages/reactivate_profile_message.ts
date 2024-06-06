const ReactivateProfileMessage = {

    reactivateProfileMessage(name: string ): string {

        if(name.includes(' '))
            name = name.split(' ')[0];

        return `
        <p>Olá, ${name} </br>
        Vinhemos informar que a solicitação de exclusão foi cancelada, e que seu perfil foi reativado.`;
    }
};

export  { ReactivateProfileMessage };