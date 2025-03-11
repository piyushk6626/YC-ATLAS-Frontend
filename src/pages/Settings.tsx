
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [pineconeApiKey, setPineconeApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const { toast } = useToast();

  // Load existing keys on component mount
  useEffect(() => {
    const storedPineconeKey = localStorage.getItem('PINECONE_API_KEY');
    const storedOpenaiKey = localStorage.getItem('OPENAI_API_KEY');
    
    if (storedPineconeKey) setPineconeApiKey(storedPineconeKey);
    if (storedOpenaiKey) setOpenaiApiKey(storedOpenaiKey);
  }, []);

  const saveApiKeys = () => {
    // Save keys to localStorage
    localStorage.setItem('PINECONE_API_KEY', pineconeApiKey);
    localStorage.setItem('OPENAI_API_KEY', openaiApiKey);
    
    toast({
      title: "Settings saved",
      description: "Your API keys have been saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Enter your API keys for the search functionality. These keys will be stored in your browser's local storage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pinecone-api-key">Pinecone API Key</Label>
              <Input
                id="pinecone-api-key"
                type="password"
                value={pineconeApiKey}
                onChange={(e) => setPineconeApiKey(e.target.value)}
                placeholder="Enter your Pinecone API key"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="openai-api-key">OpenAI API Key</Label>
              <Input
                id="openai-api-key"
                type="password"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
              />
            </div>
            
            <Button onClick={saveApiKeys} className="w-full">
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
