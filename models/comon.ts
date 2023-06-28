import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export interface MetaData {
  code: number;
  message: string;
  data: any;
}

export interface APIResponse {
  code: number;
  message: string;
  data: any;
}

export interface Resource<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    per_page: number;
    total: number;
  };
}

const getTo = (total: number, page: number, perPage: number) => {
  if (page === 1) {
    return total < perPage ? total : perPage;
  }

  return (page - 1) * perPage + perPage;
};

const getLastPage = (total: number, perPage: number) => {
  if (total <= 1) {
    return 1;
  }

  return Math.ceil(total / perPage);
};

export const newResource = <T>(
  data: T[],
  total: number,
  page: number,
  perPage: number
): Resource<T> => ({
  data,
  meta: {
    current_page: page,
    last_page: getLastPage(total, perPage),
    from: page === 1 ? 1 : (page - 1) * perPage + 1,
    to: getTo(total, page, perPage),
    per_page: perPage,
    total,
  },
});
