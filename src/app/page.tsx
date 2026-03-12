import { createClient } from "@supabase/supabase-js"

nimport { createClient } from '@/lib/supabase/server'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-black">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Stylo</h1>
        <p className="text-zinc-500">Welcome, {user?.email || 'User'}</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-40 bg-zinc-900 rounded-xl animate-pulse"></div>
          <div className="h-60 bg-zinc-900 rounded-xl animate-pulse"></div>
          <div className="h-60 bg-zinc-900 rounded-xl animate-pulse -mt-20"></div>
          <div className="h-40 bg-zinc-900 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
