import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let url = process.env.SERVER_APP_BASE_URL;
if(process.env.VERCEL_ENV) url = "https://" + process.env.VERCEL_URL;
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
