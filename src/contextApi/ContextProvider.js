import React, { createContext, useState } from 'react';
import { initializeWeb3 } from '../utils/app.utils';

export const AppContext = createContext()

const ContextProvider = ({ children }) => {
  const [appData, setAppData] = useState('');
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [markdownVal, setMarkdownVal] = useState("# title");
  const [noteTitle, setNoteTitle] = useState('New Task')
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    type: '',
    message: '',
    isError: false,
    title: '',
  })
  const [slideOpen, setSlideOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const getAllNotes = async () => {
    setIsLoading(true)
    try {
      const db = await appData.openDatabase('notes');
      const items = await db.getMany();
      setNotes(items)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  };


  const startUp = () => {
    const isEthereum = initializeWeb3();
    if (!isEthereum) {
      setError({
        message: 'You need to install a browser wallet consider installing meta mask!',
        type: 'ethereum',
        title: 'Not Supported Ethereum Browser',
        isError: true
      })
      return setOpen(!open)
    }
  }

  /**
   * Custom Swipeable Menu
   */

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
    startUp,
    error,
    open,
    notes,
    setNotes,
    setOpen,
    setAppData,
    markdownVal,
    setMarkdownVal,
    setIsLoading,
    isLoading,
    getAllNotes,
    toggleDrawer,
    slideOpen,
    noteTitle,
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
