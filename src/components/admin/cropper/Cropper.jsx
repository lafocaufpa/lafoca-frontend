'use client';

import EasyCropper from 'react-easy-crop';
import { useImageCropContext } from '@/providers/ImageCropProvider';

const Cropper = () => {
  const { image, zoom, setZoom, rotation, setRotation, crop, setCrop, onCropComplete } =
    useImageCropContext();

  return (
    <EasyCropper
      image={image || undefined}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      cropShape="rect"
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      setRotation={setRotation}
      showGrid={false}
      cropSize={{ width: 200, height: 200 }}
      style={{
        containerStyle: {
          height: 220,
          width: 220,
          top: 8,
          bottom: 8,
          left: 8,
          right: 8,
        },
      }}
    />
  );
};

export default Cropper;
