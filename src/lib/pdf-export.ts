import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function exportToPDF(elementId: string, filename: string = "unigrade-result"): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const canvasAspect = canvas.height / canvas.width;
    const pdfWidth = pageWidth - 20; // 10mm margin each side
    const pdfHeight = pdfWidth * canvasAspect;

    let yPosition = 10;

    // Header
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(79, 70, 229); // indigo
    pdf.text("UniGrade Pro", 10, yPosition + 6);

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 116, 139); // slate-500
    pdf.text(`Generated: ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}`, 10, yPosition + 12);

    yPosition += 20;

    // Content image
    if (pdfHeight + yPosition <= pageHeight) {
      pdf.addImage(imgData, "PNG", 10, yPosition, pdfWidth, pdfHeight);
    } else {
      // Multi-page
      const pagesNeeded = Math.ceil((pdfHeight + yPosition) / pageHeight);
      let remainingHeight = pdfHeight;
      let sourceY = 0;

      for (let page = 0; page < pagesNeeded; page++) {
        if (page > 0) {
          pdf.addPage();
          yPosition = 10;
        }
        const availableHeight = pageHeight - yPosition - 10;
        const sliceHeight = Math.min(availableHeight, remainingHeight);
        pdf.addImage(imgData, "PNG", 10, yPosition, pdfWidth, sliceHeight, undefined, "FAST", 0);
        sourceY += sliceHeight;
        remainingHeight -= sliceHeight;
      }
    }

    // Footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        `UniGrade Pro • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 5,
        { align: "center" }
      );
    }

    pdf.save(`${filename}-${Date.now()}.pdf`);
  } catch (error) {
    console.error("PDF export failed:", error);
    throw error;
  }
}
