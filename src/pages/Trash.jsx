import { useContext } from "react";
import { Header } from "../components/Header";
import { MailContext } from "../contexts/MailProvider";
import { MailList } from "../components/MailList";

export function Trash() {
  const {
    mails: { trash }
  } = useContext(MailContext);
  return (
    <>
      <h1 className="app-heading">faheem's mail box</h1>
      <div className="row ">
        <div>
          <Header />
        </div>
        <div className="col">
          <MailList mails={trash} trash />
        </div>
      </div>
    </>
  );
}
