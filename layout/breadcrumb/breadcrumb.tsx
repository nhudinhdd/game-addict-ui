import { useRouter } from "next/router";
import { Breadcrumb as BSBreadcrumb } from "react-bootstrap";

export default function Breadcrumb() {
  const router = useRouter();
  const routerArr = router.pathname.split("/");

  return (
    <BSBreadcrumb listProps={{ className: "mb-0 align-items-center" }}>
      {/* {routerArr.map((routerName) =>
        routerName === "" || !routerName ? (
          <div key={routerName.}></div>
        ) : (
          <BSBreadcrumb.Item
            linkProps={{ className: "text-decoration-none breadcrumb-text" }}
            href="/"
            key={routerName}
          >
            {routerArr[1]}
          </BSBreadcrumb.Item>
        )
      )} */}
    </BSBreadcrumb>
  );
}
