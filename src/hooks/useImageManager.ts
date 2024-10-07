import { useState } from 'react';

interface UseImageManagerProps {
    maxImages?: number;
}

export const useImageManager = ({ maxImages = 4 }: UseImageManagerProps = {}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleImageChange = (files: File[]) => {
        // 새로 추가할 이미지들과 기존 선택된 이미지를 합쳐서 제한을 넘지 않도록 관리
        setSelectedFiles((prevFiles) => {
            const totalImages = prevFiles.length + files.length;
            return totalImages > maxImages
                ? [...prevFiles, ...files].slice(0, maxImages)
                : [...prevFiles, ...files];
        });
    };

    const removeImage = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const resetImages = () => {
        setSelectedFiles([]);
    };

    return {
        selectedFiles,
        setSelectedFiles,
        handleImageChange,
        removeImage,
        resetImages,
    };
};
