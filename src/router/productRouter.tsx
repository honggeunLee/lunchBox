import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage/>
const ProductIndex = lazy(() => import("../pages/product/IndexPage"))
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))

const productRouter = {
    path:'/product',
    element: <Suspense fallback={Loading}><ProductIndex/></Suspense>,
    children: [
        {
            path: "detail/:pno",
            element: <Suspense fallback={Loading}><ProductDetail/></Suspense>
        },
    ]
}

export default productRouter