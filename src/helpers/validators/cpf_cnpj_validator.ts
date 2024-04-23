export default class CpfCnpjValidator {

    public async isCpfCnpjValid(cpf_cnpj: string): Promise<boolean> {
        const numeroIdentificador = cpf_cnpj.replace(/[^\d]/g, '');

        if (numeroIdentificador.length < 11 || numeroIdentificador.length > 14) {
            return false;
        }

        if (numeroIdentificador.length === 11) {
            return this.isCpfValid(numeroIdentificador);
        } 

        if (numeroIdentificador.length === 14) {
            return this.isCnpjValid(numeroIdentificador);
        }

        return false;
    }

    private isCpfValid(cpf: string): boolean {
        let sum = 0;
        let rest;

        if (cpf === "00000000000") return false;

        for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;
        if (rest !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;
        if (rest !== parseInt(cpf.substring(10, 11))) return false;
        return true;
    }

    private isCnpjValid(cnpj: string): boolean {
        if (cnpj === "00000000000000") return false;

        if (cnpj.length !== 14) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1))) return false;
        return true;

    }

}