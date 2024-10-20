import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { UserResponse } from "../../types/User";

interface DownloadPdfProps {
  data: UserResponse;
}

const DownloadPdf: React.FC<DownloadPdfProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255);
    doc.text(`User Information`, 105, 15, { align: "center" });

    // Add User Info in a Table with increased width for topics
    autoTable(doc, {
      head: [["Field", "Value"]],
      body: [
        ["Username", data.username],
        ["Email", data.email],
        ["Link", data.link || "N/A"],
      ],
      startY: 25,
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [66, 135, 245] },
      columnStyles: { 0: { cellWidth: 60 } }, // Increase width of the first column
    });

    // Load and add image
    if (data.link) {
      try {
        const img = await loadImageWithTimeout(data.link, 10000); // 10 seconds timeout
        const imgWidth = 180;
        const imgHeight = (img.height * imgWidth) / img.width;
        const imgFormat = getImageFormat(data.link);
        doc.addImage(
          img,
          imgFormat,
          15,
          (doc as any).lastAutoTable.finalY + 15,
          imgWidth,
          imgHeight
        );
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(
          "Medical Record Information",
          105,
          (doc as any).lastAutoTable.finalY + imgHeight + 30,
          { align: "center" }
        );
      } catch (error) {
        console.error("Error loading image:", error);
        doc.setTextColor(255, 0, 0);
        doc.text(
          "Error loading image",
          105,
          (doc as any).lastAutoTable.finalY + 20,
          {
            align: "center",
          }
        );
      }
    } else {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(
        "Medical Record Information",
        105,
        (doc as any).lastAutoTable.finalY + 30,
        { align: "center" }
      );
    }

    // Add Medical Record Info in a Table
    if (data.medicalrecord) {
      autoTable(doc, {
        head: [["Field", "Value"]],
        body: [
          ["Patient ID", data.medicalrecord.patientId],
          ["First Name", data.medicalrecord.firstName],
          ["Last Name", data.medicalrecord.lastName],
          ["Date of Birth", formatDate(data.medicalrecord.dateOfBirth)],
          ["Gender", data.medicalrecord.gender],
          ["Contact Number", data.medicalrecord.contactNumber],
          ["Address", data.medicalrecord.address],
          ["Allergies", data.medicalrecord.allergies.join(", ") || "None"],
          [
            "Ongoing Medications",
            data.medicalrecord.ongoingMedications.join(", ") || "None",
          ],
          ["Emergency Contact Name", data.medicalrecord.emergencyContactName],
          [
            "Emergency Contact Number",
            data.medicalrecord.emergencyContactNumber,
          ],
        ],
        startY: (doc as any).lastAutoTable.finalY + 40,
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [66, 135, 245] },
        columnStyles: { 0: { cellWidth: 60 } }, // Increase width of the first column
      });
    } else {
      doc.setTextColor(255, 0, 0);
      doc.text(
        "No medical record information available.",
        105,
        (doc as any).lastAutoTable.finalY + 40,
        { align: "center" }
      );
    }

    doc.save("medical_record.pdf");
    setIsLoading(false);
  };

  const loadImageWithTimeout = (
    src: string,
    timeout: number
  ): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";

      const timer = setTimeout(() => {
        reject(new Error("Image load timed out"));
      }, timeout);

      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };
      img.onerror = (e) => {
        clearTimeout(timer);
        reject(e);
      };
      img.src = src;
    });
  };

  const getImageFormat = (url: string): string => {
    const extension = url.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "png":
        return "PNG";
      case "jpg":
      case "jpeg":
        return "JPEG";
      case "gif":
        return "GIF";
      case "bmp":
        return "BMP";
      default:
        return "JPEG"; // Default to JPEG if unknown
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // This will format the date as YYYY-MM-DD
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={`inline-flex items-center justify-center rounded-md px-4 mt-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-500"
      }`}
    >
      {isLoading ? "Generating Report..." : "Download Report"}
    </button>
  );
};

export default DownloadPdf;
