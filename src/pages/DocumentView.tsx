
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import DocumentViewer from "@/components/documents/DocumentViewer";
import CommentSection from "@/components/documents/CommentSection";
import DocumentTrail from "@/components/documents/DocumentTrail";
import ReferralModal from "@/components/documents/ReferralModal";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle,
  MoreHorizontal,
  Download
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock document data
const mockDocument = {
  id: "doc-1",
  title: "Budget Proposal FY 2024",
  status: "in-review",
  url: "/sample.pdf", // In a real app, this would be an actual URL
  createdBy: "Sarah Johnson",
  createdAt: new Date(Date.now() - 3600000 * 48),
  department: "Finance",
  description: "Annual budget proposal for the upcoming fiscal year with departmental allocations and projected expenditures."
};

const DocumentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState(mockDocument);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  
  const handleReferDocument = (recipientId: string, note: string) => {
    // In a real app, make API call to refer the document
    console.log(`Referring document to recipient ID: ${recipientId}`);
    console.log(`Referral note: ${note}`);
    
    // Update document status
    setDocument({
      ...document,
      status: "referred"
    });
  };
  
  const handleChangeStatus = (newStatus: string) => {
    // In a real app, make API call to update status
    setDocument({
      ...document,
      status: newStatus
    });
    
    toast.success(`Document status updated to ${newStatus}`);
  };
  
  const handleCompleteDocument = () => {
    // In a real app, make API call to mark as complete
    setDocument({
      ...document,
      status: "completed"
    });
    
    toast.success("Document has been marked as completed");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gov-primary">{document.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`document-status status-${document.status}`}>
                {document.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
              <span className="text-sm text-gray-500">
                {document.department} • ID: {id}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            <Button 
              className="bg-gov-primary hover:bg-gov-light flex items-center gap-2"
              onClick={() => setIsReferralModalOpen(true)}
            >
              <ArrowRight className="h-4 w-4" />
              Refer Document
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleChangeStatus("pending")}>
                  Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleChangeStatus("in-review")}>
                  Mark as In Review
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCompleteDocument} className="text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[calc(100vh-16rem)]">
            <DocumentViewer 
              documentUrl={document.url} 
              title={document.title} 
            />
          </div>
          
          <div className="h-[calc(100vh-16rem)] flex flex-col">
            <div className="bg-white rounded-md shadow-sm flex-1">
              <CommentSection documentId={id || ""} />
            </div>
          </div>
        </div>
        
        <div>
          <DocumentTrail documentId={id || ""} />
        </div>
      </div>
      
      <ReferralModal
        documentId={id || ""}
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        onReferral={handleReferDocument}
      />
    </Layout>
  );
};

export default DocumentView;
