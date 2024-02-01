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

const WebSettings = () => {
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
  const handleChangeWebSettingsForm = (data) => {
    // data.tags = tags;
    // data.thumbnail = photo;
    // data.gallery = gallery;
    // data.allOfSizes = allOfSizes;
    // // console.log(data)
    // createProduct(data);
    // reset();
    // toast.success(`${data.title} Product Added`);
    
    //still handle when there's an error
    setTimeout( () => setIsReload(true), 2000);
  };

  return ( 
          <>
            { isReload ? <DashboardLoading /> : 
            <section className="grid grid-cols-12 gap-8">
                <form className="col-span-12" onSubmit={handleSubmit(handleChangeWebSettingsForm)}>
                    <div className="grid grid-cols-1 gap-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-4 bg-white p-4 rounded-md">
                        {/* homepage meta title */}
                        <div>
                          <label
                            htmlFor="hm_title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {errors.title ? (
                              <span className="text-red-500 font-medium">
                                homepage meta title field is required!
                              </span>
                            ) : (
                              <span className="flex justify-between">
                                homepage meta title{" "}
                                <span className="hover:text-gray-500">{"<="} 100</span>{" "}
                              </span>
                            )}
                          </label>
                          <div className="mt-1">
                            <input
                              id="hm_title"
                              name="hm_title"
                              type="text"
                              autoComplete="off"
                              placeholder="Enter your homepage meta title"
                              {...register("hm_title", { required: true, maxLength: 100 })}
                              className={`w-full form-input rounded-md bg-gray-200 p-2 ${
                                watch("title")?.length > 100 &&
                                "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              }`}
                            />
                          </div>
                        </div>
                        {/* Currency */}
                        <div>
                          <label
                            htmlFor="currency"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {errors.title ? (
                              <span className="text-red-500 font-medium">
                                Currency field is required!
                              </span>
                            ) : (
                              <span className="flex justify-between">
                                Currency{" "}
                                <span className="hover:text-gray-500">{"<="} 100</span>{" "}
                              </span>
                            )}
                          </label>
                          <div className="mt-1">
                            <input
                              id="currency"
                              name="currency"
                              type="text"
                              autoComplete="off"
                              placeholder="Enter your local currency"
                              {...register("currency", { required: true, maxLength: 100 })}
                              className={`w-full form-input rounded-md bg-gray-200 p-2 ${
                                watch("title")?.length > 100 &&
                                "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>

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
                              Updating Web Settings...
                          </button>
                        ) : (
                          <button type="submit" className="w-[50%] p-4 bg-green-200 lg:text-xl text-xs">
                            Change Settings
                          </button>
                        )}
                      </div>
                    </div>
                </form>
            </section> } 
          </>
          )
};

export default WebSettings;
