import React, { ChangeEvent } from "react";

interface ImageUploaderProps {
    maxImages: number;
    selectedFiles: File[];
    onFileChange: (files: File[]) => void;
    onRemoveFile: (index: number) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
                                                         maxImages,
                                                         selectedFiles,
                                                         onFileChange,
                                                         onRemoveFile,
                                                     }) => {
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        onFileChange(files);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
                id="file-upload"
                disabled={selectedFiles.length >= maxImages}
            />
            <label
                htmlFor="file-upload"
                className="flex items-center justify-center cursor-pointer w-full h-12 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-100 transition duration-200"
            >
                <span>사진을 추가하세요 (최대 {maxImages}개)</span>
            </label>
            <div className="grid grid-cols-2 gap-2 mt-4">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="relative">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-32 h-32 object-cover rounded"
                        />
                        <button
                            onClick={() => onRemoveFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded px-1 py-0.5"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploader;
