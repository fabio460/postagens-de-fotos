import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deletePost, getPotById } from "../../Api";
import { firebaseConfig } from "../../firebaseConfig";
import { getReferencesImageFirebase } from "../../Uteis";
const app =  initializeApp(firebaseConfig);
const storage = getStorage();
export const removeImage = async(id)=>{
    const n = await getPotById(id)
    const refImage = getReferencesImageFirebase(n)
    const desertRef = ref(storage, refImage);
    deleteObject(desertRef).then(() => {
        console.log('imagem deletada')
        deletePost(id)
      }).catch((error) => {
        deletePost(id)
        console.log('falha ao deletar')
      });
}