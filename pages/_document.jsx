import { Html, Head, Main, NextScript } from "next/document"
export default function Document() {
    return (
        <Html className="scroll-smooth transition-all dark">
            <Head>
                <meta charSet="utf-8" />
            </Head>
            <body className="dark:bg-page-material-dark bg-gray-200">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
