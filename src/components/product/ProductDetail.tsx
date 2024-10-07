import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../../api/productAPI';
import { IProduct } from '../../types/product';
import LoadingComponent from '../LoadingComponent.tsx';

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

const ProductDetail = () => {
    const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 제품 번호 받기
    const [product, setProduct] = useState<IProduct>(initialProductState);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const queryString = window.location.search;  // `location.search` 대신 `window.location.search`

    const moveToList = (): void => {
        navigate({
            pathname: '/product/list',
            search: queryString,
        });
    };

    const moveToEdit = (): void => {
        pno && navigate({
            pathname: `/product/edit/${pno}`,
            search: queryString,
        });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getDetail(Number(pno));  // API 호출하여 제품 정보 가져오기
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            } finally {
                setLoading(false);  // 로딩 완료
            }
        };

        fetchProduct();
    }, [pno]);

    return (
        <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Product Details</h2>

            {loading && <LoadingComponent/>}
            {/* 제품 번호 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 번호</label>
                <input
                    type="text"
                    name="pno"
                    value={product.pno || ''}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
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
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 설명 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                <textarea
                    name="pdesc"
                    value={product.pdesc || ''}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
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
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 이미지 */}
            {product.uploadFileNames && product.uploadFileNames.length > 0 ? (
                <div className="flex space-x-4">
                    {product.uploadFileNames.map((fileName, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8089/api/products/view/${fileName}`}
                            alt={product.pname || '이미지'}
                            className="w-32 h-32 object-cover"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">등록된 이미지가 없습니다.</p>
            )}

            {/* 작성자 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">작성자</label>
                <input
                    type="text"
                    name="writer"
                    value={product.writer || ''}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
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
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
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
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 수정 및 목록으로 버튼 */}
            <div className="flex space-x-4 mt-4">
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
