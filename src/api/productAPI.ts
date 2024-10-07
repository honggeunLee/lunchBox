import axios from 'axios';
import {IProduct} from "../types/product.ts";

const host = 'http://localhost:8091/api/products';

export const getDetail = async (pno: number) : Promise<IProduct>  => {
    const res = await axios.get(`${host}/${pno}`);

    return res.data;
};

export const postOne = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData);

    return Number(res.data.result);
};

export const putOne = async (product: IProduct, files: File[]): Promise<IProduct> => {
    const formData = new FormData();

    formData.append("pno", product.pno.toString());
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("keyword", product.keyword);
    formData.append("price", product.price.toString());
    formData.append("delFlag", product.delFlag.toString());

    files.forEach((file) => {
        formData.append("files", file);
    });

    const res = await axios.put(`${host}/${product.pno}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const deleteOne = async (pno: number): Promise<{
    RESULT: string;
    result: string }> => {
    const res = await axios.delete(`${host}/${pno}`);

    return res.data;
};

export const getProductList = async (
    page: number = 1,
    size: number = 10,
    keyword: string = ""
) => {
    // 검색 파라미터가 있을 때 URL 동적으로 생성
    const queryParams = `page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`;
    const res = await axios.get(`${host}/list?${queryParams}`);

    return res.data;
};
