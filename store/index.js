export const state = () => ({
  room: null,
})

export const mutations = {
  SET_ROOM(state, data) {
    state.room = data
  }
}

export const actions = {
  async saveRoom(context, data) {
    context.commit('SET_ROOM', data)
  }
}
