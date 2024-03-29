import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let url = (process.env.NODE_ENV !== "development") ? process.env.NEXT_PUBLIC_TS_SERVER_URL : process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL;

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
    "Settings"
  ],
  endpoints: () => ({}),
});

export default apiSlice;
