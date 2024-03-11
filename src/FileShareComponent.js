import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FileShareComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [subject, setSubject] = useState('');
    const [files, setFiles] = useState([]);
  
    useEffect(() => {
      fetchFiles();
    }, [subject]);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedFileName(file.name); // 파일 이름 업데이트
    };  
  
    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };
  
    const handleUpload = async () => {

      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('file', selectedFile);
  
      try {
        await axios.post('http://localhost:5000/upload', formData, {

          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('File uploaded successfully');

        fetchFiles();
      } catch (error) {
        console.error('Error uploading file:', error);

        alert('Error uploading file');

      }
    };
  
    const fetchFiles = async () => {
      if (!subject) {
        setFiles([]);
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:5000/files?subject=${encodeURIComponent(subject)}`);

        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
        alert('Error fetching files');
        setFiles([]);
      }
    };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>File Sharing App</h1>

      {/* 과목 선택 섹션 */}
      <div style={styles.subjectSelection}>
        <h2>Select Subject to View Files</h2>
        <select value={subject} onChange={handleSubjectChange} style={styles.select}>
          <option value="">Select Subject</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>

      {/* 파일 업로드 섹션 */}
      <div style={styles.uploadSection}>

        <h2>Upload File</h2>

        <input type="file" onChange={handleFileChange} style={styles.fileInput} />
        <button onClick={handleUpload} style={styles.uploadButton}>Upload File</button>



      </div>

      {/* 업로드된 파일 목록 표시 */}
      {files.length > 0 && (
        <div style={styles.filesList}>
          <h2>Uploaded Files</h2>

          <ul>
            {files.map((file, index) => (
              <li key={index} style={styles.fileItem}>
                <a href={`http://localhost:5000/download/${encodeURIComponent(file)}`} style={styles.fileLink} download>
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '24px',
    color: '#333',
  },
  uploadSection: {

    backgroundColor: '#f8f8f8',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '24px',
  },
  select: {
    marginBottom: '12px',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    fontSize: '16px',
  },
  fileInput: {
    marginBottom: '12px',
  },
  uploadButton: {

    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  filesList: {
    marginTop: '24px',
  },
  subTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#555',
  },
  fileItem: {
    listStyleType: 'none',
    textAlign: 'left',
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
  fileLink: {
    textDecoration: 'none',
    color: '#0066cc',
    fontWeight: '500',
  }
};

export default FileShareComponent;
