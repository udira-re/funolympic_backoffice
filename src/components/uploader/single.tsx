/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef } from "react";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploader = ({
  label,
  onChange,
}: {
  label: string;
  onChange: any;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    onChange(file);
  };

  return (
    <Grid container direction="column" alignItems="flex-start">
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpeg,image/png"
        id="file-input"
        onChange={handleFileChange}
        ref={ref}
      />
      <label>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
          onClick={() => {
            // @ts-ignore
            ref.current.click();
          }}
        >
          {label}
        </Button>
      </label>
      {file?.name}
    </Grid>
  );
};

export default FileUploader;
