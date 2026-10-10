
```javascript

import "@/marsql/styles.css"
import "@/marsql/form/form-styles.css"

import { Google_Sans_Flex } from "next/font/google";
import { Google_Sans_Code } from "next/font/google";
import { Toaster } from "sonner";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-google-sans-flex",
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: false
});
const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: false
});

// ${googleSansFlex.variable} ${googleSansCode.variable}
// within body, or if <Providers> used then within that:  <Toaster richColors={true} />

```