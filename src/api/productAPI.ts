import axios from 'axios';
import {IProduct} from "../types/product.ts";

const host = 'http://localhost:8089/api/products';

export const getDetail = async (pno: number) : Promise<IProduct>  => {
    const res = await axios.get(`${host}/${pno}`);
    return res.data;
};
