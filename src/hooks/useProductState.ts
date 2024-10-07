import { useState } from "react";
import { IProduct } from "../types/product";

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
    uploadFileNames: []
};

export function useProductState() {
    const [product, setProduct] = useState<IProduct>({ ...initialState });
    return { product, setProduct };
}