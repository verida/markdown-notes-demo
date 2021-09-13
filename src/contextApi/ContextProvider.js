import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import appServices from '../api/services';
import { setUserAvatar, setUserProfile } from '../redux/reducers/auth';

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const userEvent = (db) => {
    const { PouchDB, userDB } = db;
    PouchDB.changes({
      since: 'now',
      live: true
    }).on('change', async (info) => {
      const row = await userDB.get(info.id, {
        rev: info.changes[0].rev
      });
      if (row.key === 'avatar') {
        dispatch(setUserAvatar(row.value));
      } else {
        dispatch(setUserProfile({ [row.key]: row.value }));
      }
    });
  };

  useEffect(() => {
    if (window.veridaDApp) {
      // @todo: Fix this with the new event handler on profile instance
      // .onProfileChange
      appServices.profileEventSubscription().then((data) => {
        userEvent(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    open,
    setOpen
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
