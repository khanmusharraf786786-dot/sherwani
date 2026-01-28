import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Send, Image as ImageIcon, User } from 'lucide-react';

// Initialize Supabase client
// Validate environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export default function CustomizationChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Subscribe to real-time messages
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' }, 
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // 2. Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. Handle Text Submission
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('messages').insert([
      { content: newMessage, sender_type: 'user' }
    ]);

    if (error) {
        console.error('Error sending message:', error);
    } else {
        setNewMessage('');
    }
  };

  // 4. Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `customization-requests/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('chat-images')
      .upload(filePath, file);

    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        setUploading(false);
        return;
    }

    const { data } = supabase.storage.from('chat-images').getPublicUrl(filePath);
    
    const { error: msgError } = await supabase.from('messages').insert([
    { image_url: data.publicUrl, sender_type: 'user' }
    ]);
    
    if (msgError) {
        console.error('Error sending image message:', msgError);
    }

    setUploading(false);
  };

  return (
    <section id="custom-design" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Design Studio</h2>
          <p className="text-gray-600">Chat directly with our lead designers to customize your Sherwani.</p>
        </div>

        <div className="border rounded-2xl shadow-lg flex flex-col h-[600px] bg-gray-50">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white rounded-t-2xl flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="text-amber-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Artisan Designer</p>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender_type === 'user' ? 'bg-amber-600 text-white' : 'bg-white border text-gray-800'
                }`}>
                  {msg.content && <p>{msg.content}</p>}
                  {msg.image_url && (
                    <img src={msg.image_url} alt="Design reference" className="rounded-lg mt-2 max-h-60 w-full object-cover" />
                  )}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t rounded-b-2xl flex gap-2">
            <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ImageIcon className="text-gray-500" />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            </label>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Describe your dream design..."
              className="flex-1 border-none focus:ring-0 text-gray-700 outline-none"
            />
            <button type="submit" className="bg-amber-600 text-white p-2 rounded-full hover:bg-amber-700 transition-colors">
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
