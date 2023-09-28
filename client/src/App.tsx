import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Mainscreen } from "./components/Mainscreen"
import { AuthContextProvider } from "./store/AuthStore"

export const App = () => (
  <AuthContextProvider>
    <ChakraProvider theme={theme}>
      <Mainscreen/>
    </ChakraProvider>
  </AuthContextProvider>
)
