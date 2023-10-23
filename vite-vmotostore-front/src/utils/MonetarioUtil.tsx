


class FormatadorMonetario {

    static formatarValorMonetario(valor: any, prefixo: string) {
        if (valor !== null && valor !== undefined) {
            // Arredonde o valor para duas casas decimais
            valor = Math.round(parseFloat(valor) * 100) / 100;

            // Garanta que o valor tenha exatamente duas casas decimais
            valor = valor.toFixed(2);

            // Adicione o símbolo de moeda e separe as casas de milhar com vírgulas
            return `${prefixo} ${valor.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
        }
    }

    static stringToNumber(numero: string) {
        const numeroSemMilhares = numero.replace(/[,]/g, '.');
        // Verificar se o número é válido após remover milhares
        if (!isNaN(parseFloat(numeroSemMilhares))) {
            // Converter para número
            const numeroFormatado = parseFloat(numeroSemMilhares).toFixed(2);

            return numeroFormatado;
        } else {
            // Se não for um número válido após remover milhares, retornar o valor original
            return 0;
        }
    }

    //"R$ 13.231.123,29"
    static stringMonetariaToNumber(monetario: string) {
        let stringMonetaria = monetario.replace(/[^0-9,]/gm, "");
        stringMonetaria = stringMonetaria.replace(',', ".");
        const number = parseFloat(stringMonetaria);
        return isNaN(number) ? 0 : number;
    }

    static mascaraMoeda = (event: any) => {

        if (event != null && event != undefined && event != 0 && event != '') {

            let onlyDigits;

            if (isNaN(event)) {
                if (event.target != undefined && event.target.value != undefined) {
                    onlyDigits = event.target.value
                        .split("")
                        .filter((s: string) => /\d/.test(s))
                        .join("")
                        .padStart(3, "0");

            
                    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
                    return event.target.value = FormatadorMonetario.maskCurrency(digitsFloat);
                }
            } else {
                onlyDigits = event;
                return FormatadorMonetario.maskCurrency(onlyDigits);
            }



        } else {
            return "0";
        }
    }

    static maskCurrency = (valor: any, locale = 'pt-BR', currency = 'BRL') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(valor)
    }

}

export default FormatadorMonetario;