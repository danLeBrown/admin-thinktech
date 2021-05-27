export default function (context, inject) {
  inject('asset', (path) => {
    return `https://thinktech.fuoye360.com/storage/${path}`
  })
}
