import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  Flex
} from "@chakra-ui/core";
import Drawer from "../components/Drawer";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
