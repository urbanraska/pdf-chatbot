"use client";

import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { uploadPDF } from "@/lib/api";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (selected: File) => {
    if (selected.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    try {
      await uploadPDF(file);
      alert("PDF uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + " KB";
    }
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl h-full flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Your Document</h2>
        <p className="text-sm text-white/70 mb-4">
          Upload a PDF and start asking questions
        </p>

        {/* Dropzone */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/30 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition">
          <UploadCloud className="text-white mb-3" size={32} />

          <p className="text-white font-medium">Click to upload</p>

          <p className="text-xs text-white/60 mt-1">
            or drag and drop PDF here
          </p>

          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
        </label>

        {/* File Preview */}
        {file && (
          <div className="mt-4 flex items-center gap-3 bg-white/10 p-3 rounded-lg">
            <FileText className="text-white" />
            <div className="text-sm text-white">
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-white/60">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`mt-6 w-full py-3 rounded-xl font-semibold cursor-pointer transition ${
          file
            ? "bg-white text-black hover:scale-105"
            : "bg-white/20 text-white/50 cursor-not-allowed"
        }`}
      >
        {loading
          ? "Uploading..."
          : file
            ? "Upload PDF"
            : "Upload PDF to Continue"}
      </button>
    </div>
  );
}
