import { createClient } from "@/lib/supabase/server";
export default async function DashboardPage() {

    const supabase = await createClient();
    const { data: images, error } = await supabase.from('inspiration_images').select();
    console.log("Supabase Test - Images found:", images);
    if (error) {
        console.error("Supabase Error:", error);
    }
    return (
        <div>
            <h1>Your Inspiration Board</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-gray-100 rounded-lg p-10">Upload Image</div>
                <div className="bg-gray-100 rounded-lg p-10">Outfit 1</div>
                <div className="bg-gray-100 rounded-lg p-10">Outfit 2</div>
            </div>
        </div>
    )
}