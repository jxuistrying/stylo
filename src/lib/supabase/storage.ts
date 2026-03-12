import { createClient } from '@/lib/supabase/client'

/**
 * Uploads an image file to the Supabase 'inspirations' bucket.
 * Intended to be used on the client-side to upload directly to Supabase.
 * 
 * @param file The image file (JPEG, PNG, or WebP)
 * @returns The public URL of the uploaded image
 */
export async function uploadInspirationImage(file: File): Promise<string> {
    const supabase = createClient()

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
    }

    // Generate a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `${fileName}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
        .from('inspirations')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (uploadError) {
        console.error('Error uploading image to Supabase:', uploadError)
        throw new Error(`Failed to upload image: ${uploadError.message}`)
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
        .from('inspirations')
        .getPublicUrl(filePath)

    return publicUrl
}
