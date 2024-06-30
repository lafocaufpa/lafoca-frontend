import React from 'react';
import ImageCropProvider from '@/providers/ImageCropProvider';
import ImageCrop from '@components/admin/ImageCrop/ImageCrop';

const PhotoSelector = ({ photo, setPhoto, imageCropRef, handleRemovePhoto }) => {
  return (
    <div className="form-group mb-3">
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <label htmlFor="photo" className="fw-bold mb-1">Selecione uma foto</label>
        <ImageCropProvider>
          <ImageCrop photo={photo} setPhoto={setPhoto} ref={imageCropRef} />
        </ImageCropProvider>
        {photo && (
          <button type="button" className="btn btn-danger mt-3" onClick={handleRemovePhoto}>
            Remover Foto
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoSelector;
