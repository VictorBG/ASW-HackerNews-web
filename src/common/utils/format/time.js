import moment from 'moment'

export const formatTimeAgo = timestamp => moment(timestamp).fromNow()
