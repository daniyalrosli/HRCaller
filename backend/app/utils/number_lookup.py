import pandas as pd
import os
from typing import List, Optional
from app.models.hr_number import HRNumber

class NumberLookup:
    def __init__(self, csv_path: str = "data/sample_hr_numbers.csv"):
        self.csv_path = csv_path
        self.data = None
        self._load_data()
    
    def _load_data(self):
        """Load data from CSV file"""
        try:
            if os.path.exists(self.csv_path):
                self.data = pd.read_csv(self.csv_path)
            else:
                # Create sample data if file doesn't exist
                self._create_sample_data()
        except Exception as e:
            print(f"Error loading data: {e}")
            self._create_sample_data()
    
    def _create_sample_data(self):
        """Create sample data for testing"""
        sample_data = {
            'phone_number': [
                '+1-555-0100',
                '+1-555-0101', 
                '+1-555-0102',
                '+1-555-0103',
                '+1-555-0104'
            ],
            'company_name': [
                'TechCorp Inc.',
                'Global Solutions Ltd.',
                'Innovation Systems',
                'Digital Dynamics',
                'Future Technologies'
            ],
            'department': [
                'Human Resources',
                'Recruitment',
                'HR Operations',
                'Talent Acquisition',
                'Employee Relations'
            ],
            'contact_person': [
                'Sarah Johnson',
                'Mike Chen',
                'Lisa Rodriguez',
                'David Kim',
                'Emma Wilson'
            ],
            'email': [
                'hr@techcorp.com',
                'recruitment@globalsolutions.com',
                'hr@innovationsystems.com',
                'talent@digitaldynamics.com',
                'hr@futuretech.com'
            ],
            'location': [
                'San Francisco, CA',
                'New York, NY',
                'Austin, TX',
                'Seattle, WA',
                'Boston, MA'
            ],
            'notes': [
                'Main HR contact',
                'Senior recruiter',
                'HR operations manager',
                'Talent acquisition specialist',
                'Employee relations coordinator'
            ]
        }
        
        self.data = pd.DataFrame(sample_data)
        
        # Create the data directory if it doesn't exist
        os.makedirs(os.path.dirname(self.csv_path), exist_ok=True)
        
        # Save sample data to CSV
        self.data.to_csv(self.csv_path, index=False)
    
    def search_by_number(self, phone_number: str) -> Optional[HRNumber]:
        """Search for HR number by phone number"""
        if self.data is None:
            return None
        
        # Clean the phone number for comparison
        clean_number = self._clean_phone_number(phone_number)
        
        # Search in the dataframe
        result = self.data[self.data['phone_number'].apply(self._clean_phone_number) == clean_number]
        
        if not result.empty:
            row = result.iloc[0]
            return HRNumber(
                phone_number=row['phone_number'],
                company_name=row['company_name'],
                department=row.get('department'),
                contact_person=row.get('contact_person'),
                email=row.get('email'),
                location=row.get('location'),
                notes=row.get('notes')
            )
        
        return None
    
    def search_by_company(self, company_name: str) -> List[HRNumber]:
        """Search for HR numbers by company name"""
        if self.data is None:
            return []
        
        # Case-insensitive search
        result = self.data[self.data['company_name'].str.contains(company_name, case=False, na=False)]
        
        hr_numbers = []
        for _, row in result.iterrows():
            hr_numbers.append(HRNumber(
                phone_number=row['phone_number'],
                company_name=row['company_name'],
                department=row.get('department'),
                contact_person=row.get('contact_person'),
                email=row.get('email'),
                location=row.get('location'),
                notes=row.get('notes')
            ))
        
        return hr_numbers
    
    def get_all_numbers(self) -> List[HRNumber]:
        """Get all HR numbers"""
        if self.data is None:
            return []
        
        hr_numbers = []
        for _, row in self.data.iterrows():
            hr_numbers.append(HRNumber(
                phone_number=row['phone_number'],
                company_name=row['company_name'],
                department=row.get('department'),
                contact_person=row.get('contact_person'),
                email=row.get('email'),
                location=row.get('location'),
                notes=row.get('notes')
            ))
        
        return hr_numbers
    
    def _clean_phone_number(self, phone_number: str) -> str:
        """Clean phone number for comparison"""
        # Remove all non-digit characters except +
        cleaned = ''.join(c for c in phone_number if c.isdigit() or c == '+')
        return cleaned
    
    def add_number(self, hr_number: HRNumber) -> bool:
        """Add a new HR number to the database"""
        try:
            new_row = {
                'phone_number': hr_number.phone_number,
                'company_name': hr_number.company_name,
                'department': hr_number.department,
                'contact_person': hr_number.contact_person,
                'email': hr_number.email,
                'location': hr_number.location,
                'notes': hr_number.notes
            }
            
            self.data = pd.concat([self.data, pd.DataFrame([new_row])], ignore_index=True)
            self.data.to_csv(self.csv_path, index=False)
            return True
        except Exception as e:
            print(f"Error adding number: {e}")
            return False 