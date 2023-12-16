// if id doesn't exist throw not-found
"use client";

import { useRouter } from "next/navigation";

import Dashboard from "../../../_layout/dashboard/Dashboard";
import UpdateBrand from "../../../_containers/dashboard/brand/UpdateBrand";
import UpdateCategory from "../../../_containers/dashboard/category/UpdateCategory";
import UpdateProduct from "../../../_containers/dashboard/product/UpdateProduct";
import UpdateStore from "../../../_containers/dashboard/store/UpdateStore";
import UpdateSubcategory from "../../../_containers/dashboard/subcategory/UpdateSubcategory";

export default function UpdatePages({params}) {
    const router = useRouter()
    if(params.id[0]){
        
        switch(params.url){
            case "update-brand":
            return <Dashboard><UpdateBrand url={params.url} id={params.id[0]} /></Dashboard> 
            case "update-category":
                return <Dashboard><UpdateCategory url={params.url} id={params.id[0]} /></Dashboard>
            case "update-product":
                return <Dashboard><UpdateProduct url={params.url} id={params.id[0]} /></Dashboard>
            case "update-store":
                return <Dashboard><UpdateStore url={params.url} id={params.id[0]} /></Dashboard>
            case "update-subcategory":
                return <Dashboard><UpdateSubcategory url={params.url} id={params.id[0]} /></Dashboard>
            default:
                return <h1>{params.url.split('update-')[1]} not fount</h1>
        }
    }
}