
import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, onCrop, onCancel }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerAspectRatio = container.offsetWidth / container.offsetHeight;
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;

        let width, height;
        if (imageAspectRatio > containerAspectRatio) {
          // Image is wider than container, fit to height
          height = container.offsetHeight;
          width = height * imageAspectRatio;
        } else {
          // Image is taller or same aspect ratio, fit to width
          width = container.offsetWidth;
          height = width / imageAspectRatio;
        }
        setImageSize({ width, height });
        // Center the image initially
        setPosition({
            x: (container.offsetWidth - width) / 2,
            y: (container.offsetHeight - height) / 2
        });
      }
    };
  }, [imageUrl]);

  const getEventCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e.nativeEvent) {
      return { x: e.nativeEvent.touches[0].clientX, y: e.nativeEvent.touches[0].clientY };
    }
    return { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY };
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const coords = getEventCoordinates(e);
    setStartPos({
      x: coords.x - position.x,
      y: coords.y - position.y,
    });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const coords = getEventCoordinates(e);

    const container = containerRef.current;
    const maxX = 0;
    const minX = container.offsetWidth - imageSize.width;
    const maxY = 0;
    const minY = container.offsetHeight - imageSize.height;

    let newX = coords.x - startPos.x;
    let newY = coords.y - startPos.y;

    // Clamp position within boundaries
    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleCrop = async () => {
    if (!containerRef.current || !imageRef.current) return;
    setIsLoading(true);

    try {
        const croppedImageUrl = await new Promise<string>((resolve, reject) => {
            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = imageUrl;
            
            image.onload = () => {
                const container = containerRef.current!;
                const displayedImage = imageRef.current!;

                const scale = image.naturalWidth / displayedImage.width;
        
                const sourceX = -position.x * scale;
                const sourceY = -position.y * scale;
                const sourceWidth = container.offsetWidth * scale;
                const sourceHeight = container.offsetHeight * scale;
        
                const canvas = document.createElement('canvas');
                // Create a high-res canvas for better quality
                const targetWidth = 1920;
                const targetHeight = 1080;
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Could not get canvas context"));
                    return;
                }
        
                ctx.drawImage(
                    image,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );
                
                resolve(canvas.toDataURL('image/png'));
            };
            image.onerror = () => reject(new Error('Failed to load image for cropping.'));
        });
        onCrop(croppedImageUrl);
    } catch(err) {
        console.error("Cropping failed:", err);
        // Maybe show an error message to the user
        onCancel(); // Close modal on error
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
    >
      <div className="bg-zinc-900 rounded-lg p-4 shadow-xl w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4 text-white">이미지를 16:9로 자르기</h3>
        <div 
          ref={containerRef}
          className="relative w-full aspect-video bg-black rounded-lg overflow-hidden cursor-move border border-zinc-800"
        >
          {imageSize.width > 0 && (
             <img
                ref={imageRef}
                src={imageUrl}
                alt="Crop preview"
                className="absolute"
                style={{
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                draggable="false"
             />
          )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
            {isLoading ? <LoadingSpinner /> : (
                <>
                    <button onClick={onCancel} className="bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                        취소
                    </button>
                    <button onClick={handleCrop} className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                        자르기 확인
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};
