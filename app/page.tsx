"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link'; // Import Link from next/link

export default function Home() {
  const [interests, setInterests] = useState('');
  const [contentType, setContentType] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [copyText, setCopyText] = useState('Copy');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/generate-bio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ interests, contentType }),
    });
    if (response.ok) {
      const data = await response.json();
      setGeneratedBio(data.bio);
    } else {
      console.error('Failed to generate bio');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedBio);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy'), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#ff6b6b] to-[#ffa500] text-white">
      <div className="max-w-2xl w-full px-6 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-['Pacifico'] font-bold">TikTok Bio Generator</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Create unique, creative, and fun TikTok bios instantly!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/10 rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-white">
              Interests:
            </label>
            <input
              id="interests"
              name="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="block w-full rounded-md bg-white/10 border-transparent focus:border-transparent focus:ring-2 focus:ring-[#ffa500] text-white placeholder:text-white/50 p-3"
              placeholder="Your interests"
            />
          </div>
          <div>
            <label htmlFor="contentType" className="block text-sm font-medium text-white">
              Content Type:
            </label>
            <input
              id="contentType"
              name="contentType"
              type="text"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="block w-full rounded-md bg-white/10 border-transparent focus:border-transparent focus:ring-2 focus:ring-[#ffa500] text-white placeholder:text-white/50 p-3"
              placeholder="Type of content you create"
            />
          </div>
          <Button type="submit" className="w-full">Generate My Bio</Button>
        </form>
        {generatedBio && (
          <div className="bg-white rounded-lg p-6 text-black border border-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Your TikTok Bio:</p>
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copyText}
              </Button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg">{generatedBio}</p>
            </div>
          </div>
        )}
      </div>
      <footer className="w-full bg-white/10 py-6 text-center text-sm text-muted-foreground">
        <div>© 2024 TikTok Bio Generator. All rights reserved.</div>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
