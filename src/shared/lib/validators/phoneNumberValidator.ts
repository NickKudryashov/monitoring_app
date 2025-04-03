import { Rule } from 'antd/es/form'

export const phoneNumberValidator = <T extends string>(_: Rule, val: T) => {
    if (
        /^[\+(][7]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(val) ||
        /^[8]{1}[-\s\.]?[9][(0-9)]{2}[-\s\.]?[0-9]{7}$/.test(val) ||
        !val
    ) {
        return Promise.resolve()
    }
    return Promise.reject()
}
