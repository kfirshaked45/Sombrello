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

  async function uploadImg(ev) {
    setIsUploading(true);
    const { secure_url, height, width, original_filename, format } = await uploadService.uploadImg(ev);

    // Generate additional properties
    const uploadedAt = new Date(); // Current date and time
    const imageName = original_filename + '.' + format; // Combine the original filename and format

    // Create the updated image object
    const updatedImgData = {
      imgUrl: secure_url,
      height,
      width,
      uploadedAt,
      imageName,
    };

    setImgData(updatedImgData);
    setIsUploading(false);
    onUploaded(updatedImgData);
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
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" ref={fileInputRef} style={{ display: 'none' }} />
    </div>
  );
}
