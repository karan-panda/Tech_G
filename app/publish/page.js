"use client"
import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sparkles, X } from "lucide-react"
import { format } from "date-fns"

export default function PublishModal() {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [date, setDate] = useState()
  const [showAIInput, setShowAIInput] = useState(false)
  const [aiPrompt, setAIPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px]",
      },
    },
  })

  const handleGenerateAIContent = async () => {
    if (!aiPrompt.trim()) return

    setLoading(true)

    try {
      const response = await fetch(
        `https://karanpanda.app.n8n.cloud/webhook-test/cbb102e5-5db5-4192-9437-4130576c13d5?prompt=${encodeURIComponent(aiPrompt)}`
      )

      const data = await response.json()

      if (data?.content) {
        editor?.commands.setContent(data.content) // Set AI-generated content
      }
    } catch (error) {
      console.error("AI Generation failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-4 sm:p-6 overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4 border-b">
            <h2 className="text-2xl font-bold">Publish Post</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Post Content */}
            <div className="flex-1 lg:px-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Post</h1>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  onClick={() => setShowAIInput(!showAIInput)}
                >
                  <Sparkles className="h-5 w-5" /> Generate with AI
                </Button>
              </div>

              {showAIInput && (
                <div className="mb-6 space-y-4">
                  <Input 
                    placeholder="Enter AI prompt" 
                    value={aiPrompt} 
                    onChange={(e) => setAIPrompt(e.target.value)} 
                  />
                  <Button 
                    className="w-full bg-[#17A191] hover:bg-[#148A7E] flex justify-center items-center"
                    onClick={handleGenerateAIContent}
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate AI Content"}
                  </Button>
                </div>
              )}

              <EditorContent editor={editor} className="min-h-[200px] border rounded-lg p-4 mb-6" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
