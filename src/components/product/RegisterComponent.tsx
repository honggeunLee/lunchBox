import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import { useProductState } from "../../hooks/useProductState";
import { useImageManager } from "../../hooks/useImageManager";
import ImageUploader from "../ImageUploader";

const RegisterComponent = () => {
    const { product, setProduct } = useProductState();
    const { selectedFiles, handleImageChange, removeImage } = useImageManager({ maxImages: 4 });
    const { isLoading, handleAddProduct } = useRegister();
    const navigate = useNavigate();

    // 입력 필드 변경 핸들러
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    // 제품 등록 핸들러
    const handleClick = () => {
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", String(product.price));

        handleAddProduct(formData).then(() => {
            navigate("/product");
        });
    };

    return (
        <div className="w-full max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg my-10">
            <h1 className="text-3xl font-bold text-center mb-8">도시락 추가하기</h1>

            {/* 제품 이름 입력 */}
            <div className="mb-6">
                <input
                    type="text"
                    name="pname"
                    placeholder="제품 이름"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>

            {/* 제품 설명 입력 */}
            <div className="mb-6">
                <input
                    type="text"
                    name="pdesc"
                    placeholder="제품 설명"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>

            {/* 가격 입력 */}
            <div className="mb-6">
                <input
                    type="number"
                    name="price"
                    placeholder="가격"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    onChange={handleChange}
                />
            </div>

            {/* 이미지 업로드 컴포넌트 */}
            <div className="mb-6">
                <ImageUploader
                    maxImages={4}
                    selectedFiles={selectedFiles}
                    onFileChange={(files) => handleImageChange(files)}
                    onRemoveFile={removeImage}
                />
            </div>

            {/* 추가 버튼 */}
            <button
                onClick={handleClick}
                className={`w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? '추가 중...' : '추가'}
            </button>
        </div>
    );
};

export default RegisterComponent;
