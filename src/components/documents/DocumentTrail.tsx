
import React from "react";
import { format } from "date-fns";
import { 
  Upload, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle,
  Clock
} from "lucide-react";

// Mock activity data
const documentActivities = [
  {
    id: "activity-1",
    type: "upload",
    userName: "Sarah Johnson",
    timestamp: new Date(Date.now() - 3600000 * 48),
    details: "Document created and uploaded"
  },
  {
    id: "activity-2",
    type: "referral",
    userName: "Sarah Johnson",
    timestamp: new Date(Date.now() - 3600000 * 47),
    details: "Referred to Legal Department",
    recipient: "Michael Brown"
  },
  {
    id: "activity-3",
    type: "comment",
    userName: "Michael Brown",
    timestamp: new Date(Date.now() - 3600000 * 24),
    details: "Added comment"
  },
  {
    id: "activity-4",
    type: "referral",
    userName: "Michael Brown",
    timestamp: new Date(Date.now() - 3600000 * 23),
    details: "Referred to Finance Department",
    recipient: "Finance Department"
  },
  {
    id: "activity-5",
    type: "status",
    userName: "System",
    timestamp: new Date(Date.now() - 3600000 * 3),
    details: "Status changed to 'In Review'"
  }
];

interface DocumentTrailProps {
  documentId: string;
}

const DocumentTrail: React.FC<DocumentTrailProps> = ({ documentId }) => {
  // Get activity icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-5 w-5 text-green-500" />;
      case "referral":
        return <ArrowRight className="h-5 w-5 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "status":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "completion":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-gov-primary">Document Trail</h3>
      <div className="space-y-6 relative">
        <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
        
        {documentActivities.map((activity, index) => (
          <div key={activity.id} className="relative z-10 flex gap-4">
            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center border-2 border-gray-200">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between">
                <span className="font-medium">{activity.userName}</span>
                <span className="text-sm text-gray-500">
                  {format(activity.timestamp, "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
              
              <p className="text-sm mt-1">{activity.details}</p>
              
              {activity.recipient && (
                <p className="text-sm text-gray-600 mt-1">
                  Recipient: {activity.recipient}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentTrail;
