import { Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Radio } from "antd";

interface ImageUploaderProps {
  value?: string[];
  onChange?: (images: string[]) => void;
  onHeroImageChange?: (image: string) => void;
  heroImage?: string;
}

export default function ImageUploader({
  value = [],
  onChange,
  onHeroImageChange,
  heroImage,
}: ImageUploaderProps) {
  const [fileList, setFileList] = useState<UploadFile[]>(
    value.map((url, index) => ({
      uid: `${index}`,
      name: `Image ${index + 1}`,
      status: "done",
      url,
    }))
  );

  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    const imageUrls = fileList.map((file) => file.url || URL.createObjectURL(file.originFileObj!));
    onChange?.(imageUrls);
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (await getBase64(file.originFileObj!)));
    setPreviewVisible(true);
  };

  const handleHeroCheck = (file: UploadFile) => {
    const url = file.url || URL.createObjectURL(file.originFileObj!);
    console.log(":url: ", url)
    onHeroImageChange?.(url);
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // Custom render for each file item
  const itemRender = (
    originNode: React.ReactElement,
    file: UploadFile,
    fileList: UploadFile[],
    actions: { download: () => void; preview: () => void; remove: () => void }
  ) => {
    const url = file.url || (file.originFileObj && URL.createObjectURL(file.originFileObj));
    return (
      <div style={{ position: "relative" }}>
        {originNode}
        <Radio
          checked={heroImage === url}
          onChange={() => handleHeroCheck(file)}
          style={{
            position: "relative",
            // top: 4,
            // left: 4,
            // zIndex: 10,
            // background: "rgba(255,255,255,0.7)",
            borderRadius: "50%",
            padding: 2,
          }}
          title="Set as hero image"
        />
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label>Upload Images</Label>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onPreview={handlePreview}
        beforeUpload={() => false}
        itemRender={itemRender}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </div>
  );
}
