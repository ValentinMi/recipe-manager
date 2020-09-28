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
        <Flex>
          <Drawer />
          <Component {...pageProps} />
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
