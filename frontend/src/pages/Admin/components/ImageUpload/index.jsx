import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import styles from "./ImageUpload.module.scss";
import { apiEndpoints, API_ROOT_URL } from "../../../../api";
import useApi from "../../../../hooks/useAPI";
import { baseStyle, focusedStyle, acceptStyle, rejectStyle } from "./styles";

function ImageUpload({ setTaskImagePath }) {
  const [previewImageUrl, setPreviewImageUrl] = useState(undefined);
  const { loading, apiRequestHandler, apiReponse } = useApi({
    pathName: apiEndpoints.uploadImage,
    method: "POST",
    requestOptions: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fd = new FormData();
      fd.append("file", acceptedFiles[0]);
      apiRequestHandler(fd).then((response) => {
        console.log("response", response);
        setPreviewImageUrl(response.filePath);
        setTaskImagePath(response.filePath);
      });
    },
    [apiRequestHandler, setTaskImagePath],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const customStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <div className={styles.dropdownRootContainer}>
      <div className={styles.innerContainer}>
        <div {...getRootProps({ style: customStyle })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Dobd ide a fájlt</p>
          ) : (
            <p>Húzd ide a feltöltendő képet</p>
          )}
        </div>
        {previewImageUrl && (
          <img
            className={styles.previewImage}
            alt="preview"
            src={`${API_ROOT_URL}${apiEndpoints.static}/${previewImageUrl}`}
          />
        )}
      </div>
      {previewImageUrl && <p className={styles.filePath}>{previewImageUrl}</p>}
    </div>
  );
}

ImageUpload.propTypes = {
  setTaskImagePath: PropTypes.func.isRequired,
};

export default ImageUpload;
