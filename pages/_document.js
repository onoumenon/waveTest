import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
        <link href="https://cdn1.codox.io/lib/css/wave.client.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
          src="https://smd.stage.codox.io/plugins/wave.client.js?apiKey=14744409-3890-4728-9cfd-01a8396f102d&app=quilljs"
          type="text/javascript"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument