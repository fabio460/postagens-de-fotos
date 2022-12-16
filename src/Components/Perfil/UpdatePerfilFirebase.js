import { getUser, updatePhotoPerfil } from "../../Api"
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { RamdomString, getReferencesImageFirebase } from "../../Uteis";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export async function UpdatePerfilFirebase(id,Url) {
    const i = await getUser(id)
    if (i.fotoDePerfil) {
        const refImage = getReferencesImageFirebase(i.fotoDePerfil)
        const desertRef = ref(storage, refImage);
        deleteObject(desertRef).then(() => {}).catch((error) => {});
    }

    const ImageName = RamdomString()
    const storageRef = ref(storage, ImageName);
    uploadBytes(storageRef, Url).then((snapshot) => {
        getDownloadURL(ref(storage, storageRef))
        .then((url) => {
           updatePhotoPerfil(url)
           return true
        })
        .catch((error) => {
          console.log(error)
          return false
        });    
    });
    
}