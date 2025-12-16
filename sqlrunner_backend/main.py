from fastapi import APIRouter, Body
from routers import tables, queries
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tables.router)
app.include_router(queries.router)
@app.get("/")
def read_root():
    return {"message": "Welcome to SQL Runner API"}