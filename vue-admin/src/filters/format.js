import dayJs from 'dayjs'

export default function (value, format) {
  return dayJs(value).format(format)
}
