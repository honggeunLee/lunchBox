import {IPageResponse} from "../types/product.ts";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductList} from "../api/productAPI.ts";

const initialState: IPageResponse = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 1,
        size: 10
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

    const [searchType, setSearchType] = useState(query.get("type") || "");
    const [keyword, setKeyword] = useState(query.get("keyword") || "");

    useEffect(() => {
        setLoading(true)
        getProductList(page, size).then(data => {
            setPageResponse(data)
            setLoading(false)
        })
    }, [query, location.key])

    // 검색 화면 추가
    const handleSearch = () => {
        query.set("type", searchType);
        query.set("keyword", keyword);
        setQuery(query);
    };

    // 조회 페이지 이동
    const moveToRead = (pno: number) => {
        navigate(`/product/detail/${pno}`);
    };


    return {loading, pageResponse, handleSearch, moveToRead,
        setSearchType, setKeyword, searchType, keyword}
}

export default useList;