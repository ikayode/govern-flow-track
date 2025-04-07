
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

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

interface ReferralModalProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
  onReferral: (recipientId: string, note: string) => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({
  documentId,
  isOpen,
  onClose,
  onReferral
}) => {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async () => {
    if (!selectedRecipient) {
      toast.error("Please select a recipient");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onReferral(selectedRecipient, note);
      toast.success("Document referred successfully");
      
      // Reset and close
      setSelectedRecipient("");
      setNote("");
      onClose();
    } catch (error) {
      toast.error("Failed to refer document");
      console.error("Referral error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClose = () => {
    setSelectedRecipient("");
    setNote("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Refer Document</DialogTitle>
          <DialogDescription>
            Forward this document to another officer or department for review
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map(recipient => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.department})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add instructions or context for the recipient"
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            className="bg-gov-primary hover:bg-gov-light"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Referring...
              </>
            ) : (
              "Refer Document"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralModal;
