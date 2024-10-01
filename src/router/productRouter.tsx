import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import RegisterPage from "../pages/product/RegisterPage.tsx";

const Loading = <LoadingPage/>
const ProductIndex = lazy(() => import("../pages/product/IndexPage"))
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))

const productRouter = {
    path:'/product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "register",
            element: <Suspense fallback={Loading}><RegisterPage /></Suspense>,
        },
        {
            path: "detail/:pno",
            element: <Suspense fallback={Loading}><ProductDetail/></Suspense>
        },
    ]
}

export default productRouter