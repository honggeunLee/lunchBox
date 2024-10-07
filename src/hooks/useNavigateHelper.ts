import {useLocation, useNavigate} from "react-router-dom";

const useNavigateHelper = (pno:number) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryString = location.search;

    const moveToList = (): void => {
        navigate({
            pathname: "/product/list",
            search: queryString,
        });
    };

    //
    const moveToDetail = (): void => {
        pno && navigate({
            pathname: `/product/detail/${pno}`,
            search: queryString,
        });
    };

    //수정 페이지 이동
    const moveToEdit = (): void => {
        pno && navigate({
            pathname: `/product/edit/${pno}`,
            search: queryString,
        });
    };



    return { moveToList, moveToDetail, moveToEdit };
}
export default useNavigateHelper;