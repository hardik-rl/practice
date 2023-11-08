import React, { useState } from "react";
import Spinner from "../../components/Spinner";

const ImgLoad = ({ imgPath }) => {
  const [imgLoaded, setImgLoaded] = useState(true);
  const imgLoad = () => {
    setImgLoaded(false);
  };
  return (
    <div style={{position: "relative"}}>
      {imgLoaded && <Spinner clasName="spinner-sm"/>}
      <img onLoad={imgLoad} width={50} height={50} src={imgPath} alt="test" />
    </div>
  );
};

export default ImgLoad;
