const formatMacAddress = (macAddress: string) => {
  let e = macAddress,
    r = /([a-f0-9]{2})([a-f0-9]{2})/i,
    str = e.replace(/[^a-f0-9]/ig, "")
  while (r.test(str)) {
    // eslint-disable-next-line
    str = str.replace(r, '$1' + ':' + '$2')
  }
  e = str.slice(0, 17)
  return e
}
export default formatMacAddress
