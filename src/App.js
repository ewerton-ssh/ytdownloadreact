import ytdl from "ytdl-core";
import { useState } from "react";

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);

  async function downloadVideo() {
    try {
      const stream = ytdl(videoUrl, { quality: '140' }, { filter: format => format.container === "mp3" });

      let receivedBytes = 0;
      let totalBytes = 0;

      const chunks = [];
      stream.on('progress', (chunkLength, downloaded, total) => {
        receivedBytes += chunkLength;
        totalBytes = total;
        const progress = (downloaded / total) * 100;
        setDownloadProgress(progress);
      });

      stream.on('data', chunk => {
        chunks.push(chunk);
      });

      stream.on("end", () => {
        const buffer = new Blob(chunks, { type: "music/mp3" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(buffer);
        link.download = "music.mp3";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Youtube Link Video" onChange={(e) => setVideoUrl(e.target.value)}></input>
      <button onClick={downloadVideo}>Download Video</button>
      <p>Download Progress: {downloadProgress.toFixed(2)}%</p>
    </div>
  )
}
