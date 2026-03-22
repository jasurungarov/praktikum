"use client";

import { completeLesson, getNextLesson } from "@/actions/lesson.action";
import { ILesson } from "@/app.types";
import { Button } from "@/components/ui/button";
import useTranslate from "@/hooks/use-translate";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  FastForward,
  Maximize,
  Minimize,
  Pause,
  Play,
  Rewind,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
  lesson: ILesson;
}

function VideoLesson({ lesson }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout>>();

  const { courseId } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const t = useTranslate();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
    setCurrentTime(0);
    setPlaybackRate(1);
    return () => { video.pause(); };
  }, [lesson._id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handlePlaybackRate = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) container.requestFullscreen();
    else document.exitFullscreen();
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const onEnd = async () => {
    const nextLesson = getNextLesson(lesson._id, `${courseId}`).then((res) =>
      router.push(`/dashboard/${courseId}/${res?.lessonId}?s=${res?.sectionId}`)
    );
    const completed = completeLesson(lesson._id, userId!, pathname);
    toast.promise(Promise.all([nextLesson, completed]), {
      loading: t("loading"),
      success: t("successfully"),
      error: t("error"),
    });
  };

  // Mobileda faqat muhim tezliklar
  const speeds = [0.5, 1, 1.5, 2];
  const allSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <>
      <div
        ref={containerRef}
        className="group relative aspect-video w-full overflow-hidden rounded-md bg-black max-md:sticky"
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={lesson.videoUrl}
          className="size-full"
          onClick={togglePlay}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
          onEnded={onEnd}
        />

        {/* Play overlay */}
        <div
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
          onClick={togglePlay}
        >
          {!isPlaying && (
            <div className="rounded-full bg-black/50 p-3 md:p-4">
              <Play className="size-8 text-white md:size-10" fill="white" />
            </div>
          )}
        </div>

        {/* Controls */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-6 transition-opacity duration-300 md:px-4 md:pb-3 md:pt-8 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress bar */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="mb-2 h-1 w-full cursor-pointer accent-primary md:mb-3"
          />

          {/* Mobile controls — bitta qator */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="text-white">
                {isPlaying
                  ? <Pause className="size-4" fill="white" />
                  : <Play className="size-4" fill="white" />
                }
              </button>
              {/* Skip */}
              <button onClick={() => skip(-10)} className="text-white">
                <Rewind className="size-4" />
              </button>
              <button onClick={() => skip(10)} className="text-white">
                <FastForward className="size-4" />
              </button>
              {/* Mute */}
              <button onClick={toggleMute} className="text-white">
                {isMuted || volume === 0
                  ? <VolumeX className="size-4" />
                  : <Volume2 className="size-4" />
                }
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobileda faqat 4 ta tezlik */}
              {speeds.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handlePlaybackRate(speed)}
                  className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${
                    playbackRate === speed
                      ? "bg-primary text-white"
                      : "text-white"
                  }`}
                >
                  {speed}x
                </button>
              ))}
              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="text-white">
                {isFullscreen
                  ? <Minimize className="size-4" />
                  : <Maximize className="size-4" />
                }
              </button>
            </div>
          </div>

          {/* Desktop controls — ikki qator */}
          <div className="hidden items-center justify-between md:flex">
            {/* Chap */}
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white transition-colors hover:text-primary">
                {isPlaying
                  ? <Pause className="size-5" fill="white" />
                  : <Play className="size-5" fill="white" />
                }
              </button>
              <button onClick={() => skip(-10)} className="text-white transition-colors hover:text-primary">
                <Rewind className="size-5" />
              </button>
              <button onClick={() => skip(10)} className="text-white transition-colors hover:text-primary">
                <FastForward className="size-5" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white transition-colors hover:text-primary">
                  {isMuted || volume === 0
                    ? <VolumeX className="size-5" />
                    : <Volume2 className="size-5" />
                  }
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="h-1 w-20 cursor-pointer accent-primary"
                />
              </div>
              {/* ✅ Vaqt faqat desktop da */}
              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* O'ng */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {allSpeeds.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handlePlaybackRate(speed)}
                    className={`rounded px-2 py-0.5 text-xs transition-colors ${
                      playbackRate === speed
                        ? "bg-primary text-white"
                        : "text-white hover:text-primary"
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
              <button onClick={toggleFullscreen} className="text-white transition-colors hover:text-primary">
                {isFullscreen
                  ? <Minimize className="size-5" />
                  : <Maximize className="size-5" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title + Button */}
      <div className="mt-4 flex flex-col gap-2 rounded-md bg-gradient-to-t from-background to-secondary p-4 md:flex-row md:items-center md:justify-between lg:p-6">
        <h2 className="mt-4 font-space-grotesk text-2xl font-bold">
          {lesson.title}
        </h2>
        <Button onClick={onEnd}>
          <span className="pr-2">{t("completeLesson")}</span>
          <CheckCircle size={18} />
        </Button>
      </div>
    </>
  );
}

export default VideoLesson;