import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";


const initialState = {
  user: null,
  tokens: {}
}

const encryptor = encryptTransform({
  secretKey: "inventory-manager-app-2025-data-encryption-key",
  onError: function (error: any) {
    console.error("Unable to encrypt redux store:", error);
  },
});

// Define persist config
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "tokens"],
  transforms: [encryptor],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<null | any>) => {
      return {
        ...state,
        user: action.payload,
      };
    },

    setUserTokens: (state, action: PayloadAction<null | any>) => {
      return {
        ...state,
        tokens: action.payload || initialState.tokens,
      };
    },

    setAccessToken: (state, action: PayloadAction<null | any>) => {
      return {
        ...state,
        tokens: {...state.tokens, access: action.payload},
      };
    },

    resetUser: (state) => {
      state.user = initialState.user;
      state.tokens = initialState.tokens;
    },
  },
});

export const { setUserData, setUserTokens, resetUser, setAccessToken } =
  userSlice.actions;

// Create persisted reducer
export default persistReducer(persistConfig, userSlice.reducer);