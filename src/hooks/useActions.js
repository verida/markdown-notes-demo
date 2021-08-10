import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../contextApi/ContextProvider";




const useActions = () => {
  const { appData, setIsLoading, setNotes } = useContext(AppContext);

  const postContent = async ({ title, markdownVal }) => {
    setIsLoading(true)
    try {
      let db = await appData.openDatabase('notes');
      await db.save({
        title: title,
        body: markdownVal
      });
      let items = await db.getMany();
      setNotes(items)
      toast.success('Note successfully Added', {
        toastId: 'ww'
      })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  };

  const deleteContent = async (item) => {
    setIsLoading(true)
    try {
      const db = await appData.openDatabase('notes');
      await db.delete(item);
      const items = await db.getMany();
      setNotes(items)
      toast.success('Note successfully deleted', {
        toastId: 'ww'
      })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  };

  const updateContent =async (item) => {
    setIsLoading(true)
    try {
      const db = await appData.openDatabase('notes');
      await db.update(item);
      const items = await db.getMany();
      setNotes(items)
      toast.success('Note successfully updated', {
        toastId: 'ww'
      })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  };
  return {
    postContent,
    deleteContent,
    updateContent
  }
}

export default useActions
