# HR Caller

A web application for finding and managing HR contact information. Users can search for HR numbers by phone number or company name, and contribute new entries to the database.

## Project Structure

```
hrcaller/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application entry point
│   │   ├── routes/
│   │   │   └── call_routes.py  # API routes
│   │   ├── models/
│   │   │   └── hr_number.py    # Pydantic models
│   │   └── utils/
│   │       └── number_lookup.py # Data lookup utilities
│   └── requirements.txt     # Python dependencies
├── frontend/               # React frontend
│   ├── screens/
│   │   ├── Home.js         # Home screen with search
│   │   ├── LookupResult.js # Results display screen
│   │   └── ReportForm.js   # Form for adding new numbers
│   ├── components/
│   │   └── NumberCard.js   # HR number display component
│   ├── App.js              # Main React component
│   ├── App.css             # Styles
│   └── package.json        # Node.js dependencies
└── data/
    └── sample_hr_numbers.csv  # Sample data (auto-generated)
```

## Features

- **Search by Phone Number**: Find HR contact information using phone numbers
- **Search by Company**: Search for HR contacts by company name
- **View All Numbers**: Browse the entire database
- **Add New Numbers**: Report new HR contact information
- **Direct Contact**: Click to call or email HR contacts directly
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Backend API (FastAPI)

- `GET /api/v1/calls/search` - Search by phone number
- `GET /api/v1/calls/search/company` - Search by company name
- `GET /api/v1/calls/all` - Get all HR numbers
- `POST /api/v1/calls/add` - Add new HR number
- `GET /api/v1/calls/health` - Health check

### API Documentation

Once the backend is running, you can access:
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Usage

1. **Search for HR Numbers**:
   - Enter a phone number or company name
   - Click "Search" to find matching results
   - Use "View All Numbers" to browse the entire database

2. **Contact HR**:
   - Click "Call" button to initiate a phone call
   - Click "Email" button to open email client

3. **Report New Numbers**:
   - Navigate to "Report New HR Number"
   - Fill out the form with HR contact information
   - Submit to add to the database

## Data Storage

The application uses a CSV file (`data/sample_hr_numbers.csv`) for data storage. The backend automatically creates sample data if no file exists.

### Sample Data Structure

```csv
phone_number,company_name,department,contact_person,email,location,notes
+1-555-0100,TechCorp Inc.,Human Resources,Sarah Johnson,hr@techcorp.com,San Francisco CA,Main HR contact
```

## Development

### Backend Development

- The backend uses FastAPI with automatic API documentation
- Data is stored in CSV format for simplicity
- CORS is enabled for frontend communication

### Frontend Development

- Built with React and React Router
- Modern CSS with responsive design
- Font Awesome icons for better UX

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository. 