'use client';

import { useImageCropContext } from '@/providers/ImageCropProvider';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MinusIcon,
  PlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ZoomSlider = ({ className }) => {
  const { zoom, setZoom, handleZoomIn, handleZoomOut, max_zoom, min_zoom, zoom_step } =
    useImageCropContext();

  return (
    <div className={classNames(className, 'd-flex align-items-center justify-content-center gap-2')}>
      <MinusIcon className="p-1 btn btn-outline-secondary"  width={25} onClick={handleZoomOut} />
      <input
        type="range"
        name="zoomRange"
        min={min_zoom}
        max={max_zoom}
        step={zoom_step}
        value={zoom}
        onChange={(e) => {
          setZoom(Number(e.target.value));
        }}
        className="form-range"
      />
      <PlusIcon className="p-1 btn btn-outline-secondary" width={25} onClick={handleZoomIn} />
    </div>
  );
};

export const RotationSlider = ({ className }) => {
  const {
    rotation,
    setRotation,
    max_rotation,
    min_rotation,
    rotation_step,
    handleRotateAntiCw,
    handleRotateCw
  } = useImageCropContext();

  return (
    <div className={classNames(className, 'd-flex align-items-center justify-content-center gap-2')}>
      <ArrowUturnLeftIcon className="p-1 btn btn-outline-secondary" width={25} onClick={handleRotateAntiCw}/>
      <input
        type="range"
        name="rotationRange"
        min={min_rotation}
        max={max_rotation}
        step={rotation_step}
        value={rotation}
        onChange={(e) => {
          setRotation(Number(e.target.value));
        }}
        className="form-range"
      />
      <ArrowUturnRightIcon className="p-1 btn btn-outline-secondary" width={25} onClick={handleRotateCw}/>
    </div>
  );
};