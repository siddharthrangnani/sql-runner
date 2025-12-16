from fastapi import APIRouter, Body
from utils.db_utils import execute_query

router = APIRouter()

@router.post("/query")
def run_query(query: str = Body(..., embed=True)):
    return execute_query(query)
