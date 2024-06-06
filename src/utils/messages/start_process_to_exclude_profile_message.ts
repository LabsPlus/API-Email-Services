const StartProcessToExcludeProfileMessage = {

    startProcessToExcludeProfileMessage(name: String): string {

        if(name.includes(' '))
            name = name.split(' ')[0];

        return `
        <p>Olá, ${name} </br>
        Vinhemos informar que a solicitação de exclusão foi recebida, e que seu perfil será excluído em 30 dias,
        Para cancelar a exclusão, logue em sua conta e a ação de exclusão será retirada.
         </p>;`
    }
};

export { StartProcessToExcludeProfileMessage };