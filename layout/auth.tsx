import { LayoutProps } from "models/comon";
import Providers from "./providers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainLayout from "./main";

export function Auth({ children }: LayoutProps) {
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push(`/api/auth/signin?callbackUrl=${process.env.baseUrl}`);
  //   },
  // });
  // const router = useRouter();
  // if (status === "loading") {
  //   return <div>"Loading or not authenticated..." </div>;
  // }
  return <div>{children}</div>;
}
