import { login, signup } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-black">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">Welcome to Stylo</h1>
                    <p className="text-zinc-500 text-sm">Enter your email and password to continue</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-300">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl px-4 py-6"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-300">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl px-4 py-6"
                        />
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <Button
                            type="submit"
                            formAction={login}
                            className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-6 font-medium text-base h-12"
                        >
                            Log in
                        </Button>
                        <Button
                            type="submit"
                            formAction={signup}
                            variant="outline"
                            className="w-full bg-transparent border-zinc-700 text-white hover:bg-zinc-800 rounded-xl py-6 font-medium text-base h-12"
                        >
                            Sign up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
