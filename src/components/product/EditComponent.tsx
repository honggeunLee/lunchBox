import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IProduct } from "../../types/product";
import { deleteOne, getDetail, putOne } from "../../api/productAPI";
import LoadingComponent from "../LoadingComponent";
import ResultModal from "../ResultModal";
import ImageUploader from "../ImageUploader";
import { useImageManager } from "../../hooks/useImageManager";
import { useProductState } from "../../hooks/useProductState";

const EditComponent = () => {
    const { pno } = useParams<{ pno: string }>();
    const navigate = useNavigate();
    const { product, setProduct } = useProductState();
    const { selectedFiles, handleImageChange, removeImage } = useImageManager({ maxImages: 4 });
    const [existingFiles, setExistingFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        if (pno) {
            setLoading(true);
            getDetail(Number(pno))
                .then((result: IProduct) => {
                    setProduct(result);
                    setExistingFiles(result.uploadFileNames); // 기존 파일 목록 설정
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                    setLoading(false);
                });
        }
    }, [pno, setProduct]);

    const handleClickDelete = () => {
        setLoading(true);
        deleteOne(Number(pno))
            .then((data) => {
                if (data.result === "success") {
                    setResult(`${pno} 삭제 되었습니다.`);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during deletion:", error);
                setLoading(false);
            });
    };

    const handleClickModify = () => {
        if (selectedFiles.length === 0 && existingFiles.length === 0) {
            alert("대표 이미지를 포함한 최소 한 장의 이미지를 업로드해야 합니다.");
            return;
        }

        setLoading(true);

        // 기존 파일은 서버에 그대로 두고, 새 파일만 전달
        putOne(product, selectedFiles)
            .then(() => {
                setResult(`${product.pno} 수정되었습니다.`);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during modification:", error);
                setLoading(false);
            });
    };

    const handleExistingFileRemove = (index: number) => {
        setExistingFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const closeCallback = () => {
        const msg: string = result;
        setResult("");
        if (msg.includes("수정되었습니다")) {
            navigate(`/product/detail/${pno}`);
        } else if (msg.includes("삭제 되었습니다")) {
            navigate("/product/list");
        }
    };

    return (
        <div className="flex flex-col space-y-6 max-w-screen-lg w-full mx-auto bg-white shadow-lg p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Product Edit</h2>
            {loading && <LoadingComponent />}
            {result && <ResultModal msg={result} callback={closeCallback} />}

            <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700">제품 이름</label>
                <input
                    type="text"
                    name="pname"
                    value={product.pname || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                <textarea
                    name="pdesc"
                    value={product.pdesc || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700">가격</label>
                <input
                    type="number"
                    name="price"
                    value={product.price || ""}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>

            <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700">기존 이미지</label>
                <div className="flex flex-wrap gap-4">
                    {existingFiles.map((file, index) => (
                        <div key={index} className="relative">
                            <img src={file} alt={`existing-${index}`} className="w-48 h-48 object-cover rounded-lg" />
                            <button
                                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded px-1 py-0.5"
                                onClick={() => handleExistingFileRemove(index)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ImageUploader
                maxImages={4 - existingFiles.length}
                selectedFiles={selectedFiles}
                onFileChange={handleImageChange}
                onRemoveFile={removeImage}
            />

            <button
                onClick={handleClickModify}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
                disabled={loading}
            >
                수정
            </button>
            <button
                onClick={handleClickDelete}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-200 mt-2"
                disabled={loading}
            >
                삭제
            </button>
        </div>
    );
};

export default EditComponent;
