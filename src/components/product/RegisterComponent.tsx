import { ChangeEvent, useRef, useState } from "react";
import { IProduct } from "../../types/product.ts";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister.ts";
import ResultModal from "../ResultModal.tsx";

const initialProductState: IProduct = {
    pno: 0,
    delFlag: false,
    pdesc: '',
    pname: '',
    price: 0,
    img: [],
    regDate: '',
    modDate: '',
    writer: '',
    uploadFileNames: []  // 추가된 필드
};

function RegisterComponent() {
    const [product, setProduct] = useState<IProduct>(initialProductState);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filesRef = useRef<HTMLInputElement>(null);
    const { isLoading, handleAddProduct } = useRegister();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(filesArray);
        }
    };

    const handleClick = () => {
        const files = filesRef.current?.files;
        const formData = new FormData();

        if (!files || files.length === 0) {
            setIsModalOpen(true);
            return;
        }

        if (files.length > 0) {
            formData.append('uploadFileNames', files[0].name);
        }

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", String(product.price));

        handleAddProduct(formData).then(() => {
            navigate("/product");
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">도시락 추가하기</h1>
            <div className="mb-4">
                <input
                    type="text"
                    name="pname"
                    placeholder="제품 이름"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    name="pdesc"
                    placeholder="제품 설명"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <input
                    type="number"
                    name="price"
                    placeholder="가격"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center cursor-pointer w-full h-12 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:bg-gray-100 transition duration-200"
                >
                    <span className="text-lg">눌러서 사진을 추가하세요</span>
                    <input
                        type="file"
                        ref={filesRef}
                        id="file-upload"
                        name="files"
                        multiple={true}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFilesChange}
                    />
                </label>
            </div>
            {selectedFiles.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">선택한 사진</h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded px-1 py-0.5 cursor-pointer">
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={handleClick}
                className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
            >
                {isLoading ? '추가 중...' : '추가'}
            </button>

            {isModalOpen && (
                <ResultModal
                    msg="이미지를 선택해야 합니다."
                    callback={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default RegisterComponent;
