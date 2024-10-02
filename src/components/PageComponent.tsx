import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import {IPageResponse} from "../types/product.ts";

interface Props {
    pageResponse: IPageResponse;
}

function PageComponent({ pageResponse }: Props): ReactElement {
    const current: number = pageResponse.pageRequestDTO.page;
    const tempLast: number = Math.ceil(current / 10.0) * 10;
    const startPage: number = tempLast - 9;
    const endPage: number = pageResponse.totalPage < tempLast ? pageResponse.totalPage : tempLast;

    const prev: boolean = pageResponse.prev;
    const next: boolean = pageResponse.next;
    const pageNums: number[] = pageResponse.pageNumList;

    const [query, setQuery] = useSearchParams();

    const changePage = (pageNum: number) => {
        query.set("page", String(pageNum));
        setQuery(query);
    };

    const lis = pageNums.map((num) => (
        <li
            className="px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            key={num}
            onClick={() => changePage(num)}
        >
            {num}
        </li>
    ));

    return (
        <div>
            <ul className="flex justify-center items-center space-x-2 mt-6">
                {prev && (
                    <li
                        className="px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        key={startPage - 1}
                        onClick={() => changePage(pageResponse.prevPage)}
                    >
                        Prev
                    </li>
                )}
                {lis}
                {next && (
                    <li
                        className="px-4 py-2 text-white bg-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        key={endPage + 1}
                        onClick={() => changePage(pageResponse.nextPage)}
                    >
                        Next
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PageComponent;