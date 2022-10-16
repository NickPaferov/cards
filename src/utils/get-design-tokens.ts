export const getDesignTokens = () => ({
  typography: {
    fontFamily: "Montserrat",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "100vh",
          fontSize: 16,
          textTransform: "none" as const,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});
