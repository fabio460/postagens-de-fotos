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