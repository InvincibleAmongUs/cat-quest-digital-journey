
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, FileText, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { KnowledgeBaseChapter, loadChapterFromFile } from '@/utils/knowledgeBase';
import ImagePlaceholder from '@/components/lessons/ImagePlaceholder';

interface ChapterViewerProps {
  chapterId: number;
  onNavigate?: (chapterId: number) => void;
}

export default function ChapterViewer({ chapterId, onNavigate }: ChapterViewerProps) {
  const [chapter, setChapter] = useState<KnowledgeBaseChapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      const chapterData = await loadChapterFromFile(chapterId);
      setChapter(chapterData);
      setLoading(false);
    };

    fetchChapter();
  }, [chapterId]);

  const handlePreviousChapter = () => {
    if (onNavigate && chapterId > 1) {
      onNavigate(chapterId - 1);
    }
  };

  const handleNextChapter = () => {
    if (onNavigate) {
      onNavigate(chapterId + 1);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-2/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!chapter) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Chapter content could not be loaded. Please try again later.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Reload
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">{chapter.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chapter content rendered as paragraphs */}
        {chapter.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed">
            {paragraph.trim()}
          </p>
        ))}

        {/* Display figures */}
        {chapter.images.length > 0 && (
          <div className="space-y-6 my-8">
            <h3 className="text-xl font-semibold flex items-center">
              <Image className="mr-2 h-5 w-5" /> Figures
            </h3>
            <div className="grid gap-6">
              {chapter.images.map((image) => (
                <div key={image.id}>
                  <ImagePlaceholder
                    filename={image.filename}
                    alt={image.alt}
                  />
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    Figure {image.reference}: {image.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display tables */}
        {chapter.tables.length > 0 && (
          <div className="space-y-6 my-8">
            <h3 className="text-xl font-semibold flex items-center">
              <Table className="mr-2 h-5 w-5" /> Tables
            </h3>
            <div className="grid gap-6">
              {chapter.tables.map((table) => (
                <div key={table.id}>
                  <ImagePlaceholder
                    filename={table.filename}
                    alt={table.alt}
                  />
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    Table {table.reference}: {table.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        {onNavigate && (
          <div className="flex justify-between pt-4 border-t mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousChapter}
              disabled={chapterId <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous Chapter
            </Button>
            <Button
              variant="outline"
              onClick={handleNextChapter}
            >
              Next Chapter <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
