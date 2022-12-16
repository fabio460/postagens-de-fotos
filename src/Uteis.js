export const getJwt = ()=>{
    return JSON.parse(localStorage.getItem('jwt'))
}

export function nameInitiais(nome) {
  if (nome) {
    let inicial = nome.split('')[0].toUpperCase()
    return inicial
  }
}

export function RamdomString() {
  let chars = 'abcdefghijlmnopqrstuvxz'
  let arrChars = chars.split('')
  let ramdom = ''
  arrChars.forEach(() => {
    ramdom += chars[Math.ceil(Math.random()*(arrChars.length-1))]
  });
   
  return ramdom.toString()
}

export const inputValid = {
  emailValid: (email)=>{
    const regexEmail = /^[a-zA-Z]+@[a-zA-Z]+\./
    return regexEmail.test(email)
  },
  nameValid: (name)=>{
     const regexName = /^[a-zA-Z]{3}/
     return regexName.test(name)
  },
  passWordValid: (password)=>{
    const regexPassword = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9]{5}/
    return regexPassword.test(password)
  }
}

export const getReferencesImageFirebase = (imagemString)=>{
  const refImage = imagemString?.imagem.split('?')[0].split('/')[7]
  return refImage
}