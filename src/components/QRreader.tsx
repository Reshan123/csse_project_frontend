import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import { PlusIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import { validateUser } from "../api/Register/ValidateApi";

const QrReader = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(false); // Start with QR scanner off
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const onScanSuccess = async (result: QrScanner.ScanResult) => {
    console.log(result);
    setScannedResult(result?.data);

    // Validate user ID before navigating
    if (result?.data) {
      try {
        const validationResponse = await validateUser(result.data);
        if (validationResponse.valid) {
          navigate(`staff/home/${result.data}`); 
        } else {
          alert("Invalid User ID. Please try again.");
        }
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "An error occurred during validation."
        );
      }
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  useEffect(() => {
    // Start the scanner if qrOn is true
    if (qrOn && videoEl.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl.current || undefined,
      });

      scanner.current.start().catch((err) => {
        console.error(err);
        setQrOn(false);
      });
    }

    // Cleanup the scanner on unmount or when qrOn is false
    return () => {
      if (scanner.current) {
        scanner.current.stop();
        scanner.current.destroy(); // Optional: Release resources
        scanner.current = undefined; // Reset scanner instance
      }
    };
  }, [qrOn]);

  const handleScanClick = () => {
    setQrOn(true);
  };

  const handleCancelClick = () => {
    setQrOn(false); // Stop the QR scanner
    if (scanner.current) {
      scanner.current.stop(); // Ensure scanner stops
    }
  };

  return (
    <div className="text-center">
      {!qrOn && ( // Render elements only if not in scan mode
        <>
          <div className="flex-shrink-0">
            <QrCodeIcon
              aria-hidden="true"
              className="h-25 w-25 text-gray-400"
            />
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Scan patient ID to view medical records
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleScanClick}
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
              Scan QR
            </button>
          </div>
        </>
      )}

      {/* Show the QR scanner when the button is clicked */}
      {qrOn && (
        <div className="qr-reader w-full h-80 mx-auto relative md:w-full rounded-md">
          <video
            ref={videoEl}
            className="w-full h-full object-cover rounded-md"
          ></video>
          <div ref={qrBoxEl} className="qr-box w-full left-0 !important">
            <img
              src={QrFrame}
              alt="Qr Frame"
              className="qr-frame absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          {scannedResult && (
            <p className="absolute top-0 left-0 z-50 text-white">
              Scanned Result: {scannedResult}
            </p>
          )}

          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancelClick}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default QrReader;
