import React, { useEffect, useRef } from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { toast } from 'react-toastify';
import axios from 'axios';
import { postData } from '../features/ApiSlice';
import { getDirectory } from '../features/directories/folderSlice';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ExcelSheetProps {
  fileUrl: any;
  fileName: any;
}

const ExcelSheet: React.FC<ExcelSheetProps> = ({ fileUrl, fileName }) => {
  const spreadsheetRef = useRef<SpreadsheetComponent>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const beforeSave = (args: any) => {
    args.needBlobData = true;
    args.isFullPost = false;
  };

  const saveComplete = async (args: any) => {
    if (args.blobData) {
      try {
        const parentFolderId = localStorage.getItem("parent_folder_id") ?? "";
        const formData = new FormData();
    
        let blobData = args.blobData;
        if (!(blobData instanceof Blob)) {
  
          blobData = new Blob([args.blobData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        }
    
    
        formData.append('saveType', 'Xlsx');
        formData.append('file', blobData, fileName ? `${fileName}.xlsx` : "Sample.xlsx");
 
        await dispatch(
          postData({
            url: `/directories/${parentFolderId}/files/`,
            payload: formData,
            method: "post",
            key: "uploadFile",
          })
        ).unwrap();
  
        dispatch(getDirectory(parentFolderId));
        toast.success("File Upload Successful");
        navigate('/')
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
      }
    } else {
      toast.error("No file data provided");
    }
  };
  
  
  
  
  


  const fetchData = async () => {
    if (fileUrl) {
      try {
        const response = await axios.get(fileUrl, {
          responseType: 'blob',
        });
        const file = new File([response.data], 'Sample.xlsx', {
          type: response.headers['content-type'], 
        });
        spreadsheetRef.current?.open({ file });
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    }
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