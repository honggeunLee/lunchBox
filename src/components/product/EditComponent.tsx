import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetail, putOne, deleteOne } from "../../api/productAPI";
import { IProduct } from "../../types/product";
import LoadingComponent from "../LoadingComponent.tsx";
import ResultModal from "../ResultModal.tsx";

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
    uploadFileNames: [],
};

function EditComponent() {
    const { pno } = useParams();
    const [product, setProduct] = useState<IProduct>({ ...initialState });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string>('');
    const navigate = useNavigate();

    // 제품 데이터 로딩
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const productData = await getDetail(Number(pno));
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [pno]);

    const handleModify = async () => {
        setLoading(true);
        try {
            await putOne(product);
            setResult('제품이 수정되었습니다.');
            setTimeout(() => {
                navigate(`/product/detail/${pno}`);
            }, 600);
        } catch (error) {
            console.error("Error modifying product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteOne(Number(pno));
            setResult('제품이 삭제되었습니다.');
            setTimeout(() => {
                navigate('/product');
            }, 600);
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col space-y-4 w-96 mx-auto">
            {loading && <LoadingComponent />}
            {result && <ResultModal msg={result} callback={() => setResult('')} />}

            <label className="text-sm font-semibold text-gray-700">제품명</label>
            <input
                type="text"
                name="pname"
                className="border border-gray-300 rounded-lg p-3"
                value={product.pname}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">설명</label>
            <textarea
                name="pdesc"
                className="border border-gray-300 rounded-lg p-3"
                value={product.pdesc}
                onChange={handleChange}
            />

            <label className="text-sm font-semibold text-gray-700">가격</label>
            <input
                type="number"
                name="price"
                className="border border-gray-300 rounded-lg p-3"
                value={product.price}
                onChange={handleChange}
            />

            {/* 제품 이미지 표시 */}
            <label className="text-sm font-semibold text-gray-700">이미지</label>
            {product.uploadFileNames && product.uploadFileNames.length > 0 ? (
                <div className="flex space-x-4">
                    {product.uploadFileNames.map((fileName, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8089/api/products/view/${fileName}`}
                            alt={product.pname}
                            className="w-32 h-32 object-cover"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">등록된 이미지가 없습니다.</p>
            )}

            <div className="flex justify-center gap-2">
                <button onClick={handleModify} className="bg-blue-500 text-white">수정</button>
                <button onClick={handleDelete} className="bg-red-500 text-white">삭제</button>
            </div>
        </div>
    );
}

export default EditComponent;
