const urlRegExp = new RegExp('(?:https?://)?(?:www\\.)?(.+\\.)' +
    '(com|au\\.uk|co\\.in|be|in|uk|org\\.in|org|net|edu|gov|mil|ly|es|cat|eu)')

export const isLink = text => !!urlRegExp.test(text)

export const getDomain = text => urlRegExp.exec(text)[0] || ''

export const isNotEmpty = text => !!text
