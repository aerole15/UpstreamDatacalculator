async function generatePDF() {
    const pdfDoc = new window.jspdf.jsPDF();
    
    const width = pdfDoc.internal.pageSize.width;
    const height = pdfDoc.internal.pageSize.height;

    function drawText(text, x, y, color) {
        if (color) {
            pdfDoc.setTextColor(color[0], color[1], color[2]);
        }
        pdfDoc.text(text, x, y);
        pdfDoc.setTextColor(0, 0, 0); 
    }

    function addContentToPage(pageNumber) {
        switch (pageNumber) {
            case 1:
                drawText('Content for Page 1', 50, 80);
                break;
            case 2:
                drawText('Content for Page 2', 50, 80, [255, 0, 0]);
                break;
            case 3:
                drawText('Content for Page 3', 50, 80, [0, 0, 255]);
                break;
        }
    }

    for (let pageNumber = 1; pageNumber <= 3; pageNumber++) {
        pdfDoc.addPage();



        addContentToPage(pageNumber);
    }

    pdfDoc.save('output.pdf');
}
