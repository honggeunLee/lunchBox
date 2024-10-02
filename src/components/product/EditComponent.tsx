import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { IProduct } from "../../types/product.ts";
import { deleteOne, getDetail, putOne } from "../../api/productAPI.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import ResultModal from "../ResultModal.tsx";

// 초기 상태 설정
const initialState: IProduct = {
    pno: 0,
    delFlag: false,
    pdesc: "",
    pname: "",
    price: 0,
    img: [],
    regDate: "",
    modDate: "",
    writer: "",
    uploadFileNames: [],
};

function EditComponent() {
    const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 제품 번호 받아옴
    const [product, setProduct] = useState<IProduct>(initialState); // 제품 상태 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [result, setResult] = useState<string>(""); // 결과 메시지
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 새로 선택된 파일 저장
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const queryString = window.location.search;

    // 목록으로 이동
    const moveToList = (): void => {
        navigate({
            pathname: "/product/list",
            search: queryString,
        });
    };

    const moveToDetail = (): void => {
        navigate({
            pathname: `/product/detail/${pno}`,
            search: queryString,
        });
    };

    // 제품 상세 정보 가져오기
    useEffect(() => {
        const pnoNum = Number(pno);
        setLoading(true);
        getDetail(pnoNum)
            .then((result) => {
                setProduct(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [pno]);

    // 제품 삭제 핸들러
    const handleClickDelete = () => {
        setLoading(true);
        deleteOne(Number(pno))
            .then((data) => {
                console.log("Delete Response:", data); // 서버 응답 데이터를 확인

                // 서버 응답 데이터에 맞는 조건을 설정 (대문자 "SUCCESS"로 비교)
                if (data.RESULT === "SUCCESS") {
                    setResult(`${pno} 삭제 되었습니다.`);
                } else {
                    setResult("삭제 중 오류가 발생했습니다.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during deletion:", error);
                setResult("삭제 중 오류가 발생했습니다.");
                setLoading(false);
            });
    };

    // 모달 닫기 콜백
    const closeCallback = () => {
        const msg: string = result;

        setResult(""); // 모달 결과 초기화

        if (msg.includes("수정되었습니다")) {
            moveToDetail(); // 수정 완료 후 상세 페이지로 이동
        } else if (msg.includes("삭제 되었습니다")) {
            moveToList(); // 삭제 후 목록으로 이동
        }
    };

    // 제품 수정 핸들러
    const handleClickModify = () => {

        if (selectedFiles.length === 0) {
            setIsModalOpen(true); // 이미지가 선택되지 않았을 때 모달 띄우기
            return;
        }

        setLoading(true);

        // 파일과 함께 제품 정보 전송
        putOne(product, selectedFiles)
            .then((modifyResult) => {
                setResult(`${pno} 수정되었습니다.`);
                setProduct(modifyResult); // 수정된 제품 정보를 상태에 반영
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during modification:", error);
                setLoading(false);
            });
    };

    // 입력 필드 변경 핸들러 (제품명, 설명, 가격 등)
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    // 파일 선택 핸들러
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files)); // 새로운 파일 상태에 저장
        }
    };

    return (
        <div className="flex flex-col space-y-6 w-96 mx-auto bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">Product Edit</h2>
            {loading && <LoadingComponent />}
            {result && <ResultModal msg={result} callback={closeCallback} />}

            {/* 제품 번호 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 번호</label>
                <input
                    type="text"
                    name="pno"
                    value={product.pno || ""}
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
                    value={product.pname || ""}
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                    onChange={handleChange}
                />
            </div>

            {/* 제품 설명 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                <textarea
                    name="pdesc"
                    value={product.pdesc || ""}
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                    onChange={handleChange}
                />
            </div>

            {/* 제품 가격 */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-gray-700">가격</label>
                <input
                    type="number"
                    name="price"
                    value={product.price !== null && product.price !== undefined ? product.price : ""}
                    className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                    onChange={handleChange}
                />
            </div>

            {/* 이미지 업로드 */}
            <label className="text-sm font-semibold text-gray-700">이미지 업로드</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="border border-gray-300 rounded-lg p-3"
            />

            {/* 기존 이미지 및 선택된 이미지 표시 */}
            {selectedFiles.length > 0 && (
                <div className="flex space-x-4">
                    {selectedFiles.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt="선택된 이미지" className="w-32 h-32 object-cover" />
                    ))}
                </div>
            )}

            {/* 수정 및 삭제 버튼 */}
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={handleClickModify}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    수정
                </button>
                <button
                    onClick={moveToList}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                    목록으로
                </button>
                <button
                    onClick={handleClickDelete}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                >
                    삭제
                </button>
            </div>

            {isModalOpen && (
                <ResultModal
                    msg="이미지를 선택해야 합니다."
                    callback={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default EditComponent;
