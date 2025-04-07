
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Cloud, 
  File, 
  Loader2,
  X,
  Upload
} from "lucide-react";

// Mock recipient data
const recipients = [
  { id: "1", name: "John Smith", department: "Information Technology" },
  { id: "2", name: "Sarah Johnson", department: "Finance" },
  { id: "3", name: "Michael Brown", department: "Legal Affairs" },
  { id: "4", name: "Anna Williams", department: "Human Resources" },
  { id: "5", name: "James Davis", department: "Executive Office" },
  { id: "6", name: "Finance Department", department: "Department" },
  { id: "7", name: "Legal Department", department: "Department" },
  { id: "8", name: "HR Department", department: "Department" }
];

// Document types
const documentTypes = [
  "Policy Document",
  "Budget Proposal",
  "Legal Agreement",
  "Internal Memo",
  "Report",
  "Meeting Minutes",
  "Project Plan",
  "Other"
];

const DocumentUploader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [docType, setDocType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast.error("Only PDF files are allowed");
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast.error("Only PDF files are allowed");
      }
    }
  };
  
  const handleRecipientChange = (value: string) => {
    if (!selectedRecipients.includes(value)) {
      setSelectedRecipients([...selectedRecipients, value]);
    }
  };
  
  const removeRecipient = (id: string) => {
    setSelectedRecipients(selectedRecipients.filter(r => r !== id));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !docType || selectedRecipients.length === 0 || !file) {
      toast.error("Please fill in all required fields and select a document");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate upload process
    try {
      // In a real app, this would be an API call to upload the document
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Document uploaded successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error uploading document");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Share a document with other departments or individuals</CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="docType">Document Type</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger id="docType">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the document"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Recipients</Label>
            <Select onValueChange={handleRecipientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Add recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map(recipient => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.department})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedRecipients.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedRecipients.map(id => {
                  const recipient = recipients.find(r => r.id === id);
                  return recipient ? (
                    <div key={id} className="flex items-center gap-1 bg-gov-primary/10 text-gov-primary px-2 py-1 rounded-full text-sm">
                      {recipient.name}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 hover:bg-gov-primary/20 rounded-full"
                        onClick={() => removeRecipient(id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Upload Document (PDF only)</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                isDragging ? "border-gov-accent bg-gov-accent/10" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <File className="h-8 w-8 text-gov-accent" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setFile(null)}
                    className="ml-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Cloud className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Drag & drop your file here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select PDF
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gov-primary hover:bg-gov-light"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Document"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DocumentUploader;
