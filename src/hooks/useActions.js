import { useContext } from "react";
import { toast } from "react-toastify";
import appServices from "../api/services";
import { AppContext } from "../contextApi/ContextProvider";




const useActions = () => {
  const { appData, setNotes } = useContext(AppContext);

  let dataStore = appData.dataStore;

  const postContent = async (data) => {
    appServices.postContent(
      data,
      dataStore
    ).then(data => {
      setNotes(data)
      toast.success('Note successfully Added', {
        toastId: 'ww'
      })
    }).catch(()=>{
       toast.error('Note successfully Added', {
        toastId: 'ww'
      })
    });
  };

  const deleteContent = (item) => {
    appServices.deleteContent(
      item,
      dataStore
    ).then(data => {
      setNotes(data)
      toast.success('Note Deleted', {
        toastId: 'ww'
      })
    })
  };


  const updateContent = (item) => {
    appServices.updateContent(
      item,
      dataStore
    ).then(data => {
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
