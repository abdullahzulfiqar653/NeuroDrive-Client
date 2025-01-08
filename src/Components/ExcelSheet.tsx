import React, { useEffect, useRef } from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { toast } from 'react-toastify';

interface ExcelSheetProps {
  fileUrl: any;
  fileName: any;
}

const ExcelSheet: React.FC<ExcelSheetProps> = ({ fileUrl, fileName }) => {
  const spreadsheetRef = useRef<SpreadsheetComponent>(null);

  console.log(fileUrl)

  const beforeSave = (args: any) => {
    args.needBlobData = true;
    args.isFullPost = false;
  };

  const saveComplete = (args: any) => {
    if (args.blobData) {
      const formData = new FormData();
      formData.append('FileName', fileName || 'Sample');
      formData.append('saveType', 'Xlsx');
      formData.append('FileData', args.blobData, fileName || 'Sample');
      console.log(formData, 'FormData');
      fetch('https://your-backend-url/save', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Data Saved Successfully!");
          } else {
            console.error("Error saving data:", response.statusText);
            toast.error("Failed to save data!");
          }
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          toast.error("Failed to save data!");
        });
    }
  };

  const fetchData = async () => {
    fetch(
      fileUrl
    ).then((response) => {
      response.blob().then((fileBlob) => {
        const file = new File([fileBlob], 'Sample.xlsx');
        spreadsheetRef.current?.open({ file });
      });
    });
  };

  useEffect(() => {
    if (fileUrl) {
      fetchData();
    }
  }, [fileUrl]);

  return (
    <div className='control-section spreadsheet-control' style={{ height: "90vh" }}>
      <SpreadsheetComponent
        openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
        saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
        ref={spreadsheetRef}
        beforeSave={beforeSave}
        saveComplete={saveComplete}
        created={fetchData}
      />
    </div>
  );
};

export default ExcelSheet;