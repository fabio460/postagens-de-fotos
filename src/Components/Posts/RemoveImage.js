import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deletePost, getPotById } from "../../Api";
import { firebaseConfig } from "../../firebaseConfig";
import { getReferencesImageFirebase } from "../../Uteis";
initializeApp(firebaseConfig);
const storage = getStorage();
export const removeImage = async(id)=>{
    const n = await getPotById(id)
    const refImage = getReferencesImageFirebase(n.imagem)
    
    const desertRef = ref(storage, refImage);
    deleteObject(desertRef).then(() => {
        deletePost(id)
      }).catch((error) => {
        deletePost(id)
        console.log(error)
      });
}