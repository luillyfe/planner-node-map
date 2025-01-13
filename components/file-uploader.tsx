"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, HTMLMotionProps } from "framer-motion";
import { Upload, CheckCircle } from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
        setIsUploaded(true);
        setTimeout(() => setIsUploaded(false), 3000);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/json": [".json"] },
    multiple: false,
  });

  return (
    <div className="w-40">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`border-2 border-dashed rounded-lg p-2 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        {...(getRootProps() as HTMLMotionProps<"div">)}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isUploaded ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isUploaded ? (
            <CheckCircle className="mx-auto text-green-500" size={24} />
          ) : (
            <Upload className="mx-auto text-gray-400" size={24} />
          )}
        </motion.div>
        <p className="text-xs font-semibold mt-1">
          {isUploaded ? "Uploaded!" : "Upload JSON"}
        </p>
      </motion.div>
    </div>
  );
};
