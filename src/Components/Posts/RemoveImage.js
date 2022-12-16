import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deletePost, getPotById } from "../../Api";
import { firebaseConfig } from "../../firebaseConfig";
const app =  initializeApp(firebaseConfig);
const storage = getStorage();
export const removeImage = async(id)=>{
    const n = await getPotById(id)
    const imagemString = n.imagem.split('?')[0].split('/')[7]
    const desertRef = ref(storage, imagemString);
    deleteObject(desertRef).then(() => {
        console.log('imagem deletada')
        deletePost(id)
      }).catch((error) => {
        deletePost(id)
        console.log('falha ao deletar')
      });
}