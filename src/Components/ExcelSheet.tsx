import React from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { toast } from 'react-toastify';

const ExcelSheet: React.FC = () => {

  const spreadsheetRef = React.useRef(null);

  const beforeSave = (args : any) => {
    args.needBlobData = true; 
    args.isFullPost = false; 
  }

  const saveComplete = (args : any) => {
    toast.success("data Saved SuccessFully!")
    console.log("Spreadsheet BlobData :", args.blobData)
  }

  return (
    <div className='control-section spreadsheet-control'>
      <SpreadsheetComponent
      openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' 
      saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' 
      ref={spreadsheetRef} beforeSave={beforeSave} saveComplete={saveComplete} 
      />
    </div>
  );
};

export default ExcelSheet;