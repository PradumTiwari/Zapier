const HeroVideo = () => {
  return (
    <div className=" pt-10 relative flex justify-center ">
      <iframe
        className="w-[900px] h-[600px] pointer-events-none muted"
        width="900"
        height="600"
        src="https://www.youtube.com/embed/C0zMWogztQs?autoplay=1&loop=1&controls=0&modestbranding=1&showinfo=0&rel=0&playsinline=1&mute=1&iv_load_policy=3"
        title="YouTube video player"
        frameBorder="0"
        
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <div className="absolute inset-0 pointer-events-none bg-transparent"></div>
    </div>
  );
};

export default HeroVideo;
