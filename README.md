# Code Complexity Analyzer

A tool for analyzing code complexity using McCabe's Cyclomatic Complexity metric, visualizing control flow graphs, and generating refactoring suggestions using AI.

## Features

- **Code Complexity Analysis:** Calculate McCabe's Cyclomatic Complexity for JavaScript, Python, and Java code
- **Control Flow Graph Visualization:** Generate visual representations of control flow
- **Lines of Code (LOC) Counting:** Analyze code size metrics
- **AI-Powered Refactoring Suggestions:** Get intelligent advice on how to improve complex code
- **Multiple Language Support:** Analyze JavaScript, Python, and Java code
- **File Upload:** Easily analyze existing code files
- **Visual Dashboard:** Interactive charts and metrics visualization

## Project Structure

```
code-complexity-analyzer/
├── backend/             # Node.js backend
│   ├── src/
│   │   ├── analyzers/   # Code analyzers for different languages
│   │   ├── metrics/     # Metrics calculations (cyclomatic, LOC)
│   │   ├── services/    # OpenAI service for suggestions
│   │   ├── routes/      # API routes
│   │   ├── models/      # Data models
│   │   └── index.js     # Main server file
│   └── package.json
│
├── frontend/            # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # App pages
│   │   ├── services/    # API services
│   │   └── App.js
│   └── package.json
```

## Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/code-complexity-analyzer.git
   cd code-complexity-analyzer
   ```

2. Setup backend:
   ```bash
   cd backend
   npm install
   
   # Create .env file with your OpenAI API key
   echo "PORT=5000\nOPENAI_API_KEY=your_api_key_here" > .env
   ```

3. Setup frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to http://localhost:3000

## Usage

1. Select the programming language from the dropdown menu
2. Enter code directly or upload a file
3. Click "Analyze Code" to process
4. View the analysis results:
   - Summary metrics at the top
   - List of functions with complexity scores
   - Interactive complexity chart
   - Select a function to view:
     - Control flow graph
     - AI refactoring suggestions

## Complexity Metrics Interpretation

- **1-4:** Low complexity (Simple, easy to maintain)
- **5-10:** Moderate complexity (Consider refactoring)
- **11+:** High complexity (Should be refactored)

## API Endpoints

- `POST /api/analyze` - Analyze code complexity
- `POST /api/analyze/cfg` - Generate control flow graph
- `POST /api/compare` - Compare multiple analysis results

## Technologies Used

- **Frontend:** React, Bootstrap, Chart.js, ReactFlow
- **Backend:** Node.js, Express
- **Code Parsing:** Esprima (JavaScript), Python-Shell (Python), Java-Parser
- **AI Integration:** OpenAI API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- McCabe's Cyclomatic Complexity metric concept by Thomas McCabe
- OpenAI for providing the API for refactoring suggestions