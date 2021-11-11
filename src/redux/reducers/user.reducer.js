const SET_USER = "SET_USER";
const UPDATE_ACTIVATION = "UPDATE_ACTIVATION";

const initialUserState = {
  email: "",
  role: null,
  status: null,
  activated: false,
  temp_id: "",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        email: action.payload.email,
        role: action.payload.role,
        status: action.payload.status,
        activated: action.payload.activated,
        temp_id: action.payload.temp_id,
      };

    case UPDATE_ACTIVATION:
      return {
        ...state,
        activated: true,
        temp_id: "",
        status: true,
      };

    default:
      return state;
  }
};

export const setUser = (setUser) => ({
  type: SET_USER,
  payload: setUser,
});

export const updateActivation = (updateActivation) => ({
  type: UPDATE_ACTIVATION,
  payload: updateActivation,
});

export default userReducer;
