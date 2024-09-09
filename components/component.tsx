// @see https://v0.dev/t/mzH2z95SqNn

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] text-white">
      <div className="max-w-2xl w-full px-6 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-['Pacifico'] font-bold">TikTok Bio Generator</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Create unique, creative, and fun TikTok bios instantly!
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="bio-input" className="block text-sm font-medium text-white">
              Tell us about yourself:
            </label>
            <textarea
              id="bio-input"
              rows={3}
              className="block w-full rounded-md bg-white/10 border-transparent focus:border-transparent focus:ring-2 focus:ring-[#ffa500] text-white placeholder:text-white/50 p-3"
              placeholder="Interests, content type, personality, etc."
            />
          </div>
          <Button className="w-full">Generate My Bio</Button>
        </div>
        <div className="bg-white/10 rounded-lg p-6 text-center">
          <p className="text-lg font-medium">Your TikTok Bio:</p>
          <p className="text-lg">
            &quot;I&apos;m a fun-loving, creative content creator who loves [interests] and making [content type] that brings joy
            to my followers! Let&apos;s connect 🥳&quot;
          </p>
        </div>
      </div>
      <footer className="w-full bg-white/10 py-6 text-center text-sm text-muted-foreground">
        <div>© 2024 TikTok Bio Generator. All rights reserved.</div>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  )
}