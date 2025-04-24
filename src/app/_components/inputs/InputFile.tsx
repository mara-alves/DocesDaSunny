import { Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";

export default function InputFile({
  file,
  setFile,
}: {
  file?: File;
  setFile: (file?: File) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFile = Array.from(droppedFiles)[0];
      setFile(newFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFile = Array.from(selectedFiles)[0];
      setFile(newFile);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (file) {
      readFileAsDataURL(file).then((url) => {
        setPreviewImage(url);
      });
    } else setPreviewImage(null);
  }, [file]);

  return (
    <div
      className={
        "relative flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden transition " +
        (isDragActive ? " bg-primary" : "bg-background hover:bg-primary")
      }
      onClick={() => ref.current?.click()}
      onDragEnter={() => setIsDragActive(true)}
      onDragExit={() => setIsDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="z-10 flex flex-col items-center gap-2">
        <Upload className="size-16 shrink-0" />
        <p className="text-center leading-5">
          Arrasta uma imagem
          <br></br>
          ou
          <span className="heading"> clica aqui </span>
          para selecionar
        </p>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {previewImage && (
        <div
          className="absolute top-5 right-5 z-10"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setFile();
          }}
        >
          <Trash />
        </div>
      )}
      {previewImage && (
        <img
          src={previewImage}
          alt="preview"
          className="absolute w-full opacity-25"
        />
      )}
    </div>
  );
}
