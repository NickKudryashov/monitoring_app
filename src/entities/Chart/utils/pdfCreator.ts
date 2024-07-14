import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export const createPdfByChartId = async (chartId: string,lines:string[]=[]) => {
    return await ApexCharts.exec(chartId, "dataURI").then(
        ({ imgURI }: { imgURI: string }) => {
            const canvas = document.getElementById("chartCanvas");
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const docDefinition:TDocumentDefinitions = {
                pageOrientation:"landscape",
                content: [
                    {
                        image:imgURI,
                        
                    },
                    {
                        stack:[
                            ...lines,

                        ]

                    }
                ]
            };
            pdfMake.createPdf(docDefinition).download("chart.pdf");
        }
    );
};