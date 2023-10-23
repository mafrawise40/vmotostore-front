class DateUtil {


    static getDataHoraFormatadaToString(pData: Date) {
        let data = new Date(pData);
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`

    }

    /**
     * 06/10/2023 está vindo 05/10/2023 21:30
     * 
     * @param pData 
     * @returns 
     */
    static getStringDataToString(pData: any) {
        let data = new Date(pData);
        data.setMinutes(data.getTimezoneOffset());
        return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} `;

    }

}

export default DateUtil;