const initialState = {
    atualiza:false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'atualiza':
    return { ...state, atualiza:payload.atualiza }

  default:
    return state
  }
}
