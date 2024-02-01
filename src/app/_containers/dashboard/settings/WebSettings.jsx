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

                    </div>
                </form>
            </section> } 
          </>
          )
};

export default WebSettings;
