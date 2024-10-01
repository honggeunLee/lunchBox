import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import RegisterPage from "../pages/product/RegisterPage.tsx";
import EditPage from "../pages/product/EditPage.tsx";

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
        {
            path: "edit/:pno",
            element: <Suspense fallback={Loading}><EditPage /></Suspense>
        },
    ]
}

export default productRouter