import React, { useRef, useEffect, useState } from "react";
import { Download } from "lucide-react";
import QRCode from "react-qr-code";

interface QRCodeGeneratorProps {
  userId: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ userId }) => {
  const qrCodeWrapperRef = useRef<HTMLDivElement>(null); // Ref for the QRCode container div
  const canvasRef = useRef<HTMLCanvasElement>(null); // Ref for Canvas
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(userId);
  }, [userId]);

  const downloadQRCode = () => {
    const svg = qrCodeWrapperRef.current?.querySelector("svg"); // Find the SVG within the wrapper div
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    // Convert the SVG to a canvas
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;

    img.onload = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Trigger download of the canvas as a PNG
        const image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.download = `qr-code-${userId || "empty"}.png`;
        link.href = image;
        link.click();
      }
    };
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
          QR Code Generator
        </div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
          User ID: {userId || "Not provided"}
        </h2>
        <div className="mt-4 flex justify-center bg-gray-100 p-4 rounded-lg">
          <div className="relative" ref={qrCodeWrapperRef}>
            {" "}
            {/* Wrapper for the QRCode */}
            <QRCode value={value} size={200} />
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadQRCode}
            disabled={!userId}
            className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="mr-2" size={20} />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
