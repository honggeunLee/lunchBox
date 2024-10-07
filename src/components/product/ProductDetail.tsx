import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../../api/productAPI';
import LoadingComponent from '../LoadingComponent.tsx';
import useNavigateHelper from "../../hooks/useNavigateHelper.ts";
import { useProductState } from "../../hooks/useProductState.ts";

const ProductDetail = () => {
    const { pno } = useParams<{ pno: string }>();
    const { product, setProduct } = useProductState();
    const [loading, setLoading] = useState(true);
    const { moveToList, moveToEdit } = useNavigateHelper(Number(pno));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getDetail(Number(pno));
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [pno]);

    return (
        <div className="flex flex-col space-y-6 w-full bg-white shadow-lg p-8 rounded-lg my-10 mx-auto max-w-screen-lg">
            <h2 className="text-4xl font-bold text-center text-blue-500 mb-6">Product Details</h2>

            {loading && <LoadingComponent />}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 제품 번호 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">제품 번호</label>
                    <input
                        type="text"
                        name="pno"
                        value={product.pno || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 제품 이름 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">제품 이름</label>
                    <input
                        type="text"
                        name="pname"
                        value={product.pname || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 제품 설명 */}
                <div className="flex flex-col space-y-2 col-span-1 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                    <textarea
                        name="pdesc"
                        value={product.pdesc || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 제품 가격 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">가격</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price !== null && product.price !== undefined ? product.price : ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 제품 이미지 */}
                <div className="flex flex-col space-y-2 col-span-1 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">이미지</label>
                    {product.uploadFileNames && product.uploadFileNames.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {product.uploadFileNames.map((fileUrl, index) => (
                                <img
                                    key={index}
                                    src={fileUrl}
                                    alt={product.pname || '이미지'}
                                    className="w-48 h-48 object-cover rounded"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">등록된 이미지가 없습니다.</p>
                    )}
                </div>

                {/* 작성자 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">작성자</label>
                    <input
                        type="text"
                        name="writer"
                        value={product.writer || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 등록일 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">등록일</label>
                    <input
                        type="text"
                        name="regDate"
                        value={product.regDate || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>

                {/* 수정일 */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm font-semibold text-gray-700">수정일</label>
                    <input
                        type="text"
                        name="modDate"
                        value={product.modDate || ''}
                        readOnly
                        className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700 w-full"
                    />
                </div>
            </div>

            {/* 수정 및 목록으로 버튼 */}
            <div className="flex space-x-4 mt-6">
                <button
                    onClick={moveToEdit}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    수정/삭제
                </button>
                <button
                    onClick={moveToList}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                    목록으로
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
