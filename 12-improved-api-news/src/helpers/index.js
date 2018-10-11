const regExpDomain  = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm

export const getUrlDomain = url => url.match(regExpDomain)[0]