import React, { createContext, useState, useEffect } from 'react';
import appServices from '../api/services';

export const AppContext = createContext()

const ContextProvider = ({ children }) => {
  const [appData, setAppData] = useState('');
  const [avatar, setAvatar] = useState('');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [markdownVal, setMarkdownVal] = useState("# title");
  const [noteTitle, setNoteTitle] = useState('New Task')
  const [open, setOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const displayAvatar = (profileAvatar) => {
    if (profileAvatar) {
      const parseAvatarValue = JSON.parse(profileAvatar)
      setAvatar(`data:image/${parseAvatarValue.format};base64,${parseAvatarValue.base64}`)
    }
  }

  const userEvent = (db) => {
    const { PouchDB, userDB } = db
    PouchDB.changes({
      since: 'now',
      live: true
    }).on('change', async function (info) {
      const row = await userDB.get(info.id, {
        rev: info.changes[0].rev
      });
      if (row.key === 'avatar') {
        displayAvatar(row.value)
      }else{
        setAppData({[row.key]: row.value })
      }
    });
  }

  useEffect(() => {
    if (window.veridaDApp) {
      appServices.profileEventSubscription()
        .then((data) => {
          userEvent(data)
        });

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData])





  const toggleDrawer = (anchor, open, item) => (event) => {

    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (!open) {
      setSelectedNote('');
    }
    if (item) {
      setSelectedNote(item)
      setMarkdownVal(item.body);
      setNoteTitle(item.title)
    }
    setSlideOpen({ ...slideOpen, [anchor]: open });
  };

  const values = {
    appData,
    open,
    notes,
    setNotes,
    setOpen,
    setAppData,
    markdownVal,
    setMarkdownVal,
    setIsLoading,
    isLoading,
    toggleDrawer,
    slideOpen,
    noteTitle,
    avatar,
    displayAvatar,
    selectedNote,
    setSelectedNote,
    setNoteTitle
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
