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
  const [openPreview, setOpenPreview] = useState(false);
  const [slideOpen, setSlideOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    if (window.veridaDApp) {
      appServices.profileEventSubscription()
        .then((data) => {
          userEvent(data)
        });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData])

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
      } else {
        setAppData({ [row.key]: row.value })
      }
    });
  }




  const openMarkDownView = (open = false, item) => {
    singleNoteAction(open, item);
    //TODO 
    /**
     * Add Modal Open state for Markdown Preview
     */
    setOpenPreview(open)
  }


  const singleNoteAction = (open, item) => {
    if (!open || !item) {
      setSelectedNote('');
    }
    if (item) {
      setSelectedNote(item)
      setMarkdownVal(item.body);
      setNoteTitle(item.title)
    }
  }

  const toggleDrawer = (anchor, open, item) => (event) => {

    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    singleNoteAction(open, item)
    setSlideOpen({ ...slideOpen, [anchor]: open });
  };

  const values = {

    avatar,
    slideOpen,

    open,
    setOpen,

    notes,
    setNotes,
    

    appData,
    setAppData,

    markdownVal,
    setMarkdownVal,

    openPreview,
    setOpenPreview,

    noteTitle,
    setNoteTitle,

    selectedNote,
    setSelectedNote,

    setIsLoading,
    isLoading,


    toggleDrawer,
    displayAvatar,
    openMarkDownView
  }

  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
