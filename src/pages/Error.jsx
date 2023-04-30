import { Link } from "react-router-dom";

export function Error() {
  return (
    <>
      <h1>Error! Please input correct URL. </h1>
      <Link className="back-link" to="/">
        go back to home ↩
      </Link>
    </>
  );
}
