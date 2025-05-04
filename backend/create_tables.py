from models import Base
from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/HisTalks"
engine = create_engine(DATABASE_URL)

Base.metadata.create_all(bind=engine) 