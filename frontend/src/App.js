import React, { useState, useEffect } from "react";
import { ImageClient } from "./api/image_grpc_web_pb";
import {
  HealthCheckRequest,
  ImageRequest,
  StoreImageRequest,
} from "./api/image_pb";

const gateway_url = process.env.REACT_APP_GATEWAY_URL;
const client = new ImageClient(window.location.protocol + "//" + "freshlist.us");
//const client = new ImageClient("http://localhost:8080");
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
enableDevTools([client]);

const App = () => {
  // hold file in state
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([])
  const getHealthCheck = () => {
    const healthCheck = new HealthCheckRequest()
    
  }

  const getImages = () => {
    const imageRequest = new ImageRequest()
    let stream = client.getImagesStream(imageRequest, {})
    var startTime = performance.now()
   
    stream.on("data", data => {
        console.log("GOT DATA: "+data.getSource())
        setFiles(files=>[...files, data.getSource()])
    })
    stream.on('status', function(status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end",end =>{
      var endTime = performance.now()
      console.log("End stream")
      console.log(`Call to getImages took ${endTime - startTime} milliseconds`)
    })
  }
  // Upload Image and save to state
  const imageUpload = (e) => {
    const file = e.target.files[0];

    const storeImageRequest = new StoreImageRequest()
   
  

    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      setFile(base64);
      
      storeImageRequest.setName(file.name)
      storeImageRequest.setSource(base64)

      client.storeImage(storeImageRequest, null, (err, response) => {
        if (err){
          alert(JSON.stringify(err,undefined,2))
          return
        }
  
        var res = response.toObject()
        alert(res.ok)
      })
      console.debug("file stored", base64);
    });
  };

  // Read uploaded file as base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  useEffect(()=>{
    getImages()
  },[])
  return (
    <div>
      <img src={file} alt="loadme" height="40px" />
 
      <input
        type="file"
        id="imageFile"
        name="imageFile"
        onChange={(e) => imageUpload(e)}
      />
      {files.length}
      <br />
      <b>gRPC Server Streaming</b><br />
      {files.map(img=><img src={img} height="40px" />)}
    </div>
  );
};

export default App;
