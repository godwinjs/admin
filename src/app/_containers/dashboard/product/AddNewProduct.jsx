import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../../../redux/features/product/productApi";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  useUploadGalleryMutation,
  useUploadPhotoMutation,
} from "../../../../redux/features/upload/uploadApi";
import { useDisplaySubcategoriesQuery } from "../../../../redux/features/subcategory/subcategoryApi";
import { useDisplayCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import { useDisplayBrandsQuery } from "../../../../redux/features/brand/brandApi";
import { useDisplayStoresQuery } from "../../../../redux/features/store/storeApi";

import DashboardLoading from "../../../_components/loading/DashboardLoading"

const AddNewProduct = () => {
  const router = useRouter();
  // react hook form credentials
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // server side credentials
  const [createProduct, { isLoading: productCreating }] =
    useCreateProductMutation();
  const [uploadProductThumbnail, { isLoading: thumbnailUploading }] =
    useUploadPhotoMutation();
  const [uploadGallery, { isLoading: galleryUploading }] =
    useUploadGalleryMutation();
  const { data: subcategoriesData, isLoading: displayingSubcategories } =
    useDisplaySubcategoriesQuery({ page: 0, limit: 0 });
    const { data: categoriesData, isLoading: displayingCategories } =
    useDisplayCategoriesQuery({ page: 0, limit: 0 });
  const { data: brandsData, isLoading: displayingBrands } =
    useDisplayBrandsQuery({ page: 0, limit: 0 });
  const { data: storeData, isLoading: displayingStores } =
    useDisplayStoresQuery({ page: 0, limit: 0 });

  const subcategories = subcategoriesData?.data || [];
  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];
  const stores = storeData?.data || [];

  // upload credentials from state
  const { photo, gallery } = useSelector((state) => state.upload);
  const [tags, setTags] = useState([]);
  const [allOfSizes, setAllOfSizes] = useState([]);
  const [ isReload, setIsReload ] = useState(false);
  useEffect(() => {
    if(isReload){
      window.location.reload();
    }
  }, [isReload])


  const remove = (type, selectedTag) => {
    switch(type) {
      case 'tags':
        setTags(tags.filter((tag) => tag !== selectedTag));
        break;
      case 'sizes':
        setAllOfSizes(allOfSizes.filter((size) => size !== selectedTag));
    }
  }
  
  // submit add product form
  const handleAddProductForm = (data) => {
    data.tags = tags;
    data.thumbnail = photo;
    data.gallery = gallery;
    data.allOfSizes = allOfSizes;
    // console.log(data)
    createProduct(data);
    reset();
    toast.success(`${data.title} Product Added`);
    
    //still handle when there's an error
    setTimeout( () => setIsReload(true), 2000);
  };

  return ( 
          <>
          { isReload ? ( <DashboardLoading /> ) : ( <section className="grid grid-cols-12 gap-8">
      {/* product form md:col-span-7  */}
      <form
        className="col-span-12"
        onSubmit={handleSubmit(handleAddProductForm)}
      >
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* product title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.title ? (
                  <span className="text-red-500 font-medium">
                    Product title field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product title{" "}
                    <span className="hover:text-gray-500">{"<="} 100</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your product title"
                  {...register("title", { required: true, maxLength: 100 })}
                  className={`w-full form-input rounded-md bg-gray-200 p-2 ${
                    watch("title")?.length > 100 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
            {/* product status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.title ? (
                  <span className="text-red-500 font-medium">
                    Product status field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product status{" "}
                    <span className="hover:text-gray-500">{"<="} 100</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="status"
                  name="status"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your product status or promo information"
                  {...register("status", { required: false, maxLength: 100 })}
                  className={`w-full form-input rounded-md bg-gray-200 p-2 ${
                    watch("status")?.length > 100 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            {/* product details */}
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.details ? (
                  <span className="text-red-500 font-medium">
                    Product details field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product Details{" "}
                    <span className="hover:text-gray-500">{"<="} 50000</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <textarea
                  id="details"
                  name="details"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your product details"
                  {...register("details", {
                    required: true,
                    maxLength: 50000,
                  })}
                  className={`w-full form-textarea rounded-md bg-gray-200 p-2 ${
                    watch("details")?.length > 50000 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                  rows="8"
                />
              </div>
            </div>

            {/* product description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.description ? (
                  <span className="text-red-500 font-medium">
                    Product description field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product description{" "}
                    <span className="hover:text-gray-500">{"<="} 20000</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your product description"
                  {...register("description", {
                    required: true,
                    maxLength: 20000,
                  })}
                  className={`w-full form-textarea rounded-md bg-gray-200 p-2 ${
                    watch("description")?.length > 20000 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                  rows="8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* product price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.price ? (
                  <span className="text-red-500 font-medium">
                    Product price field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product price{" "}
                    <span className="hover:text-gray-500">{">="} 0.00</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="price"
                  name="price"
                  type="number"
                  autoComplete="off"
                  placeholder="Enter your product price"
                  {...register("price", { required: true, maxLength: 100 })}
                  className={`w-full form-input rounded-md bg-gray-200 p-2`}
                />
              </div>
            </div>

            {/* product tags */}
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.tags ? (
                  <span className="text-red-500 font-medium">
                    Product tags field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product tags{" "}
                    <span className="hover:text-gray-500">{"<="} upto 5</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1 w-full border rounded-md border-black px-3 py-1 flex items-center flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    id="badge-dismiss-dark"
                    className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-200 rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
                      data-dismiss-target="#badge-dismiss-dark"
                      aria-label="Remove"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => remove('tags',tag)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                ))}
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  autoComplete="off"
                  placeholder="Separate by , or ⎵"
                  {...register("tags", { required: false })}
                  className={`w-full border-transparent focus:border-transparent focus:ring-transparent rounded-md bg-gray-200 p-2`}
                  onKeyUp={(event) => {
                    if (event.which === 188 || event.which === 32) {
                      const tagValue = event.target.value.replace(",", "");
                      setTags([...tags, tagValue]);
                      event.target.value = "";
                    }
                  }}
                  readOnly={tags?.length >= 5}
                />
              </div>
            </div>
            {/* product sizes */}
            <div>
              <label
                htmlFor="allOfSizes"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.allOfSizes ? (
                  <span className="text-red-500 font-medium">
                    Product sizes field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Product Sizes{" "}
                    <span className="hover:text-gray-500">{"<="} upto 10</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1 w-full border rounded-md border-black px-3 py-1 flex items-center flex-wrap gap-2">
                {allOfSizes?.map((size, index) => (
                  <span
                    key={index}
                    id="badge-dismiss-dark"
                    className="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-gray-800 bg-gray-200 rounded"
                  >
                    {size}
                    <button
                      type="button"
                      className="inline-flex items-center p-0.5 ml-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900"
                      data-dismiss-target="#badge-dismiss-dark"
                      aria-label="Remove"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => remove('sizes', size)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Remove badge</span>
                    </button>
                  </span>
                ))}
                <input
                  id="allOfSizes"
                  name="allOfSizes"
                  type="text"
                  autoComplete="off"
                  placeholder="Separate by , or ⎵"
                  {...register("allOfSizes", { required: false })}
                  className={`w-full border-transparent focus:border-transparent focus:ring-transparent rounded-md bg-gray-200 p-2`}
                  onKeyUp={(event) => {
                    console.log(event.key === " ")
                    if (event.key === " " || event.which === 32) { //event.which is depreciated
                      const sizesValue = event.target.value.replace(",", "");
                      setAllOfSizes([...allOfSizes, sizesValue]);
                      event.target.value = "";
                    }
                  }}
                  readOnly={allOfSizes?.length >= 10}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.category ? (
                  <span className="text-red-500 font-medium">
                    category field is required!
                  </span>
                ) : displayingCategories ? (
                  <span className="flex">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Category fetching
                  </span>
                ) : (
                  "Category"
                )}
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  {...register("category", { required: true })}
                  className="w-full form-select rounded-md bg-gray-200 p-2"
                >
                  {categories.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* subcategory */}
            <div>
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.subcategory ? (
                  <span className="text-red-500 font-medium">
                    subcategory field is required!
                  </span>
                ) : displayingSubcategories ? (
                  <span className="flex">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Category fetching
                  </span>
                ) : (
                  "Subcategory"
                )}
              </label>
              <div className="mt-1">
                <select
                  id="subcategory"
                  name="subcategory"
                  {...register("subcategory", { required: true })}
                  className="w-full form-select rounded-md bg-gray-200 p-2"
                >
                  {subcategories.map((subcategory) => (
                    <option key={subcategory?._id} value={subcategory?._id}>
                      {subcategory?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* brand */}
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.brand ? (
                  <span className="text-red-500 font-medium">
                    brand field is required!
                  </span>
                ) : displayingBrands ? (
                  <span className="flex">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Brand fetching
                  </span>
                ) : (
                  "Brand"
                )}
              </label>
              <div className="mt-1">
                <select
                  id="brand"
                  name="brand"
                  {...register("brand", { required: true })}
                  className="w-full form-select rounded-md bg-gray-200 p-2"
                >
                  {brands.map((brand) => (
                    <option key={brand?._id} value={brand?._id}>
                      {brand?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* store */}
            <div>
              <label
                htmlFor="store"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.store ? (
                  <span className="text-red-500 font-medium">
                    store field is required!
                  </span>
                ) : displayingStores ? (
                  <span className="flex">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    Store fetching
                  </span>
                ) : (
                  "Store"
                )}
              </label>
              <div className="mt-1">
                <select
                  id="store"
                  name="store"
                  {...register("store", { required: true })}
                  className="w-full form-select rounded-md bg-gray-200 p-2"
                >
                  {stores.map((store) => (
                    <option key={store?._id} value={store?._id}>
                      {store?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* product thumbnail & gallery */}
          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* product thumbnail */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.thumbnail ? (
                  <span className="text-red-500 font-medium">
                    Product thumbnail field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    {thumbnailUploading ? (
                      <span className="flex">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Thumbnail uploading
                      </span>
                    ) : !Object.keys(photo).length ? (
                      "Product thumbnail (765x850)"
                    ) : (
                      <span className="flex">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Thumbnail uploaded
                      </span>
                    )}
                    <span className="hover:text-gray-500">{"<="} 1MB</span>
                  </span>
                )}
              </label>
              <div className="mt-1">
                <div className="flex items-center gap-x-4">
                  {Object.keys(photo).length ? (
                    <input
                      type="text"
                      className="form-input rounded-md w-full bg-gray-200 p-2"
                      defaultValue="Thumbnail uploaded!"
                      readOnly
                    />
                  ) : (
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg, .webp"
                      autoComplete="off"
                      placeholder="Enter your product thumbnail"
                      {...register("thumbnail", {
                        required: true,
                      })}
                      className={`w-full form-input rounded-md bg-gray-200 p-2`}
                      onChange={(event) => {
                        const formData = new FormData();
                        formData.append("thumbnail", event.target.files[0]);
                        uploadProductThumbnail({
                          route: "product/thumbnail",
                          photo: formData,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* product gallery */}
            <div>
              <label
                htmlFor="gallery"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.gallery ? (
                  <span className="text-red-500 font-medium">
                    Product gallery field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    {galleryUploading ? (
                      <span className="flex">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Gallery uploading
                      </span>
                    ) : !Object.keys(gallery).length ? (
                      "Product gallery (765x850)"
                    ) : (
                      <span className="flex">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Gallery uploaded
                      </span>
                    )}
                    <span className="hover:text-gray-500">
                      {"<="} 1MB & upto 5
                    </span>
                  </span>
                )}
              </label>
              <div className="mt-1">
                {Object.keys(gallery).length ? (
                  <input
                    type="text"
                    className="form-input rounded-md w-full bg-gray-200 p-2"
                    defaultValue="Gallery uploaded!"
                    readOnly
                  />
                ) : (
                  <input
                    id="gallery"
                    name="gallery"
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg, .webp"
                    autoComplete="off"
                    placeholder="Enter your product gallery"
                    {...register("gallery", { required: true })}
                    className={`w-full form-input rounded-md bg-gray-200 p-2`}
                    onChange={(event) => {
                      const formData = new FormData();
                      for (let i = 0; i < event.target.files.length; i++) {
                        formData.append("gallery", event.target.files[i]);
                      }
                      uploadGallery(formData);
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* product variants
          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* product variantThumbnail 
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.thumbnail ? (
                  <span className="text-red-500 font-medium">
                    Product thumbnail field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    {thumbnailUploading ? (
                      <span className="flex">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Thumbnail uploading
                      </span>
                    ) : !Object.keys(photo).length ? (
                      "Product thumbnail (765x850)"
                    ) : (
                      <span className="flex">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Thumbnail uploaded
                      </span>
                    )}
                    <span className="hover:text-gray-500">{"<="} 1MB</span>
                  </span>
                )}
              </label>
              <div className="mt-1">
                <div className="flex items-center gap-x-4">
                  {Object.keys(photo).length ? (
                    <input
                      type="text"
                      className="form-input rounded-md w-full"
                      value="Thumbnail uploaded!"
                      readOnly
                    />
                  ) : (
                    <input
                      id="thumbnail"
                      name="thumbnail"
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg, .webp"
                      autoComplete="off"
                      placeholder="Enter your product thumbnail"
                      {...register("thumbnail", {
                        required: true,
                      })}
                      className={`w-full form-input rounded-md`}
                      onChange={(event) => {
                        const formData = new FormData();
                        formData.append("thumbnail", event.target.files[0]);
                        uploadProductThumbnail({
                          route: "product/thumbnail",
                          photo: formData,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div> */}

          {/* form submit button */}
          <div className="text-center">
            {productCreating ? (
              <button type="submit" className="w-[30%] p-4 bg-green-500 text-xl" disabled>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Creating Product...
              </button>
            ) : (
              <button type="submit" className="w-[30%] p-4 bg-green-200 text-xl">
                Create New Product
              </button>
            )}
          </div>
        </div>
      </form>

      {/* product alert */}
      {/* <ReloadAlert /> */}
    </section>) } </> )
};

export default AddNewProduct;
