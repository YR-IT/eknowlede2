import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const VideoCard: React.FC<{
  title: string;
  videoUrl?: string | null;
  thumbnail?: string | null;
  className?: string;
}> = ({ title, videoUrl = null, thumbnail = null, className = "" }) => {
  const [, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>("00:00");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    if (videoUrl) setIsPlaying(true);
  };

  const handleMetadataLoaded = () => {
    if (videoRef.current?.duration) {
      setDuration(formatDuration(videoRef.current.duration));
    }
  };

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <div className="bg-white rounded-3xl p-4 shadow-xl flex flex-col h-full overflow-hidden">
        <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
          {isPlaying && videoUrl ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                poster={thumbnail || undefined}
                onLoadedMetadata={handleMetadataLoaded}
              >
                {videoUrl && <source src={videoUrl} type="video/mp4" />}
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Play className="w-12 h-12 text-white opacity-90" />
              </div>
            </>
          )}
          <div className="absolute top-2 right-2 bg-white text-rose-700 text-xs font-semibold px-2 py-0.5 rounded shadow">
            {duration}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <h4 className="text-base font-bold text-gray-800 text-center mb-4 px-2">{title}</h4>
          <Link to="/enroll" className="mt-auto">
            <button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-2 rounded-full text-sm font-semibold shadow-md hover:from-pink-700 hover:to-rose-700 transition-all">
              ENROLL NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
