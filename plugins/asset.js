export default function (context, inject) {
  inject('asset', (path) => {
    return `http://localhost:8000/storage/${path}`
  })
}
