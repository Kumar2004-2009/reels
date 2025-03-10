"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useNotification } from "./Notification";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="max-w-2xl mx-auto space-y-6 p-4"
    >
      {/* Title Input */}
      <div className="form-control">
        <label className="label font-medium mb-2">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full p-2 ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-error text-sm mt-2 block">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Description Input */}
      <div className="form-control">
        <label className="label font-medium mb-2">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className={`textarea textarea-bordered w-full h-36 ${
            errors.description ? "textarea-error" : ""
          }`}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-error text-sm mt-2 block">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Video Upload Section */}
      <div className="form-control">
  <label className="label font-medium mb-2">
    <span className="label-text">Upload Video</span>
  </label>
  {/* Wrapper for FileUpload with custom height */}
  <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg p-2 ">
    <FileUpload
      fileType="video"
      onSuccess={handleUploadSuccess}
      onProgress={handleUploadProgress}
    />
  </div>
  {uploadProgress > 0 && (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
      <div
        className="bg-primary h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${uploadProgress}%` }}
      />
    </div>
  )}
</div>

      {/* Submit Button */}
      <div className="form-control mt-8 flex justify-center">
        <button
          type="submit"
          className="btn btn-primary w-[180px] p-2"
          disabled={loading || !uploadProgress}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Publishing Video...
            </>
          ) : (
            "Publish Video"
          )}
        </button>
      </div>
    </form>
  );
}