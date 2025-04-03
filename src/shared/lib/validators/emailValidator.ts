import { Rule } from 'antd/es/form'

export const emailValidator = <T extends string>(_: Rule, val: T) => {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w)$/.test(val) || !val) {
        return Promise.resolve()
    }
    return Promise.reject()
}
