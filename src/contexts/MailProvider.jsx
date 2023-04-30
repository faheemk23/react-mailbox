import { createContext, useEffect, useReducer } from "react";
import { data } from "../apis/fakeFetch";

export const MailContext = createContext();

const toggleEmailStarred = (inbox, mailId) => {
  return inbox.map((item) =>
    item.mId === mailId ? { ...item, isStarred: !item.isStarred } : item
  );
};

const toggleEmailUnread = (inbox, mailId) => {
  return inbox.map((mail) =>
    mail.mId === mailId ? { ...mail, unread: !mail.unread } : mail
  );
};

const mailReducer = (state, action) => {
  switch (action.type) {
    case "initial-load":
      return { ...state, inbox: action.payload };
    case "toggle-onlyShowUnread":
      return { ...state, onlyShowUnread: !state.onlyShowUnread };
    case "toggle-onlyShowStarred":
      return { ...state, onlyShowStarred: !state.onlyShowStarred };
    case "toggle-star":
      return {
        ...state,
        inbox: toggleEmailStarred(state.inbox, action.payload)
      };
    case "btn-delete":
      return {
        ...state,
        inbox: state.inbox.filter((mail) => mail.mId !== action.payload.mId),
        trash: [...state.trash, action.payload],
        spam: state.spam.filter((mail) => mail.mId !== action.payload.mId)
      };
    case "btn-spam":
      return {
        ...state,
        inbox: state.inbox.filter((mail) => mail.mId !== action.payload.mId),
        spam: [...state.spam, action.payload]
      };
    case "toggle-unread":
      return {
        ...state,
        inbox: toggleEmailUnread(state.inbox, action.payload)
      };
    case "restore":
      if (action.removeFrom === "spam") {
        return {
          ...state,
          inbox: [...state.inbox, action.payload],
          spam: state.spam.filter(({ mId }) => mId !== action.payload.mId)
        };
      } else if (action.removeFrom === "trash") {
        return {
          ...state,
          inbox: [...state.inbox, action.payload],
          trash: state.trash.filter(({ mId }) => mId !== action.payload.mId)
        };
      }
      break;
    default:
      console.error("no case matched");
  }
};

export function MailProvider({ children }) {
  const [mails, dispatcher] = useReducer(mailReducer, {
    inbox: [],
    onlyShowUnread: false,
    onlyShowStarred: false,
    spam: [],
    trash: []
  });

  useEffect(() => {
    fetchMails();
  }, []);

  const fetchMails = async () => {
    const res = await data;
    dispatcher({ type: "initial-load", payload: res });
  };

  return (
    <MailContext.Provider value={{ mails, dispatcher }}>
      {children}
    </MailContext.Provider>
  );
}
