import { apiSlice } from './apiSlice';

// l’URL de base pour les appels d’API liés users
const USERS_URL = '/api/users';

// Ces endpoints = requêtes exposées pour récupérer des données à partir de votre backend.
export const userApiSlice = apiSlice.injectEndpoints ({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
              }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
              }),
        }),
        logout:  builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
               }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
              url: `${USERS_URL}/profile`,
              method: 'PUT',
              body: data,
            }),
        }), 
        deleteUser: builder.mutation({
            query: () => ({
              url: `${USERS_URL}/profile`,
              method: 'DELETE',
            }),
            invalidatesTags:["User"],
          }),
          
    }),
})


// attention par convention le nom est "use+Nom+Mutation"
export const {
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
  } = userApiSlice;

