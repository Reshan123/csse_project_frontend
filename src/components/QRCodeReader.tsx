import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";


const QRCodeReader: React.FC = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    // 🖨 Print the "result" to browser console.
    console.log(result);
    // ✅ Handle success.
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner.current
        .start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    return () => {
      scanner.current?.stop();
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn) {
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
    }
  }, [qrOn]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* QR Video Element */}
      <video
        ref={videoEl}
        className="w-full h-full rounded-lg border border-gray-300"
      ></video>
      <div
        ref={qrBoxEl}
        className="absolute inset-0 flex items-center justify-center"
      >
        <img
          src={""}
          alt="Qr Frame"
          width={256}
          height={256}
          className="w-64 h-64"
        />
      </div>

      {/* Show Data Result if scan is success */}
      {scannedResult && (
        <p className="absolute top-0 left-0 z-50 text-white bg-black bg-opacity-50 p-2 rounded">
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QRCodeReader;
