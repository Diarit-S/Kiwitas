export function handleError(err) {
  console.log("someshiiiit" + err)
  // if (err.response) {
  //   // Vue.notify({
  //   //   text: err.response.data.message,
  //   //   type: 'error',
  //   //   duration: 8000
  //   // })
  //   // console.error('Voici un erreur' + err.message)
  // }
  throw err
}
