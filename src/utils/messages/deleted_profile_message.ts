const DeletedProfileMessage = {

    deletedProfileMessage(name: string): string {

        if (name.includes(' '))
            name = name.split(' ')[0];

        return `
            <p>Olá, ${name} </br>
            Vinhemos informar que seu perfil foi excluído com sucesso, esperamos que tenha tido uma boa experiência conosco.
            </p>`;
    }
};

export { DeletedProfileMessage };