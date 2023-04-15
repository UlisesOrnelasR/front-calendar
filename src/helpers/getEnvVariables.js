export const getEnvVariables = () => {
  import.meta.env;

  return {
    ...import.meta.env,
    VITE_MODE: import.meta.VITE_MODE,
  };
};
