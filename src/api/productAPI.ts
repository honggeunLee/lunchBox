import axios from 'axios';
import {IProduct} from "../types/product.ts";

const host = 'http://localhost:8089/api/products';

export const getDetail = async (pno: number) : Promise<IProduct>  => {
    const res = await axios.get(`${host}/${pno}`);

    return res.data;
};

export const postOne = async (formData: FormData): Promise<number> => {
    const res = await axios.post(`${host}/`, formData);

    return Number(res.data.result);
};

export const putOne = async (product: IProduct): Promise<IProduct> => {
    const res = await axios.put(`${host}/${product.pno}`, product);

    return res.data;
};

export const deleteOne = async (pno: number): Promise<{ result: string }> => {
    const res = await axios.delete(`${host}/${pno}`);

    return res.data;
};

export const getProductList = async (page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}