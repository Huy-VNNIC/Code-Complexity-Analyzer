import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const CodeInput = ({ code, onChange, language, onLanguageChange, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [inputType, setInputType] = useState('manual');
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange(event.target.result);
      };
      reader.readAsText(selectedFile);
    }
  };
  
  const handleInputTypeChange = (type) => {
    setInputType(type);
    if (type === 'file') {
      setFile(null);
      onChange(''); // Clear code when switching to file upload
    }
  };
  
  return (
    <Form onSubmit={onSubmit} className="mb-4">
      <Form.Group className="mb-3">
        <Form.Label>Programming Language</Form.Label>
        <Form.Select 
          value={language} 
          onChange={onLanguageChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </Form.Select>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Code Input</Form.Label>
        
        <div className="mb-3">
          <InputGroup>
            <Button
              variant={inputType === 'manual' ? 'primary' : 'outline-primary'}
              onClick={() => handleInputTypeChange('manual')}
            >
              Manual Input
            </Button>
            <Button
              variant={inputType === 'file' ? 'primary' : 'outline-primary'}
              onClick={() => handleInputTypeChange('file')}
            >
              Upload File
            </Button>
          </InputGroup>
        </div>
        
        {inputType === 'manual' ? (
          <Form.Control
            as="textarea"
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="code-input"
            placeholder={`Enter your ${language} code here...`}
            rows={10}
            required
          />
        ) : (
          <div>
            <Form.Control 
              type="file" 
              onChange={handleFileChange}
              accept=".js,.py,.java,.jsx,.ts,.tsx"
            />
            
            {file && (
              <div className="mt-3">
                <p className="mb-2">File: <strong>{file.name}</strong></p>
                <div className="border rounded p-2">
                  <pre>{code}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </Form.Group>
      
      <Button 
        type="submit" 
        variant="primary" 
        disabled={!code.trim()}
      >
        Analyze Code
      </Button>
    </Form>
  );
};

export default CodeInput;