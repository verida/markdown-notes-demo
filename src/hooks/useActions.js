import useEditor from "../components/markdown/useEditor";




const useActions = () => {
 const {getMarkDown} = useEditor()

   const postContent = () => {
    const markDownString = getMarkDown();
  };

  const deleteContent = () => {
  };

  const updateContent = () => {
    const markDownString = getMarkDown();
   
  };
  return{
    postContent,
    deleteContent,
    updateContent
  }
}

export default useActions
