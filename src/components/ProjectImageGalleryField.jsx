import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/cloudinaryUpload";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

export default function ProjectImageGalleryField({
  image,
  gallery,
  onChange,
  disabled,
}) {
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      onChange({ image: url, gallery });
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadImage(file);
        uploadedUrls.push(url);
      }
      onChange({ image, gallery: [...gallery, ...uploadedUrls] });
    } catch (err) {
      console.error("Gallery upload error:", err);
    }
  };

  const removeGalleryImage = (idx) => {
    const next = gallery.filter((_, i) => i !== idx);
    onChange({ image, gallery: next });
  };

  return (
    <div className="space-y-8 border p-4 rounded-md bg-muted-foreground/10">
      {/* COVER IMAGE */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Cover Image</Label>
        {image ? (
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <img
              src={image}
              alt="cover"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500/70 rounded-full p-1"
              onClick={() => onChange({ image: "", gallery })}
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={() => fileInputRef.current.click()}
            disabled={disabled}
          >
            Select Cover Image
          </Button>
        )}
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={disabled}
        />
      </div>

      {/* GALLERY IMAGES */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Gallery</Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => galleryInputRef.current.click()}
            disabled={disabled}
          >
            Add Gallery Images
          </Button>
          <Input
            type="file"
            ref={galleryInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleGalleryUpload}
            disabled={disabled}
          />
        </div>

        {gallery.length > 0 && (
          <div className="relative w-full">
            <Carousel className="w-full">
              <CarouselContent className="gap-4">
                {gallery.map((url, idx) => (
                  <CarouselItem
                    key={idx}
                    className="relative rounded-md overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`Gallery ${idx}`}
                      className="w-full h-[400px] object-contain"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500/70 rounded-full p-1"
                      onClick={() => removeGalleryImage(idx)}
                      disabled={disabled}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary dark:bg-primary" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary dark:bg-primary" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
