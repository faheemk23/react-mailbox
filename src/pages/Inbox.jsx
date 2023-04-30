import { useContext } from "react";
import { Header } from "../components/Header";
import { MailContext } from "../contexts/MailProvider";
import { MailList } from "../components/MailList";

export function Inbox() {
  const {
    mails: { inbox, onlyShowUnread, onlyShowStarred },
    dispatcher
  } = useContext(MailContext);

  let inboxDisplay = inbox;

  if (onlyShowUnread) {
    inboxDisplay = inboxDisplay.filter(({ unread }) => unread);
  }

  if (onlyShowStarred) {
    inboxDisplay = inboxDisplay.filter(({ isStarred }) => isStarred);
  }
  const handleOnlyShowUnreadClick = (e) => {
    dispatcher({ type: "toggle-onlyShowUnread" });
  };

  const handleOnlyShowStarred = () => {
    dispatcher({ type: "toggle-onlyShowStarred" });
  };

  const unreadMailsNum = () =>
    inbox.reduce((acc, { unread }) => (unread ? acc + 1 : acc), 0);

  return (
    <>
      <h1 className="app-heading">faheem's mail box</h1>
      <div className="row">
        <div>
          <Header />
        </div>
        <div className="col">
          <fieldset>
            <legend>Filters</legend>
            <input
              type="checkbox"
              name="show-unread"
              onClick={handleOnlyShowUnreadClick}
            />
            <label htmlFor="show-unread">Show unread mails</label>
            <input
              type="checkbox"
              name="show-starred"
              onClick={handleOnlyShowStarred}
            />
            <label htmlFor="show-starred">Show starred mails</label>
          </fieldset>

          <p>
            {" "}
            <strong>Unread:{unreadMailsNum()}</strong>{" "}
          </p>
          <MailList mails={inboxDisplay} />
        </div>
      </div>
    </>
  );
}
