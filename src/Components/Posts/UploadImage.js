import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setPost } from "../../Api";
import { RamdomString } from "../../Uteis";

let ramdomStringName = RamdomString()
const app =  initializeApp(firebaseConfig);
const storage = getStorage(app);
const storageRef = ref(storage, ramdomStringName);

export const UploadImage = (file,descricao,id,handleClose)=>{
    
    uploadBytes(storageRef, file).then(()=>{
        getDownloadURL(storageRef)
        .then((url) => {
           setPost(url,url,descricao,id)
           setTimeout(() => {
            window.location.reload()
           }, 1000);
           handleClose()
        })
        .catch((error) => {
            console.log(error)
        });
    })



}