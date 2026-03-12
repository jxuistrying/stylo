import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { ImageCard } from '@/components/ImageCard'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = await createClient()

  // Grab the user to fetch *their* specific images
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch images from the DB for this user, ordered by newest first
  const { data: images, error } = await supabase
    .from('inspiration_images')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  // Error handling just in case (e.g. table not created yet)
  if (error) {
    console.error("Error fetching images:", error)
  }

  // Determine if we have any images to show
  const hasImages = images && images.length > 0

  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-4 pt-12 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Your Inspiration</h1>
        <p className="text-zinc-500 mt-1 text-sm">Select an outfit to stylize.</p>
      </div>

      {hasImages ? (
        // Pinterest-style Masonry Layout
        <div className="columns-2 gap-4 space-y-4">
          {images.map((img: any) => (
            <ImageCard key={img.id} img={img} />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex-1 flex flex-col items-center justify-center -mt-12 text-center">
          <div className="p-6 bg-zinc-900 rounded-full mb-6">
            <PlusCircle strokeWidth={1} className="w-12 h-12 text-zinc-500" />
          </div>
          <h2 className="text-xl font-medium text-white mb-2">No inspiration found</h2>
          <p className="text-zinc-500 text-sm mb-8 px-8">
            Start building your collection by uploading outfits you want to recreate.
          </p>
          <Link
            href="/upload"
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
          >
            Upload first image
          </Link>
        </div>
      )}
    </div>
  )
}
