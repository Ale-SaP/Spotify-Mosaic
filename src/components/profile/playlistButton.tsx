'use client'
import { useRouter } from "next/navigation"

export default function PlaylistButton({ id, component }) {
    const router = useRouter()
    return (
        <button
            onClick={() => {
                window.open(`/playlist/${id}`, '_blank');
            }}
        >
            {component}
        </button>
    );

}