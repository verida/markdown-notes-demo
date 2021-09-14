import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NotesUI from '../components/editorview/NotesViewUI';
import { NotesHeader } from '../components/common/index';
import markDownServices from '../api/services';
import { setMarkdownNotes } from '../redux/reducers/editor';

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const filterOptions = {
      limit: 40,
      skip: 0,
      sort: [{ title: 'desc' }]
    };

    if (markDownServices.veridaDapp) {
      markDownServices.fetchAllNotes({}, filterOptions).then((data) => {
        dispatch(setMarkdownNotes(data));
      });
    }
  }, [dispatch]);

  return (
    <div>
      <NotesHeader {...props} />
      <NotesUI />
    </div>
  );
};

export default Home;
