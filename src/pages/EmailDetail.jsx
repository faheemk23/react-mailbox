import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MailList } from "../components/MailList";
import { MailContext } from "../contexts/MailProvider";

export function EmailDetail() {
  const { mailId } = useParams();
  const {
    mails: { inbox }
  } = useContext(MailContext);
  console.log(mailId);
  const mailtoShowDetail = inbox.filter(({ mId }) => mId === mailId);
  return (
    <>
      <h1 className="app-heading">faheem's mail box</h1>
      <MailList mails={mailtoShowDetail} detail />
      <Link className="back-link" to="/">
        back to inbox ↩
      </Link>
    </>
  );
}
