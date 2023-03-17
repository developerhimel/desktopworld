import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Switch, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function ImageUploader(props: { fileList: any; setFileList: any }) {
  const [checked, setChecked] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => props.setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Add Image</div>
    </div>
  );
  return (
    <div>
      <div className="pb-2">
        <span>Product Images || </span>
        <Switch
          title={`${checked ? "Upload Images" : "Insert Images Links"}`}
          size="small"
          checked={checked}
          onChange={(checked) => setChecked(checked)}
        />
        <span> ( {!checked ? "Link" : "Upload"} )</span>
        <span className="text-red-500">*</span>
      </div>
      <Upload
        listType="picture-card"
        fileList={props.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*,.png,.jpg,.jpeg,.svg,.webp,.jfif,.pjpeg,.pjp"
      >
        {props.fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default ImageUploader;
