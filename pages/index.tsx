import Link from "next/link";
import { NextPageWithLayout } from "models/comon";
import MainLayout from "layout/main";
import About from "./about";

const IndexPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href={"/about"}>about</Link>
      <About></About>
    </div>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
