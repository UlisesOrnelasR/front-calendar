export const initialState = {
  status: "checking", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated", // checking, authenticated, not-authenticated,
  user: {
    uid: "123ABC",
    name: "TestUser",
  },
  errorMessage: undefined,
};

export const NotAuthenticatedState = {
  status: "not-authenticated", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};
