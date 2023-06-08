import { useState, useRef } from 'react';
import { uploadService } from '../services/upload.service';

export function ImgUploader({ onUploaded }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  async function handleFileChange(ev) {
    setIsUploading(true);
    const { secure_url, height, width } = await uploadService.uploadImg(ev.target.files[0]);
    setImgData({ imgUrl: secure_url, width, height });
    setIsUploading(false);
    onUploaded(secure_url);
  }

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  function getUploadButtonLabel() {
    if (imgData.imgUrl) return 'Upload Another?';
    return isUploading ? 'Uploading....' : 'Computer';
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
      <button type="button" onClick={handleButtonClick} className="img-uploader-btn">
        {getUploadButtonLabel()}
      </button>
      <input type="file" onChange={handleFileChange} accept="img/*" id="imgUpload" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
}
