from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from models import Base, User, Conversation
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from schemas import RegisterRequest  # bunu ekle
from schemas import LoginRequest


DATABASE_URL = "postgresql://postgres:1234@localhost:5432/HisTalks"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme ortamı için uygun
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(data.password)
    user = User(
        username=data.username,
        email=data.email,
        password_hash=hashed_password,
        created_at=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": user.id, "username": user.username}

@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):  # data parametresini alıyoruz
    user = db.query(User).filter(User.username == data.username).first()  # username'i data'dan alıyoruz
    if not user or not pwd_context.verify(data.password, user.password_hash):  # password'u data'dan alıyoruz
        raise HTTPException(status_code=401, detail="Kullanıcı adı veya şifre yanlış")
    return {"id": user.id, "username": user.username, "email": user.email}

@app.post("/message")
def send_message(user_id: int, message: str, is_user: bool = True, db: Session = Depends(get_db)):
    conv = Conversation(user_id=user_id, message=message, is_user=is_user, timestamp=datetime.utcnow())
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return {"id": conv.id, "message": conv.message}

@app.get("/messages")
def get_messages(user_id: int, db: Session = Depends(get_db)):
    messages = db.query(Conversation).filter(Conversation.user_id == user_id).order_by(Conversation.timestamp).all()
    return [
        {
            "id": m.id,
            "user_id": m.user_id,
            "message": m.message,
            "is_user": m.is_user,
            "timestamp": m.timestamp
        } for m in messages
    ] 