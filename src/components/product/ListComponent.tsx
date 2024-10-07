
import {IProduct} from "../../types/product.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import PageComponent from "../PageComponent.tsx";
import useList from "../../hooks/useList.ts";
import {Link} from "react-router-dom";

function ListComponent() {

    const {loading, pageResponse, moveToRead,
        handleSearch, setKeyword, keyword} = useList()

    const listLI = pageResponse.dtoList.map((product: IProduct) => {

        const {pno, pname, pdesc, price, uploadFileNames} = product

        // 이미지 경로 생성
        const thumbnailUrl = uploadFileNames.length > 0
            ? `http://localhost:8091/api/products/view/s_${uploadFileNames[0]}`
            : null;

        return (
            <li key={pno}
                className="flex items-center space-x-4 p-4 border-b border-gray-200"
                onClick={() => moveToRead(pno)}
            >
                {thumbnailUrl && (
                    <img src={thumbnailUrl} alt={pname} className="w-24 h-24 object-cover rounded-md" />
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                        {pno}. {pname}
                    </h3>
                    <p className="text-sm text-gray-600">{pdesc}</p>
                    <p className="text-md font-medium text-gray-900">{price}원</p>
                </div>
            </li>
        )
    });

    return (
        <div className="container mx-auto py-6">

            {loading && <LoadingComponent/>}
            <div className="flex justify-end mb-6">
                <div className="flex space-x-4">
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="검색어 입력"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();  // 엔터 키를 누르면 handleSearch 호출
                            }
                        }}
                    />

                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        검색
                    </button>
                    <Link to="/product">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            초기화
                        </button>
                    </Link>
                </div>
            </div>

            <div className="text-xl font-bold mb-4">Product List</div>

            <ul className="divide-y divide-gray-200">
                {listLI}
            </ul>

            <div className="mt-6">
                <PageComponent pageResponse={pageResponse}/>
            </div>
        </div>
)
    ;
}

export default ListComponent;