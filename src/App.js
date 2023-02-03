import ytdl from "ytdl-core";
import { useState } from "react";



function App() {

  
  const [url, setUrl] = useState('');

  async function download(e) {
    e.preventDefault();
    if (url === '') {
    alert('Preencha o campo do link!')
  }else{
    ytdl(url)
    .pipe(fs.createWriteStream('video.mp4'));
  }
}

  return (
    <div className="App">
      <h1>YouTube Download</h1>
        <input type='text' placeholder="Cole seu link do youtube aqui" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button onClick={download}>Download</button>
    </div>
  );
}

export default App;
