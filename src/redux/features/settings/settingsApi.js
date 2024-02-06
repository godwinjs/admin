import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new setting
    createSetting: builder.mutation({
      query: (data) => ({
        url: "api/setting/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    // get all settings
    displaySettings: builder.query({
      query: ({ page, limit }) => ({
        url: `api/setting/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    // get setting
    displaySetting: builder.query({
      query: (id) => ({
        url: `api/setting/${id}`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    // update setting
    updateSetting: builder.mutation({
      query: ({pid, settingsData}) => ({
        url: `api/setting/${pid}`,
        method: "PATCH",
        body: settings
        
        +Data,
      }),
      invalidatesTags: ["Setting"],
    }),

    // delete setting
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `api/setting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Setting"],
    }),
  }),
});

export const {
  useCreateSettingsMutation,
  useDisplaySettingsQuery,
  useDisplaySettingQuery,
  useUpdateSettingMutation,
  useRemoveSettingMutation,
} = productApi;
