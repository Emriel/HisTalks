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
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# === Veritabanı ayarları ===
DB_NAME = "HisTalks"
DB_USER = "postgres"
DB_PASSWORD = "1234"  # kendi şifrene göre değiştir
DB_HOST = "localhost"
DB_PORT = "5432"

POSTGRES_DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/postgres"
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# === SQLAlchemy setup ===
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()

# === CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Geliştirme ortamı için uygun
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Startup işlemleri ===
@app.on_event("startup")
def startup_event():
    create_database_if_not_exists()
    create_tables()

def create_database_if_not_exists():
    try:
        conn = psycopg2.connect(
            dbname="postgres",
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()

        cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{DB_NAME}'")
        exists = cursor.fetchone()

        if not exists:
            cursor.execute(f'CREATE DATABASE "{DB_NAME}"')
            print(f"[✔] Veritabanı '{DB_NAME}' oluşturuldu.")
        else:
            print(f"[✔] Veritabanı '{DB_NAME}' zaten var.")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"[HATA] Veritabanı kontrolünde hata: {e}")

def create_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print("[✔] Tablolar kontrol edildi/oluşturuldu.")
    except Exception as e:
        print(f"[HATA] Tablolar oluşturulamadı: {e}")

# === DB bağlantısı ===
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# === Endpointler ===
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
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not pwd_context.verify(data.password, user.password_hash):
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
