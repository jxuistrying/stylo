'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInspirationImageRecord(imageUrl: string) {
    try {
        const supabase = await createClient()

        // Grab the current authenticated user's ID
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return { success: false, error: 'User is not authenticated or session expired.' }
        }

        // Insert a new row into the 'inspiration_images' table
        const { data, error } = await supabase
            .from('inspiration_images')
            .insert({
                user_id: user.id,
                image_url: imageUrl,
            })
            .select()
            .single()

        if (error) {
            console.error('Error inserting row into inspiration_images:', error)
            return { success: false, error: error.message }
        }

        // Optionally revalidate paths so UI updates if needed
        revalidatePath('/dashboard')
        revalidatePath('/collection')

        return { success: true, data }
    } catch (error) {
        console.error('Unexpected error in createInspirationImageRecord:', error)
        return { success: false, error: 'An unexpected system error occurred while saving the record.' }
    }
}

export async function deleteInspirationImageRecord(id: string, imageUrl: string) {
    try {
        const supabase = await createClient()

        // 1. Verify user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { success: false, error: 'Not authenticated' }

        // 2. Delete from database
        const { data: deletedRow, error: dbError } = await supabase
            .from('inspiration_images')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id) // Ensure they only delete their own image
            .select()

        if (dbError) throw new Error(dbError.message)

        if (!deletedRow || deletedRow.length === 0) {
            console.warn('0 rows deleted from database (either already deleted, or RLS blocked it). Proceeding to storage cleanup just in case.')
        }

        // 3. Extract filename from URL and delete from storage bucket
        const urlParts = imageUrl.split('/')
        const fileName = urlParts[urlParts.length - 1]

        if (fileName) {
            const { error: storageError } = await supabase.storage
                .from('inspirations')
                .remove([fileName])

            if (storageError) {
                console.warn('Image record deleted, but failed to remove file from storage:', storageError)
            }
        }

        revalidatePath('/')
        return { success: true }
    } catch (error: any) {
        console.error('Error deleting image:', error)
        return { success: false, error: error.message || 'Failed to delete image' }
    }
}
