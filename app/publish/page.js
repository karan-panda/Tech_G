"use client"
import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Paperclip, Image, Video, FileText, Github, Instagram, Twitter, Linkedin, Sparkles, X } from "lucide-react"
import { format } from "date-fns"

export default function PublishModal() {
  const [open, setOpen] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [date, setDate] = useState()

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[200px]",
      },
    },
  })

  const socialAccounts = [
    {
      id: 1,
      platform: "Instagram",
      username: "gauravchakrawarti2003",
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
    },
    { id: 2, platform: "Facebook", username: "gaurav-chakrawarti", icon: <Github className="w-5 h-5 text-gray-800" /> },
    { id: 3, platform: "Twitter (X)", username: "gaurav21420", icon: <Twitter className="w-5 h-5 text-blue-500" /> },
    {
      id: 4,
      platform: "LinkedIn",
      username: "gauravchakrawarti123415",
      icon: <Linkedin className="w-5 h-5 text-blue-700" />,
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#17A191] hover:bg-[#148A7E] text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            Open Publish Modal
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[95vw] w-full h-[90vh] p-4 sm:p-6 overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4 border-b">
            <h2 className="text-2xl font-bold">Publish Post</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="w-full lg:w-80 lg:border-r lg:pr-4">
              <h2 className="text-xl font-semibold text-[#17A191] mb-4">Social Profiles</h2>

              <Button className="w-full mb-6 bg-[#17A191] hover:bg-[#148A7E]">+ Connect New Profile</Button>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="all"
                    checked={selectedAccounts.length === socialAccounts.length}
                    onCheckedChange={(checked) => {
                      setSelectedAccounts(checked ? socialAccounts.map((acc) => acc.id) : [])
                    }}
                  />
                  <label htmlFor="all" className="text-sm font-medium">
                    All profiles
                  </label>
                </div>

                {socialAccounts.map((account) => (
                  <div key={account.id} className="flex items-center gap-2">
                    <Checkbox
                      id={account.id}
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={(checked) => {
                        setSelectedAccounts(
                          checked
                            ? [...selectedAccounts, account.id]
                            : selectedAccounts.filter((id) => id !== account.id),
                        )
                      }}
                    />
                    <label htmlFor={account.id} className="text-sm font-medium flex items-center gap-2">
                      {account.icon}
                      {account.username}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:px-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Post</h1>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate with AI
                </Button>
              </div>

              <EditorContent editor={editor} className="min-h-[200px] border rounded-lg p-4 mb-6" />

              <div className="flex items-center gap-4 border-t pt-4 overflow-x-auto">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <FileText className="h-5 w-5" />
                </Button>
              </div>

              <Input placeholder="Add tags" className="mt-4" />
            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-96 lg:border-l lg:pl-4">
              <h2 className="text-xl font-semibold mb-6">Customize your post</h2>

              <div className="space-y-4">
                <Input placeholder="Click to edit caption" />
                <Input placeholder="Click to edit media" />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      {date ? format(date, "PPP") : "Schedule Post Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>

                <Button className="w-full bg-[#17A191] hover:bg-[#148A7E]">Done</Button>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4 sticky bottom-0 bg-white pt-4 border-t">
            <div className="flex gap-4 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none">
                Save Draft
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                Schedule
              </Button>
            </div>
            <Button className="bg-[#17A191] hover:bg-[#148A7E] text-white w-full sm:w-auto">Publish now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
