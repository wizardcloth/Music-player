import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {  Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
function PlayMenu() {
  const { isPlaying, currentSong, togglePlay, playNext, playPrevious } = usePlayerStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setduration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  

  useEffect(() => {
    audioRef.current = document.querySelector('audio');
    // console.log(audioRef);
    const audio = audioRef.current;
    // console.log(audio);
    // console.log(currentSong)
    const updateTime = () => {
      setcurrentTime(audio?.currentTime || 0);
      setduration(audio?.duration || 0);
    }
    audio?.addEventListener('timeupdate', updateTime);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
      playNext();
    }

    audio?.addEventListener('ended', handleEnded);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('ended', handleEnded);
    }
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value[0];
  }
  return (
    <footer className="flex ">
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 mx-2 px-6 py-3 flex items-center justify-between  rounded-md z-50">
        <div className="hidden md:flex items-center min-w-[150px] w-[8%] ">
          {
            currentSong && (
              <>
                <img src={`${currentSong?.imageUrl}`} alt="img" className="size-8 object-cover rounded-md" />
                <div className="flex flex-col ml-2 truncate hover:cursor-pointer">
                  <h1 className="font-bold text-sm">{currentSong?.title}</h1>
                  <h1 className="text-xs">{currentSong?.artist}</h1>
                </div>
              </>
            )
          }
        </div>
        {/* player controls*/}
        <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
          <div className='flex items-center gap-4 sm:gap-6'>
            <Button
              size='icon'
              variant='ghost'
              className='hidden sm:inline-flex hover:text-white text-zinc-400'
              name="shuffle"
            >
              <Shuffle className='h-4 w-4'  />
            </Button>

            <Button
              size='icon'
              variant='ghost'
              className='hover:text-white text-zinc-400'
              onClick={playPrevious}
              disabled={!currentSong}
              name="skipback"
            >
              <SkipBack className='h-4 w-4' />
            </Button>

            <Button
              size='icon'
              className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
              onClick={togglePlay}
              disabled={!currentSong}
              name="playpause"
            >
              {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='hover:text-white text-zinc-400'
              onClick={playNext}
              disabled={!currentSong}
              name="skipforward"
            >
              <SkipForward className='h-4 w-4' />
            </Button>
            <Button
              size='icon'
              variant='ghost'
              className='hidden sm:inline-flex hover:text-white text-zinc-400'
              name="repeat"
            >
              <Repeat className='h-4 w-4' />
            </Button>
          </div>

          <div className='hidden sm:flex items-center gap-2 w-full'>
            <div className='text-xs text-zinc-400'>{formatTime(currentTime)}</div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className='w-full hover:cursor-grab active:cursor-grabbing'
              onValueChange={handleSeek}
              name="slider"
            />
            <div className='text-xs text-zinc-400'>{formatTime(duration)}</div>
          </div>
        </div>
        {/* volume controls */}
        <div className='hidden sm:flex items-center gap-4 min-w-[10rem] justify-end'>
          
          <div className='flex items-center gap-2'>
            <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400' name="volume">
              <Volume1 className='h-4 w-4' />
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className='w-24 hover:cursor-grab active:cursor-grabbing'
              name="volume slider"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>                  
    </footer >
  )
}

export default PlayMenu