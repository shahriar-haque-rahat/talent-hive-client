import { cookies } from 'next/headers'

export default async function cookie(params: type) {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')
}