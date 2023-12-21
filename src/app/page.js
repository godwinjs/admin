'use client'
// import { useDispatch, useSelector } from "react-redux";
// import { useSession } from "next-auth/react"
// import { redirect } from "next/navigation";

// import { setCredentials } from "@/app/redux/features/auth/authSlice";
// import { RootState } from "@/app/redux/store";
import Dashboard from "./_layout/dashboard/Dashboard";
import Analytics from "./_containers/dashboard/Analytics";

export default function Account() {
    // const { data: session } = useSession();
    // const user = useSelector((state: RootState) => state.auth.userInfo )


    // if(!session){
    //     redirect('/login')
    // }
    // if(user === null){
    //     return;
    // }

    return <Dashboard>
            <Analytics />
        </Dashboard>
}