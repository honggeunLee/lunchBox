import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../../api/productAPI.ts';
import { IProduct } from '../../types/product.ts';  // IProduct 타입 import
import LoadingComponent from '../LoadingComponent.tsx'; // 로딩 컴포넌트

const initialState: IProduct = {
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
    const [product, setProduct] = useState<IProduct>(initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(pno);
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

    if (loading) {
        return <LoadingComponent />;  // 로딩 컴포넌트 표시
    }


    return (
        <div className="flex flex-col space-y-6 w-96 mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Product Details</h2>
            {/* 제품 번호 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 번호</label>
                <input
                    type="text"
                    value={product.pno}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 이름 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 이름</label>
                <input
                    type="text"
                    value={product.pname}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 설명 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                <textarea
                    value={product.pdesc}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 가격 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">가격</label>
                <input
                    type="number"
                    value={product.price}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 제품 이미지 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">이미지</label>
                {product.uploadFileNames && product.uploadFileNames.length > 0 && (
                    <div className="flex space-x-4">
                        {product.uploadFileNames.map((fileName, index) => (
                            <img
                                key={index}
                                src={`http://localhost:8089/api/products/view/${fileName}`}  // 서버 경로와 파일 이름을 결합
                                alt={product.pname}
                                className="w-32 h-32 object-cover"
                            />
                        ))}
                    </div>
                )}
            </div>


            {/* 작성자 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">작성자</label>
                <input
                    type="text"
                    value={product.writer}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 등록일 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">등록일</label>
                <input
                    type="text"
                    value={product.regDate}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>

            {/* 수정일 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">수정일</label>
                <input
                    type="text"
                    value={product.modDate}
                    readOnly
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                />
            </div>
        </div>
    );
};

export default ProductDetail;
