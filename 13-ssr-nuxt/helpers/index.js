const regExpDomain = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim

export const getUrlDomain = url => url.match(regExpDomain)[0]
