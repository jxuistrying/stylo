'use client'

import { useState } from 'react'
import { DeleteImageButton } from './DeleteImageButton'

export function ImageCard({ img }: { img: { id: string, image_url: string } }) {
    const [isDeleted, setIsDeleted] = useState(false)

    if (isDeleted) return null

    return (
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 break-inside-avoid shadow-lg shadow-black/50 cursor-pointer hover:border-zinc-600 transition-colors group">
            <DeleteImageButton
                id={img.id}
                imageUrl={img.image_url}
                onDelete={() => setIsDeleted(true)}
            />
            <img
                src={img.image_url}
                alt="Inspiration outfit"
                className="w-full h-auto object-cover"
                loading="lazy"
            />
        </div>
    )
}
