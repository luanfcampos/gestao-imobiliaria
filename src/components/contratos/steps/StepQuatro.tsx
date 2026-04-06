"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

interface UploadedFile {
  id: string;
  file: File;
  objectUrl: string;
  progress: number;
  status: "uploading" | "done";
}

export const StepQuatro = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      objectUrl: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  useEffect(() => {
    // Simulação de progresso para novos arquivos
    const newUploads = files.filter((f) => f.status === "uploading" && f.progress === 0);
    if (newUploads.length > 0) {
      newUploads.forEach((upload) => {
        const interval = setInterval(() => {
          setFiles((prevFiles) =>
            prevFiles.map((f) => {
              if (f.id === upload.id && f.progress < 100) {
                const newProgress = f.progress + 10;
                if (newProgress >= 100) {
                  clearInterval(interval);
                  return { ...f, progress: 100, status: "done" };
                }
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 200);
      });
    }

    // Cleanup object URLs
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.objectUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);


  const removeFile = (id: string) => {
    const fileToRemove = files.find((f) => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.objectUrl);
    }
    setFiles((prevFiles) => prevFiles.filter((f) => f.id !== id));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10" : "border-[var(--color-border)] hover:border-[var(--color-accent)]"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 mb-4 text-[var(--color-text-secondary)]" />
        <p className="text-lg font-semibold">Arraste e solte os documentos aqui</p>
        <p className="text-sm text-[var(--color-text-secondary)]">ou clique para selecionar os arquivos</p>
        <p className="text-xs text-[var(--color-text-secondary)] mt-2">PDF, DOCX, JPG, PNG</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Arquivos Adicionados</h3>
          {files.map((entry) => (
            <div key={entry.id} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]">
              {entry.file.type.startsWith("image/") ? (
                <Image src={entry.objectUrl} alt={entry.file.name} width={40} height={40} className="rounded-md h-10 w-10 object-cover" />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center bg-[var(--color-surface-raised)] rounded-md">
                  <FileText className="h-6 w-6 text-[var(--color-text-secondary)]" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{entry.file.name}</p>
                <div className="flex items-center gap-2">
                    <div className="w-full bg-[var(--color-surface-raised)] rounded-full h-1.5">
                        <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${entry.status === 'done' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-accent)]'}`}
                            style={{ width: `${entry.progress}%` }}
                        />
                    </div>
                    {entry.status === 'done' && <Badge variant="emerald" className="text-xs">✓ Enviado</Badge>}
                </div>
              </div>
              <button onClick={() => removeFile(entry.id)} className="p-1 rounded-full hover:bg-[var(--color-surface-raised)]">
                <X className="h-4 w-4 text-[var(--color-text-secondary)]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
