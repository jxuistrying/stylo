export default function DashboardPage() {
    return (
        <div>
            <h1>Your Inspiration Board</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 rounded-lg p-6">Upload Image</div>
                <div className="bg-gray-100 rounded-lg p-6">Outfit 1</div>
                <div className="bg-gray-100 rounded-lg p-6">Outfit 2</div>
            </div>
        </div>
    )
}