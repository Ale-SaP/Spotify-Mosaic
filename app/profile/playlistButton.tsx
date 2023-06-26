'use client'
import { useRouter } from "next/navigation"

export default function PlaylistButton({id}) {
    const router = useRouter()
    return <button className="btn btn-sm btn-ghost"
        onClick={() => { router.push(`/profile/playlist/${id}`) }}>Open
    </button>
}