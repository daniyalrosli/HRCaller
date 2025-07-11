from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.hr_number import HRNumber, HRNumberCreate, HRNumberUpdate
from app.utils.number_lookup import NumberLookup

router = APIRouter(prefix="/calls", tags=["calls"])

# Initialize the number lookup service
number_lookup = NumberLookup()

@router.get("/search")
async def search_by_number(phone_number: str = Query(..., description="Phone number to search for")):
    """Search for HR number by phone number"""
    try:
        result = number_lookup.search_by_number(phone_number)
        if result:
            return {"success": True, "data": result}
        else:
            return {"success": False, "message": "No HR number found for this phone number"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching for number: {str(e)}")

@router.get("/search/company")
async def search_by_company(company_name: str = Query(..., description="Company name to search for")):
    """Search for HR numbers by company name"""
    try:
        results = number_lookup.search_by_company(company_name)
        return {"success": True, "data": results, "count": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching by company: {str(e)}")

@router.get("/all")
async def get_all_numbers():
    """Get all HR numbers"""
    try:
        results = number_lookup.get_all_numbers()
        return {"success": True, "data": results, "count": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving all numbers: {str(e)}")

@router.post("/add")
async def add_hr_number(hr_number: HRNumberCreate):
    """Add a new HR number"""
    try:
        # Check if number already exists
        existing = number_lookup.search_by_number(hr_number.phone_number)
        if existing:
            raise HTTPException(status_code=400, detail="Phone number already exists")
        
        # Create new HR number
        new_number = HRNumber(
            phone_number=hr_number.phone_number,
            company_name=hr_number.company_name,
            department=hr_number.department,
            contact_person=hr_number.contact_person,
            email=hr_number.email,
            location=hr_number.location,
            notes=hr_number.notes
        )
        
        success = number_lookup.add_number(new_number)
        if success:
            return {"success": True, "message": "HR number added successfully", "data": new_number}
        else:
            raise HTTPException(status_code=500, detail="Failed to add HR number")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding HR number: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check for the calls service"""
    return {"status": "healthy", "service": "calls"} 