import { EmptyLayout } from "layout/empty";
import { AppPropsWithLayout } from "models/comon";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
