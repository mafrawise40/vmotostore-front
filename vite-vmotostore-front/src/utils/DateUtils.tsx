class DateUtil {


    static getDataHoraFormatadaToString(pData: Date) {

        let data = new Date(pData);

        const dia = data.getDay().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        const segundos = data.getSeconds().toString().padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;

    }

}

export default DateUtil;