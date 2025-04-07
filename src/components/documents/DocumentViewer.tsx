
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  Download,
  Loader
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DocumentViewerProps {
  documentUrl: string;
  title: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentUrl, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // In a real app, get this from PDF.js
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate document loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [documentUrl]);
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25);
    }
  };
  
  const handleZoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25);
    }
  };
  
  const handlePrint = () => {
    // In a real app, implement print functionality using PDF.js
    console.log("Print document");
  };
  
  const handleDownload = () => {
    // In a real app, implement download functionality
    console.log("Download document");
  };
  
  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-white">
      <div className="border-b p-3 flex justify-between items-center">
        <h3 className="font-medium truncate">{title}</h3>
        
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom out</TooltipContent>
            </Tooltip>
            
            <span className="text-sm">{zoom}%</span>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom in</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotate</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-100 relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader className="h-8 w-8 animate-spin mx-auto text-gov-accent" />
              <p className="mt-2 text-sm text-gray-500">Loading document...</p>
            </div>
          </div>
        ) : (
          <div className="p-6 flex justify-center min-h-full">
            {/* In a real app, use PDF.js to render the actual PDF */}
            <div 
              className="bg-white shadow-lg rounded border" 
              style={{ 
                width: `${8.5 * zoom/100}in`, 
                height: `${11 * zoom/100}in`,
                transform: `scale(${zoom/100})`,
                transformOrigin: 'top center'
              }}
            >
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-6">{title}</h3>
                  <p className="mb-4 text-gray-700">This is a placeholder for the PDF content.</p>
                  <p className="text-gray-500">In a real application, the actual PDF would be rendered here using a library like PDF.js.</p>
                  <div className="mt-8 p-4 border rounded-md">
                    <p className="text-sm text-gray-600">Document ID: DOC-12345</p>
                    <p className="text-sm text-gray-600">Date: April 7, 2025</p>
                    <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-2 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage <= 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentViewer;
