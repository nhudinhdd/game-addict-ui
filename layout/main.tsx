import { LayoutProps } from "models/comon";
import Header from "./common/header/header";
import Footer from "./common/footer/footer";
import Providers from "./providers";
import { Auth } from "./auth";
import Sidebar from "./sidebar/sidebar";
import { useState } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { SWRConfig } from "swr";

export default function MainLayout({ children }: LayoutProps) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowSidebarMd, setIsShowSidebarMd] = useState(true);
  const toggleIsShowSidebarMd = () => {
    const newValue = !isShowSidebarMd;
    localStorage.setItem("isShowSidebarMd", newValue ? "true" : "false");
    setIsShowSidebarMd(newValue);
  };
  const toggleIsShowSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };
  // Clear and reset sidebar
  const resetIsShowSidebar = () => {
    setIsShowSidebar(false);
  };
  return (
    <div>
      <Providers>
        <SWRConfig
          value={{
            shouldRetryOnError: false,
            dedupingInterval: 24 * 60 * 60 * 1000,
          }}
        >
          <Head>
            <title>Game Addict</title>
            <meta name="description" content="Dữ liệu cầu thủ fifa online 4" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
          </Head>

          <Auth>
            <Sidebar isShow={isShowSidebar} isShowMd={isShowSidebarMd} />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <Header
                toggleSidebar={toggleIsShowSidebar}
                toggleSidebarMd={toggleIsShowSidebarMd}
              />
              <div className="body flex-grow-1 px-sm-2 mb-4">
                <Container fluid="lg">{children}</Container>
              </div>
              <Footer />
            </div>
          </Auth>
        </SWRConfig>
      </Providers>
    </div>
  );
}
