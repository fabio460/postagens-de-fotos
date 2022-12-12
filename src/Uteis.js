export const getJwt = ()=>{
    return JSON.parse(localStorage.getItem('jwt'))
}

export function nameInitiais(nome) {
  if (nome) {
    let inicial = nome.split('')[0].toUpperCase()
    return inicial
  }
}