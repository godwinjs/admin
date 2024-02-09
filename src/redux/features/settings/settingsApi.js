import apiSlice from "../api/apiSlice";

const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new settings
    createSettings: builder.mutation({
      query: (data) => ({
        url: "api/settings/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    // get all settings
    displaySettings: builder.query({
      query: ({ page, limit }) => ({
        url: `api/settings/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    // get setting
    displaySetting: builder.query({
      query: (id) => ({
        url: `api/settings/${id}`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    // update setting
    updateSettings: builder.mutation({
      query: ({pid, settingsData}) => ({
        url: `api/settings/${pid}`,
        method: "PATCH",
        body: settings
        
        +Data,
      }),
      invalidatesTags: ["Settings"],
    }),

    // delete setting
    removeSettings: builder.mutation({
      query: (id) => ({
        url: `api/settings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useCreateSettingsMutation,
  useDisplaySettingsQuery,
  useDisplaySettingQuery,
  useUpdateSettingsMutation,
  useRemoveSettingsMutation,
} = settingsApi;
