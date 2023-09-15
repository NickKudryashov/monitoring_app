import $api, { API_URL } from "shared/api";

export const downloadXLSFile = async (id:number) => {
    const response = await $api.post<{result:boolean}>(`electro_report/${id}`);
    if (!response.data.result) {
        alert("Ошибка при формировании отчета");
    }
    fetch(`${API_URL}electro_report/${id}`,{method:"PUT",headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")}}).then(
        response => {
            response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                console.log(url);
                a.href = url;
                a.download = `ID_${id}__отчет.xlsx`;
                a.click();
                a.remove();
            });
        });
};