export const changeTheme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...'#BC9743',
      ...(mode === 'light'
        ? {
            main: '#BC9743',
          }
        : {
            main: '#665224',
          }),
    },
    secondary: {
      ...'#C9AC69',
      ...(mode === 'light'
        ? {
            main: '#C9AC69',
          }
        : {
            main: '#8C7031',
          }),
    },
    AssistanceColor: {
      ...'#338f73',
      ...(mode === 'light'
        ? {
            main: '#338f73',
          }
        : {
            main: '#60c6a6',
          }),
    },
    background: {
      ...'#338f73',
      ...(mode === 'light'
        ? {
            default: '#fff',
          }
        : {
            default: '#1E180B',
          }),
    },
  },

  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      wideTablet: 840,
      laptop: 1024,
      desktop: 1200,
    },
  },
});
