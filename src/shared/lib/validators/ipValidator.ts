import { Rule } from 'antd/es/form'

export const ipValidator = <T extends string>(_: Rule, val: T) => {
    if (/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(val) || !val) {
        return Promise.resolve()
    }
    return Promise.reject()
}

export const portValidator = <T extends string>(_: Rule, val: T) => {
    if (
        /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
            val,
        ) ||
        !val
    ) {
        return Promise.resolve()
    }
    return Promise.reject()
}
