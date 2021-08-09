import { useEffect, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

const convertFromMarkDownToDraft = (markDownContent) => {
  const rawDraft = markdownToDraft(markDownContent);
  return convertFromRaw(rawDraft);
};

const useEditor = () => {
  const [editEditorText, setEditorText] = useState(() => EditorState.createEmpty());
  const [MDContent, setMDContent] = useState('');

  useEffect(() => {
    if (MDContent) {
      const draftRaw = convertFromMarkDownToDraft(MDContent);
      setEditorText(() => EditorState.createWithContent(draftRaw));
    }
  }, [MDContent]);

  const getMarkDown = () => {
    const rawContentState = convertToRaw(editEditorText.getCurrentContent());
    const markdownFile = draftToMarkdown(rawContentState);
    return markdownFile;
  };

  return {
    getMarkDown,
    setMDContent,
    setEditorText,
    editEditorText,
  };
};

export default useEditor;
