import { useContext } from "react";
import { Header } from "../components/Header";
import { MailList } from "../components/MailList";
import { MailContext } from "../contexts/MailProvider";

export function Spam() {
  const {
    mails: { spam }
  } = useContext(MailContext);
  return (
    <>
      <h1 className="app-heading">faheem's mail box</h1>
      <div className="row ">
        <div>
          <Header />
        </div>
        <div className="col">
          <MailList mails={spam} spam />
        </div>
      </div>
    </>
  );
}
