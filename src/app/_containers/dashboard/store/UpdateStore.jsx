"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useDisplayStoreQuery,
  useUpdateStoreMutation,
} from "../../../../redux/features/store/storeApi";
import { useUpdatePhotoMutation } from "../../../../redux/features/update/updateApi";

import DashboardLoading from "../../../_components/loading/DashboardLoading";

const UpdateStore = ({id}) => {
  const sid = id;
  const { data: displayBrand, isLoading: displayingBrand } =
    useDisplayStoreQuery(sid);
  const router = useRouter();

  const { title, description, seller, tags, thumbnail } =
    displayBrand?.data || {};

  // react hook form credentials
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title,
      description,
      seller,
      tags,
      thumbnail,
    },
  });

  // server side credentials
  const [updateStore, { isLoading: storeUpdating }] = useUpdateStoreMutation();
  const [updateStoreThumbnail, { isLoading: thumbnailUploading }] =
    useUpdatePhotoMutation();

  // upload credentials from state
  const { photo } = useSelector((state) => state.update);
  const [storeTags, setStoreTags] = useState([]);

  const removeTag = (selectedTag) => {
    setStoreTags(storeTags.filter((tag) => tag !== selectedTag));
  };
  const [ isReload, setIsReload ] = useState(false);

  useEffect(() => {
    reset({
      title,
      description,
      seller,
      tags,
      thumbnail,
    });
    setStoreTags(tags);
    if(isReload){
      window.location.reload()
    }
  }, [reset, title, description, seller, tags, thumbnail, isReload]);

  // submit add store form
  const handleAddStoreForm = (data) => {
    data.tags = storeTags.length ? storeTags : tags;
    data.seller = seller;
    data.thumbnail = Object.keys(photo)?.length ? photo : thumbnail;

    const { storeTags: _, ...storeData } = data;
    updateStore({ sid, storeData });
    toast.success(`${data.title} store Updated`);
    //still handle when there's an error
    setTimeout( () => setIsReload(true), 3000);
  };

  return (
    <>
      {displayingBrand ? (
        <DashboardLoading />
      ) : (
        <>
          <div className="w-full mb-4">
            <button
              className="flex items-center btn-primary text-lg font-bold"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-short h-6 w-6"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              Back
            </button>
          </div>
          <section className="grid grid-cols-12 gap-8">
            {/* store form */}
            <form
              className="md:col-span-7 col-span-12"
              onSubmit={handleSubmit(handleAddStoreForm)}
            >
              <div className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
                  {/* store title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {errors.title ? (
                        <span className="text-red-500 font-medium">
                          Store title field is required!
                        </span>
                      ) : (
                        <span className="flex justify-between">
                          Store title{" "}
                          <span className="hover:text-gray-500">
                            {"<="} 100
                          </span>{" "}
                        </span>
                      )}
                    </label>
                    <div className="mt-1">
                      <input
                        id="title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your store title"
                        {...register("title", { maxLength: 100 })}
                        className={`w-full form-input rounded-md ${
                          watch("title")?.length > 100 &&
                          "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        }`}
                      />
                    </div>
                  </div>

                  {/* store description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {errors.description ? (
                        <span className="text-red-500 font-medium">
                          Store description field is required!
                        </span>
                      ) : (
                        <span className="flex justify-between">
                          Store description{" "}
                          <span className="hover:text-gray-500">
                            {"<="} 1000
                          </span>{" "}
                        </span>
                      )}
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter your store description"
                        {...register("description", {
                          maxLength: 1000,
                        })}
                        className={`w-full form-textarea rounded-md ${
                          watch("description")?.length > 1000 &&
                          "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        }`}
                        rows="8"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
                  {/* store tags */}
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {errors.storeTags ? (
                        <span className="text-red-500 font-medium">
                          Store tags field is required!
                        </span>
                      ) : (
                        <span className="flex justify-between">
                          Store tags{" "}
                          <span className="hover:text-gray-500">
                            {"<="} upto 5
                          </span>{" "}
                        </span>
                      )}
                    </label>
                    <div className="mt-1 w-full border rounded-md border-black px-3 py-1 flex items-center flex-wrap gap-2">
                      {storeTags?.map((tag, index) => (
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
                              onClick={() => removeTag(tag)}
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
                        id="storeTags"
                        name="storeTags"
                        type="text"
                        autoComplete="off"
                        placeholder="Separate by , or ⎵"
                        {...register("storeTags", { required: false })}
                        className={`border-transparent focus:border-transparent focus:ring-transparent rounded-md`}
                        onKeyUp={(event) => {
                          if (event.which === 188 || event.which === 32) {
                            const tagValue = event.target.value.replace(
                              ",",
                              ""
                            );
                            setStoreTags([...storeTags, tagValue]);
                            event.target.value = "";
                          }
                        }}
                        readOnly={storeTags?.length >= 5}
                      />
                    </div>
                  </div>
                </div>

                {/* store thumbnail */}
                <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
                  {/* store thumbnail */}
                  <div>
                    <label
                      htmlFor="thumbnail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {errors.thumbnail ? (
                        <span className="text-red-500 font-medium">
                          Store thumbnail field is required!
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
                            "Store thumbnail (765x850)"
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
                          <span className="hover:text-gray-500">
                            {"<="} 1MB
                          </span>
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
                            placeholder="Enter your store thumbnail"
                            {...register("thumbnail", {})}
                            className={`w-full form-input rounded-md`}
                            onChange={(event) => {
                              const formData = new FormData();
                              formData.append(
                                "thumbnail",
                                event.target.files[0]
                              );
                              updateStoreThumbnail({
                                route: "store/thumbnail",
                                public_id: thumbnail?.public_id,
                                photo: formData,
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* form submit button */}
                <div>
                  {storeUpdating ? (
                    <button
                      type="submit"
                      className="w-full btn-primary"
                      disabled
                    >
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
                      Updating Store...
                    </button>
                  ) : (
                    <button type="submit" className="w-full btn-primary">
                      Update this Store
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* preview pan for near future */}
            {/* <ReloadAlert /> */}
          </section>
        </>
      )}
    </>
  );
};

export default UpdateStore;
