from fastapi import APIRouter, Body

from utils.db_utils import get_table_names, get_table_info

router = APIRouter()

@router.get("/tables")
def list_tables():
    return get_table_names()

@router.get("/tables/{table_name}")
def table_info(table_name: str):
    return get_table_info(table_name)
