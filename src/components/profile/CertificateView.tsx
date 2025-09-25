// src/components/profile/CertificateView.tsx

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Download, Printer } from "lucide-react";

type CertificateData = {
  id: string;
  courseName: string;
  userName: string;
  issueDate: string; // ISO string
  certificateUrl?: string; // optional: generated PDF/image from Supabase function
};

interface CertificateViewProps {
  certificate: CertificateData;
  onDownload?: (certificate: CertificateData) => void;
  onPrint?: (certificate: CertificateData) => void;
}

const CertificateView: React.FC<CertificateViewProps> = ({
  certificate,
  onDownload,
  onPrint,
}) => {
  const { courseName, userName, issueDate, certificateUrl } = certificate;

  return (
    <Card className="p-6 flex flex-col items-center gap-4 text-center">
      {/* Certificate heading */}
      <h2 className="text-xl font-bold">Certificate of Completion</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        This certifies that
      </p>

      {/* User name */}
      <h3 className="text-2xl font-semibold">{userName}</h3>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        has successfully completed the course
      </p>

      {/* Course name */}
      <h4 className="text-lg font-medium italic">“{courseName}”</h4>

      {/* Issue date */}
      <p className="text-xs text-gray-500 mt-2">
        Issued on {new Date(issueDate).toLocaleDateString()}
      </p>

      {/* Optional certificate preview (from Supabase) */}
      {certificateUrl && (
        <img
          src={certificateUrl}
          alt={`Certificate for ${courseName}`}
          className="mt-4 rounded-xl border shadow-md max-w-md"
        />
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <Button
          variant="primary"
          onClick={() =>
            onDownload
              ? onDownload(certificate)
              : certificateUrl && window.open(certificateUrl, "_blank")
          }
        >
          <Download className="w-4 h-4 mr-2" /> Download
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            onPrint
              ? onPrint(certificate)
              : window.print()
          }
        >
          <Printer className="w-4 h-4 mr-2" /> Print
        </Button>
      </div>
    </Card>
  );
};

export default CertificateView;
