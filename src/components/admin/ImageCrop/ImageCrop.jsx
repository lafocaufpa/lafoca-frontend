'use client';

import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import user1 from '@images/default_user.png';
import Modal from '@components/admin/ImageCropModal/Modal';
import { readFile } from '@components/utils/HelperCropImage';
import ImageCropModalContent from '@components/admin/imageCropModalComponent/ImageCropModalComponent';
import { useImageCropContext } from '@/providers/ImageCropProvider';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/display-name
const ImageCrop = forwardRef(({ photo, setPhoto }, ref) => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(user1);
  const fileInputRef = useRef(null);

  const { getProcessedImage, setImage, resetStates } = useImageCropContext();

  useEffect(() => {
    if (photo && typeof photo === 'string') {
      setPreview(photo);
    } else if (photo) {
      setPreview(URL.createObjectURL(photo));
    }
  }, [photo]);

  const handleDone = async () => {
    const avatar = await getProcessedImage();
    setPhoto(avatar);
    setPreview(URL.createObjectURL(avatar));
    resetStates();
    setOpenModal(false);
    resetFileInput();
  };

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    if (!file) return;

    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    resetStates();
    resetFileInput();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.type = 'text';
      fileInputRef.current.type = 'file';
    }
  };

  const resetImageCrop = () => {
    setPreview(user1);
    setPhoto(null);
    resetFileInput();
  };

  useImperativeHandle(ref, () => ({
    resetImageCrop,
  }));

  return (
    <div className="bg-light w-25 d-flex justify-content-center align-items-center">
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="d-none"
        id="avatarInput"
        accept="image/*"
      />
      <label htmlFor="avatarInput" role='button'>
        <Image
          src={preview}
          height={192}
          width={192}
          className="img-fluid"
          alt=""
        />
      </label>

      <Modal open={openModal} handleClose={handleClose}>
        <ImageCropModalContent handleDone={handleDone} handleClose={handleClose} />
      </Modal>
    </div>
  );
});

export default ImageCrop;
