import Link from "next/link";
import { Nav } from "react-bootstrap";

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/" passHref legacyBehavior>
          <Nav.Link className="p-2">Player</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="#" passHref legacyBehavior>
          <Nav.Link className="p-2">Blogs</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="#" passHref legacyBehavior>
          <Nav.Link className="p-2">Shop</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  );
}
