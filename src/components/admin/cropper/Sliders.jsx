'use client';

import { useImageCropContext } from '@/providers/ImageCropProvider';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  MinusIcon,
  PlusIcon
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ZoomSlider = ({ className }) => {
  const { zoom, setZoom, handleZoomIn, handleZoomOut, max_zoom, min_zoom, zoom_step } =
    useImageCropContext();

  return (
    <div className={classNames(className, 'd-flex align-items-center justify-content-center gap-2')}>
      <button className="p-1 btn btn-outline-secondary" onClick={handleZoomOut}>
        <MinusIcon className="text-secondary w-4" />
      </button>
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
      <button className="p-1 btn btn-outline-secondary" onClick={handleZoomIn}>
        <PlusIcon className="text-secondary w-4" />
      </button>
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
      <button className="p-1 btn btn-outline-secondary" onClick={handleRotateAntiCw}>
        <ArrowUturnLeftIcon className="text-secondary w-4" />
      </button>
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
      <button className="p-1 btn btn-outline-secondary" onClick={handleRotateCw}>
        <ArrowUturnRightIcon className="text-secondary w-4" />
      </button>
    </div>
  );
};