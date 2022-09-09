export default function ({ store, redirect }) {
  if (store.state.room === null) {
    redirect('/');
  }
}
