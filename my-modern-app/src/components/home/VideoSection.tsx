const VideoSection = () => {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <video 
              className="w-full h-auto rounded-lg shadow-lg" 
              controls 
              autoPlay 
              muted 
              loop
            >
              <source src="img/videos/bp_siroco.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    );
  };
  
  export default VideoSection;