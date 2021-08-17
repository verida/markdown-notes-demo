import { useContext } from "react";
import { toast } from "react-toastify";
import appServices from "../api/services";
import { AppContext } from "../contextApi/ContextProvider";




const useActions = () => {
  const {setNotes } = useContext(AppContext);

  const postContent = async (data) => {
    appServices.postContent(data)
    .then(data => {
      setNotes(data)
      toast.success('Note successfully Added', {
        toastId: 'ww'
      })
    })
  };

  const deleteContent = (item) => {
    appServices.deleteContent(item)
    .then(data => {
      setNotes(data);
    })
  };


  const updateContent = (item) => {
    appServices.updateContent(item)
    .then(data => {
      setNotes(data)
      toast.success('Note updated', {
        toastId: 'ww'
      })
    })
  };


  return {
    postContent,
    deleteContent,
    updateContent
  }
}

export default useActions
