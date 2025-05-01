import { Rule } from 'antd/es/form'

export const innValidator = <T extends string>(_: Rule, val: T) => {
    if ((/\d{10}/.test(val) && val.length === 10) || !val) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export const kppValidator = <T extends string>(_: Rule, val: T) => {
    if ((/\d{9}/.test(val) && val.length === 9) || !val) {
        return Promise.resolve()
    }
    return Promise.reject()
}
