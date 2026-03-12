'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ImagePlus, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { uploadInspirationImage } from '@/lib/supabase/storage'
import { createInspirationImageRecord } from '@/lib/actions'

export default function UploadPage() {
    const router = useRouter()
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleAreaClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const toastId = toast.loading('Uploading image...')

        try {
            // 1. Upload to Supabase Storage
            const imageUrl = await uploadInspirationImage(file)

            // 2. Insert into database
            const result = await createInspirationImageRecord(imageUrl)

            if (!result.success) {
                throw new Error(result.error)
            }

            toast.success('Upload complete!', { id: toastId })

            // 3. Redirect to dashboard
            router.push('/')
            router.refresh()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'Failed to upload image', { id: toastId })
            // Reset input so they can try again
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-black text-white px-4 pt-12 pb-24">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold tracking-tight">Upload Inspiration</h1>
                <p className="text-zinc-500 mt-2 text-sm">Select an outfit you want to recreate.</p>
            </div>

            <div
                onClick={handleAreaClick}
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-[32px] transition-all duration-200 ${isUploading
                        ? 'border-zinc-800 bg-zinc-900/50'
                        : 'border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 active:bg-zinc-800 cursor-pointer'
                    }`}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center justify-center gap-4 text-zinc-400">
                        <Loader2 className="w-16 h-16 animate-spin text-zinc-500" />
                        <p className="text-lg font-medium text-zinc-300">Processing...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-zinc-400">
                        <div className="p-6 bg-zinc-900 rounded-full">
                            <ImagePlus strokeWidth={1.5} className="w-16 h-16 text-white" />
                        </div>
                        <p className="text-2xl font-medium text-white">Tap to select</p>
                        <p className="text-base">from Camera Roll</p>
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
        </div>
    )
}
