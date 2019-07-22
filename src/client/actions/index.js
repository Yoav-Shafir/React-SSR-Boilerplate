export const FETCH_USERS = "fetch_users";

// `api` here is the injected `axios` instance we use in `thunk.withExtraArgument(axiosInstance)`
// We have one `axiosInstance` for the server and another one for the client.

// Action creator.
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("/users");

  // Dispath action.
  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";

// Action creator.
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const FETCH_ADMINS = "fetch_admins";

// Action creator.
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get("/admins");

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
};
