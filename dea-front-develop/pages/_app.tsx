import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultLayout } from "../components/layout/default";
import MainLayout from "../components/layout/main";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider session={session}>
          {/* <Header /> */}
          <MainLayout>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MainLayout>

          {/* <Footer /> */}
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
