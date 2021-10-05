import React, { useState, useEffect } from "react";
import { ImageClient } from "./api/image_grpc_web_pb";
import {
  HealthCheckRequest,
  ImageRequest,
  StoreImageRequest,
} from "./api/image_pb";
import axios from "axios";
import "./App.css";

const gateway_url = process.env.REACT_APP_GATEWAY_URL;
const client = new ImageClient(
  window.location.protocol + "//" + "freshlist.us"
);
//const client = new ImageClient("http://localhost:8080");
const enableDevTools = window.__GRPCWEB_DEVTOOLS__ || (() => {});
enableDevTools([client]);

const App = () => {
  // hold file in state
  const [file, setFile] = useState("");
  const [filesStream, setFilesStream] = useState([]);
  const [filesUnary, setFilesUnary] = useState([]);
  const [filesRest, setFilesRest] = useState([]);
  const [streamTime, setStreamTime] = useState();
  const [restTime, setRestTime] = useState();
  const [unaryTime, setUnaryTime] = useState();
  const getHealthCheck = () => {
    const healthCheck = new HealthCheckRequest();
  };

  const getImagesRest = () => {
    setRestTime(0);
    setFilesRest([]);
    let startTime = performance.now();
    for (let x = 0; x < 60; x++) {
      axios
        .get(`${window.location.protocol}//freshlist.us/rest/img/get`)
        .then((response) => {
          console.log(`Rest Response: ` + JSON.stringify(response.data));
          setFilesRest((filesRest) => [...filesRest, response.data.source]);
          if (x == 59) {
            let endTime = performance.now();
            setRestTime((endTime - startTime) / 1000);
          }
        });
    }
  };

  const getImageUnary = () => {
    setUnaryTime(0);
    setFilesUnary([]);
    const imageRequest = new ImageRequest();
    let startTime = performance.now();
    for (let x = 0; x < 60; x++) {
      client.getImageUnary(imageRequest, null, (err, response) => {
        if (err) {
          console.log("getImageUnary: " + JSON.stringify(err, undefined, 2));
          return;
        }
        var res = response.toObject();
        console.log("getImageUnary: " + JSON.stringify(res, undefined, 2));
        setFilesUnary((filesUnary) => [...filesUnary, response.getSource()]);
        if (x == 59) {
          let endTime = performance.now();
          setUnaryTime((endTime - startTime) / 1000);
        }
        console.log("Images Unary: " + res.ok);
      });
    }
  };
  const getImagesStream = () => {
    setStreamTime(0);
    setFilesStream([]);
    const imageRequest = new ImageRequest();
    let stream = client.getImagesStream(imageRequest, {});
    let startTime = performance.now();

    stream.on("data", (data) => {
      console.log("GOT DATA: " + data.getSource());
      setFilesStream((filesStream) => [...filesStream, data.getSource()]);
    });
    stream.on("status", function (status) {
      console.log(status.code);
      console.log(status.details);
      console.log(status.metadata);
    });
    stream.on("end", (end) => {
      let endTime = performance.now();
      console.log("End stream");
      setStreamTime((endTime - startTime) / 1000);
      console.log(`Call to getImages took ${endTime - startTime} milliseconds`);
    });
  };
  // Upload Image and save to state
  const imageUpload = (e) => {
    const file = e.target.files[0];

    const storeImageRequest = new StoreImageRequest();

    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      setFile(base64);

      storeImageRequest.setName(file.name);
      storeImageRequest.setSource(base64);
      // rest StoreImage
      axios
        .post(`${window.location.protocol}//freshlist.us/rest/img/create`, {
          name: file.name,
          source: base64,
        })
        .then((response) => console.log(`CREATE IMAGE: ${response.data}`));
      // gRPC storeImage
      client.storeImage(storeImageRequest, null, (err, response) => {
        if (err) {
          console.log(JSON.stringify(err, undefined, 2));
          return;
        }

        var res = response.toObject();
        console.log("storeImage res.ok: " + res.ok);
      });
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

  // useEffect(() => {
  //   return Promise.all([getImagesStream(),getImageUnary()])
  // }, []);
  const buttonClass = {
    borderRadius: "15px",
    boxShadow: "0 1px 1px 1px #676767",
    color: "red",
    fontWeight: 600,
    padding: "5x",
    backgroundColor: "white",
  };
  return (
    <div class="root">
      {/* <img src={file} alt="loadme" height="40px" />
      <input
        type="file"
        id="imageFile"
        name="imageFile"
        onChange={(e) => imageUpload(e)}
      />
      <br /> */}
      <b>gRPC Server Streaming</b>
      <br />
      <button style={buttonClass} onClick={() => getImagesStream()}>
        Start test
      </button>
      <br />
      Length: {filesStream.length} Time: {streamTime}
      <br />
      {filesStream.map((img) => (
        <img src={img} height="40px" />
      ))}
      <br />
      <b>gRPC Unary</b>
      <br />
      <button style={buttonClass} onClick={() => getImageUnary()}>
        Start test
      </button>
      <br />
      Length: {filesUnary.length} Time: {unaryTime}
      <br />
      {filesUnary.map((img) => (
        <img src={img} height="40px" />
      ))}
      <br />
      <b>Rest Promise.All</b>
      <br />
      <button style={buttonClass} onClick={() => getImagesRest()}>
        Start test
      </button>
      <br />
      Length: {filesRest.length} Time: {restTime}
      <br />
      {filesRest.map((img) => (
        <img src={img} height="40px" />
      ))}
    </div>
  );
};

export default App;
