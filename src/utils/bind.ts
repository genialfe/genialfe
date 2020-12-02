import { noop } from 'lodash'

export default function bind(
  target: any,
  properykey: string,
  decscriptor: PropertyDescriptor
) {
  noop(target)
  const method = decscriptor.value
  return {
    configurable: true,
    get() {
      const bound = method.bind(this)
      Object.defineProperty(this, properykey, {
        value: bound,
        configurable: true,
        writable: true
      })
      return bound
    },
    set(value: any) {
      Object.defineProperty(this, properykey, {
        value,
        configurable: true,
        writable: true
      })
    }
  }
}
