
const AppPath = {
    Root: '/',
    Login: '/login',
    Register: '/register',
    ChannelsMe: '/channels/@me',
    ChannelsMeUser: '/channels/@me/:channelId',
    Store: '/store',
    Shop: '/shop'
} as const;

export { AppPath };