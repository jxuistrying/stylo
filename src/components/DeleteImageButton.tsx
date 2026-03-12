'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteInspirationImageRecord } from '@/lib/actions'

export function DeleteImageButton({ id, imageUrl, onDelete }: { id: string, imageUrl: string, onDelete?: () => void }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()

        const confirmDelete = window.confirm("Are you sure you want to delete this image?")
        if (!confirmDelete) return

        setIsDeleting(true)
        const toastId = toast.loading('Deleting image...')

        try {
            const result = await deleteInspirationImageRecord(id, imageUrl)
            if (!result.success) throw new Error(result.error)

            toast.success('Image deleted', { id: toastId })

            // Instantly remove from UI locally
            if (onDelete) onDelete()

            // Re-sync with server quietly
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to delete image', { id: toastId })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-500/80 backdrop-blur-sm rounded-full text-white transition-all disabled:opacity-50 z-10"
            aria-label="Delete image"
        >
            <Trash2 size={16} />
        </button>
    )
}
