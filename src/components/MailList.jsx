import { useContext } from "react";
import { Link } from "react-router-dom";
import { MailContext } from "../contexts/MailProvider";

export function MailList({ mails, spam, trash, detail }) {
  const { dispatcher } = useContext(MailContext);

  const handleBtnStarUnstar = (mailId) => {
    dispatcher({ type: "toggle-star", payload: mailId });
  };

  const handleBtnDelete = (mail) => {
    dispatcher({ type: "btn-delete", payload: mail });
  };
  const handleBtnSpam = (mail) => {
    dispatcher({ type: "btn-spam", payload: mail });
  };

  const getMailListSyle = (unread) =>
    unread ? { backgroundColor: "#f2f6fc" } : {};

  const handleBtnMarkUnreadRead = (mailId) => {
    dispatcher({ type: "toggle-unread", payload: mailId });
  };

  const handleBtnRestore = (mail) => {
    if (spam) {
      dispatcher({ type: "restore", payload: mail, removeFrom: "spam" });
    } else {
      dispatcher({ type: "restore", payload: mail, removeFrom: "trash" });
    }
  };
  return (
    <>
      {mails.map((mail) => {
        const { mId, subject, isStarred, unread, content } = mail;
        return (
          <li className="mail-list" style={getMailListSyle(unread)} key={mId}>
            <div className="btn-flex">
              <strong>Subject:{subject}</strong>
              {!spam && !trash && (
                <>
                  {isStarred ? (
                    <button
                      className="btn-unstar btnwithstar"
                      onClick={() => handleBtnStarUnstar(mId)}
                    >
                      ☆
                    </button>
                  ) : (
                    <button
                      className="btnwithstar"
                      onClick={() => handleBtnStarUnstar(mId)}
                    >
                      ☆
                    </button>
                  )}
                </>
              )}
              {(spam || trash) && (
                <>
                  <button
                    className="btn-report-spam"
                    onClick={() => handleBtnRestore(mail)}
                  >
                    restore
                  </button>
                </>
              )}
            </div>
            <p className="mail-content">{content}</p>
            <div className="btn-flex">
              <div>
                {!detail && !trash && !spam && (
                  <>
                    <Link
                      className="viewdetail-link"
                      to={`/emaildetail/${mId}`}
                    >
                      View details
                    </Link>
                  </>
                )}
              </div>
              <div>
                {!trash && (
                  <>
                    <button
                      className="btn-delete"
                      onClick={() => handleBtnDelete(mail)}
                    >
                      Delete
                    </button>
                  </>
                )}
                {!trash && !spam && (
                  <>
                    {unread ? (
                      <button
                        className="btn-mark-read-unread"
                        onClick={() => handleBtnMarkUnreadRead(mId)}
                      >
                        Mark as read
                      </button>
                    ) : (
                      <button
                        className="btn-mark-read-unread"
                        onClick={() => handleBtnMarkUnreadRead(mId)}
                      >
                        Mark as unread
                      </button>
                    )}
                  </>
                )}
                {!spam && !trash && (
                  <>
                    <button
                      className="btn-report-spam"
                      onClick={() => handleBtnSpam(mail)}
                    >
                      Report spam
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
