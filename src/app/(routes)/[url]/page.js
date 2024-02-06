"use client";
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation";
import Dashboard from "../../_layout/dashboard/Dashboard";

import Brand from "../../_containers/dashboard/brand/ListBrand";
import Category from "../../_containers/dashboard/category/ListCategory";
import Product from "../../_containers/dashboard/product/ListProduct";
import Store from "../../_containers/dashboard/store/ListStore";
import Subcategory from "../../_containers/dashboard/subcategory/ListSubcategory";
import User from "../../_containers/dashboard/ListUser";
import Settings from "../../_containers/dashboard/settings/listSettings"
import AddNewBrand from "../../_containers/dashboard/brand/AddNewBrand";
import AddNewCategory from "../../_containers/dashboard/category/AddNewCategory";
import AddNewProduct from "../../_containers/dashboard/product/AddNewProduct";
import AddNewStore from "../../_containers/dashboard/store/AddNewStore";
import AddNewSubcategory from "../../_containers/dashboard/subcategory/AddNewSubcategory";
import AddNewSettings from "../../_containers/dashboard/settings/AddNewSettings"
// import AddNewUser from "../../_containers/dashboard/AddNewUser";
import NotFound from "../../_containers/NotFound"


export default function AccountPages({params}) {
    // const { data: session } = useSession()

    // if(!session){
    //     redirect('/login')
    // }

    switch (params.url) {
        case "list-brand":
            return <Dashboard><Brand /></Dashboard> 
        case "list-category":
            return <Dashboard><Category /></Dashboard>
        case "list-product":
            return <Dashboard><Product /></Dashboard>
        case "list-store":
            return <Dashboard><Store /></Dashboard>
        case "list-subcategory":
            return <Dashboard><Subcategory /></Dashboard>
        case "list-user":
            return <Dashboard><User /></Dashboard>
        case "list-settings":
            return <Dashboard><Settings /></Dashboard>
    // case "add-new-user":
    //     return <Dashboard><AddNewUser /></Dashboard>
        case "add-new-brand":
            return <Dashboard><AddNewBrand /></Dashboard> 
        case "add-new-category":
            return <Dashboard><AddNewCategory /></Dashboard>
        case "add-new-product":
            return <Dashboard><AddNewProduct /></Dashboard>
        case "add-new-store":
            return <Dashboard><AddNewStore /></Dashboard>
        case "add-new-subcategory":
            return <Dashboard><AddNewSubcategory /></Dashboard>
        case "add-new-settings":
            return <Dashboard><AddNewSettings /></Dashboard>
        default:
            return <NotFound />
            // redirect("/not-found")
            // break;
    }
    
}

// 'use client'
// import { RootState } from "../redux/store";
// import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement, increamentByAmount } from "../redux/features/counter/counterSlice";
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation";

// import AccountPage from "@/app/assets/containers/AccountPage/AccountPage";

// export default function Account() {
    // const count = useSelector((state: RootState) => state.counter.value);
    // const dispatch = useDispatch();
//   const { data: session } = useSession()

//     if(!session){
//         redirect('/login')
//     }

//     return <AccountPage />
// }
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]"

// export default async (req: any, res: any ) => {
//     const session = await getServerSession(authOptions)

//     if(session){
//         res.send(
//             content: "this is a protected content. You can access i because you are signed in"
//         )
//     }else{
//         res.send(
//             content: "you must be logged in to view this content"
//         )
//     }
// }