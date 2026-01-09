export interface DefaultAvatar {
    id: string
    gradient: string
    preview: string
}

export const DEFAULT_AVATARS: DefaultAvatar[] = [
    {
        id: 'gradient-1',
        gradient: 'from-blue-500 to-cyan-500',
        preview: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
        id: 'gradient-2',
        gradient: 'from-purple-500 to-pink-500',
        preview: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
        id: 'gradient-3',
        gradient: 'from-green-500 to-teal-500',
        preview: 'bg-gradient-to-br from-green-500 to-teal-500'
    },
    {
        id: 'gradient-4',
        gradient: 'from-orange-500 to-red-500',
        preview: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
    {
        id: 'gradient-5',
        gradient: 'from-pink-500 to-rose-500',
        preview: 'bg-gradient-to-br from-pink-500 to-rose-500'
    },
    {
        id: 'gradient-6',
        gradient: 'from-indigo-500 to-purple-500',
        preview: 'bg-gradient-to-br from-indigo-500 to-purple-500'
    },
    {
        id: 'gradient-7',
        gradient: 'from-yellow-400 to-orange-500',
        preview: 'bg-gradient-to-br from-yellow-400 to-orange-500'
    },
    {
        id: 'gradient-8',
        gradient: 'from-emerald-500 to-cyan-600',
        preview: 'bg-gradient-to-br from-emerald-500 to-cyan-600'
    },
    {
        id: 'gradient-9',
        gradient: 'from-slate-500 to-slate-800',
        preview: 'bg-gradient-to-br from-slate-500 to-slate-800'
    },
    {
        id: 'gradient-10',
        gradient: 'from-violet-600 to-indigo-600',
        preview: 'bg-gradient-to-br from-violet-600 to-indigo-600'
    },
    {
        id: 'gradient-11',
        gradient: 'from-blue-600 to-indigo-900',
        preview: 'bg-gradient-to-br from-blue-600 to-indigo-900'
    },
    {
        id: 'gradient-12',
        gradient: 'from-fuchsia-500 to-purple-600',
        preview: 'bg-gradient-to-br from-fuchsia-500 to-purple-600'
    }
]

export function getAvatarGradient(avatarId: string) {
    const avatar = DEFAULT_AVATARS.find(a => a.id === avatarId)
    return avatar?.gradient || DEFAULT_AVATARS[0].gradient
}
