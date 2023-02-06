import ytdl from "ytdl-core";
import React  from "react";


class App extends React.Component {
  state = {
    downloadProgress: 0
  };

  downloadVideo = async () => {

    

    try {
      const videoUrl = "https://www.youtube.com/watch?v=qU9mHegkTc4";
      
      const stream = ytdl(videoUrl, {quality: 'highest'}, {filter: format => format.container === "mp4"});

      
    
      const chunks = [];
      stream.on('data', chunk => {
        chunks.push(chunk);
        this.setState({
          downloadProgress: stream.progress
        });
      });

      

    
      stream.on("end", () => {
        const buffer = new Blob(chunks, { type: "video/mp4" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(buffer);
        link.download = "video.mp4";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.error(error);
    }

    
  };
  

  render() {
    return (
      <div>
        <button onClick={this.downloadVideo}>Download Video</button>
        <p>Download Progress: {this.state.downloadProgress}</p>
      </div>
    );
  }
}

export default App;