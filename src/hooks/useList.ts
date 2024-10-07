import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductList} from "../api/productAPI.ts";
import {IPageResponse} from "../types/product.ts";

const initialState: IPageResponse = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 1,
        size: 10,
        keyword: ""  // 검색어 초기값 추가
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1
};

const useList = () => {

    const [query, setQuery] = useSearchParams()
    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10
    const [loading, setLoading] = useState<boolean>(false)
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState)
    const location = useLocation()
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(query.get("keyword") || "");

    useEffect(() => {
        setLoading(true);
        // 검색 조건 포함하여 API 호출
        getProductList(page, size, keyword).then(data => {
            setPageResponse(data);
            setLoading(false);
        });
    }, [query, location.key]);

    // 검색 실행 함수
    const handleSearch = () => {
        query.set("keyword", keyword);
        setQuery(query);
    };

    // 조회 페이지 이동
    const moveToRead = (pno: number) => {
        const query = `page=${page}` + (keyword ? `&keyword=${keyword}` : "");
        navigate(`/product/detail/${pno}?${query}`);
    };

    return {loading, pageResponse, handleSearch,
        moveToRead, setKeyword, keyword}
}

export default useList;