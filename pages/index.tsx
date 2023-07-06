import Link from "next/link";
import { NextPageWithLayout } from "models/comon";
import MainLayout from "layout/main";

const IndexPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link href={"/about"}>about</Link>
    </div>
  );
};

IndexPage.Layout = MainLayout;

export default IndexPage;
