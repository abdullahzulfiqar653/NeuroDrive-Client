import React, { useEffect, useRef } from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { toast } from 'react-toastify';

interface ExcelSheetProps {
  fileUrl: any;
  fileName: any
}

const ExcelSheet: React.FC<ExcelSheetProps> = ({ fileUrl, fileName }) => {
  const spreadsheetRef = useRef<SpreadsheetComponent>(null);

  const beforeSave = (args: any) => {
    args.needBlobData = true; 
    args.isFullPost = false; 
  };

  const saveComplete = (args: any) => {
    if (args.blobData) {
      const formData = new FormData();
      formData.append('FileName', 'Sample'); 
      formData.append('saveType', 'Xlsx'); 
      formData.append('FileData', args.blobData, 'Sample'); 
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

  const loadExcel = () => {
    fetch(fileUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: fileName }), 
    })
    .then((response) => response.json())
    .then((data) => {
      if (spreadsheetRef.current) {
        spreadsheetRef.current.openFromJson({ file: data });
      }
    });
  };

  useEffect(() => {
    loadExcel(); 
  }, [fileUrl, fileName]); 

  return (
    <div className='control-section spreadsheet-control'>
      <SpreadsheetComponent
        openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open'
        saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save'
        ref={spreadsheetRef}
        beforeSave={beforeSave}
        saveComplete={saveComplete}
        created={loadExcel}
      />
    </div>
  );
};

export default ExcelSheet;