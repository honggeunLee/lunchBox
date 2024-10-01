import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import RegisterPage from "../pages/product/RegisterPage.tsx";
import EditPage from "../pages/product/EditPage.tsx";
import {Navigate} from "react-router-dom";

const Loading = <LoadingPage/>
const ProductIndex = lazy(() => import("../pages/product/IndexPage"))
const ProductList = lazy(() => import("../pages/product/ListPage"))
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))

const productRouter = {
    path:'/product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductList/></Suspense>,
        },
        {
            path: "",
            element: <Navigate to='list' replace={true}></Navigate>
        },
        {
            path: "register",
            element: <Suspense fallback={Loading}><RegisterPage /></Suspense>,
        },
        {
            path: "detail/:pno",
            element: <Suspense fallback={Loading}><ProductDetail/></Suspense>
        },
        {
            path: "edit/:pno",
            element: <Suspense fallback={Loading}><EditPage /></Suspense>
        },
    ]
}

export default productRouter