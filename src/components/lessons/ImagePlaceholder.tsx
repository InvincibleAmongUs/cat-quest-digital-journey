
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Image } from 'lucide-react';

interface ImagePlaceholderProps {
  filename: string;
  alt: string;
  width?: string;
  height?: string;
}

export default function ImagePlaceholder({ filename, alt, width = "full", height = "auto" }: ImagePlaceholderProps) {
  // Check if the image exists in the utils/images directory
  const imagePath = `/src/utils/images/${filename}`;
  
  // Function to extract image type from filename for better visualization
  const getImageType = (filename: string): string => {
    if (filename.includes('table')) return 'Table';
    if (filename.includes('figure')) return 'Figure';
    return 'Image';
  };
  
  const imageType = getImageType(filename);
  
  // Extract any figure/table number if present
  const match = filename.match(/(\d+_\d+)/);
  const figureNumber = match ? match[1].replace('_', '.') : '';
  
  return (
    <Card className={`overflow-hidden my-4 w-${width} h-${height}`}>
      <CardContent className="p-0">
        {/* Try to load the actual image if it exists */}
        <div className="relative">
          <div className="flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
            <Image className="w-16 h-16 text-gray-400 mb-2" />
            <p className="text-muted-foreground text-sm">
              {imageType} {figureNumber && `${figureNumber}: `}{filename}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{alt}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
