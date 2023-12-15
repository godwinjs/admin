import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let url = process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL;
if(process.env.NODE_ENV === "production") url = process.env.TS_SERVER_URL;

console.log(url)
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: [
    "Photo",
    "User",
    "Brand",
    "Category",
    "Product",
    "Store",
    "Subcategory",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
