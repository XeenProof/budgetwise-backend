import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Mainscreen } from "./components/Mainscreen"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Mainscreen/>
  </ChakraProvider>
)
