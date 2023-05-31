import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from 'xlsx';
import './fileuploader.css'
const fileTypes = ["XLSX"];

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const convertToJSON=(jsonData)=>{
    let headers=jsonData[0].map((jd,index)=>{
        return {
            name:jd.toLowerCase().trim().replaceAll(/ /g, "_"),
            index
        }
    })
    headers=headers.filter((header)=>header.name && header)
    console.log(headers)
    console.log(jsonData.shift())
    return jsonData.map((jsData)=>{
        let objectJD={}
        headers.forEach((header) => (
            objectJD[header.name]=jsData[header.index]
        ))
        return objectJD
    })
  }
  const handleChange = async(e) => {
    const file = e[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
    });
    setFile(convertToJSON(jsonData))
  };
  return (<>
    <div>
    <p>
          Upload the file
        </p>
      <FileUploader
        multiple={true}
        handleChange={(e)=>handleChange(e)}
        name="file"
        types={fileTypes}
        hoverTitle="Drop here"
        maxSize={2}
      />
      {file && <div className="output"><pre>{JSON.stringify(file,undefined,2)}</pre></div>}
    </div>
      </>
  );
}
