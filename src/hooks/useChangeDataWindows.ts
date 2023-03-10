import { useState, useCallback } from 'react';

export const useChangeDataWindows = () => {
  const [isImage, setIsImage] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [isData, setIsData] = useState(false);

  const togleChangeImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImage((p) => !p);
    setIsFile(false);
    setIsData(false);
  }, []);

  const togleChangeFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFile((p) => !p);
    setIsImage(false);
    setIsData(false);
  }, []);

  const togleChangeData = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsData((p) => !p);
    setIsFile(false);
    setIsImage(false);
  }, []);

  const closeWindows = useCallback(() => {
    setIsData(false);
    setIsFile(false);
    setIsImage(false);
  }, []);

  const closeIsFile = useCallback(() => setIsFile(false), []);
  const closeIsImage = useCallback(() => setIsImage(false), []);
  const closeIsData = useCallback(() => setIsData(false), []);

  return {
    isImage,
    isFile,
    isData,
    closeIsFile,
    closeIsImage,
    closeIsData,
    togleChangeImage,
    togleChangeFile,
    togleChangeData,
    closeWindows,
  };
};
