'use client';

import { readFile } from '@components/utils/HelperCropImage';
import { useImageCropContext } from '@/providers/ImageCropProvider';
import Button from '@components/admin/ImageCropModal/Button';
import Cropper from '@components/admin/cropper/Cropper';
import { RotationSlider, ZoomSlider } from '@components/admin/cropper/Sliders';
import styles from './ImageCropModalComponent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ImageCropModalContent = ({ handleDone, handleClose }) => {
  const { setImage, getProcessedImage } = useImageCropContext();

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    if (!file) return;

    try {
      const imageDataUrl = await readFile(file);
      setImage(imageDataUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const processedImage = await getProcessedImage();
    handleDone(processedImage);
  };

  return (
    <div className="text-center position-relative">
      <div className="border border-dashed border-secondary p-4 rounded">
        <div className="d-flex justify-content-center">
          <div className={`${styles.cropContainer} mb-4`}>
            <Cropper />
          </div>
        </div>
        <ZoomSlider className="mb-4" />
        <RotationSlider className="mb-4" />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="d-none"
          id="avatarInput"
          accept="image/*"
        />

        <Button variant="light" className="shadow w-50 mb-4 hover-shadow">
          <label htmlFor="avatarInput" className="d-block mb-0">Escolha outra foto</label>
        </Button>
        <div className="d-flex gap-2  justify-content-end">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;