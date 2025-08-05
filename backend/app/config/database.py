import os
from dotenv import load_dotenv

load_dotenv()

# Firebase 설정 (향후 구현)
FIREBASE_CONFIG = {
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID", "closetube-saas"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID", ""),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY", ""),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL", ""),
    "client_id": os.getenv("FIREBASE_CLIENT_ID", ""),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL", "")
}

# 임시 데이터베이스 (메모리 기반)
class InMemoryDB:
    def __init__(self):
        self.videos = []
        self.comments = []
        self.users = []
        self.groups = []

# 전역 데이터베이스 인스턴스
db = InMemoryDB() 