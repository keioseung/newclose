# 🚀 Railway 배포 가이드

## 📋 배포 순서

### 1. 백엔드 배포 (FastAPI)

1. **Railway 프로젝트 생성**
   - Railway 대시보드에서 "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - GitHub 저장소 연결

2. **환경변수 설정**
   Railway 대시보드 → Variables 탭에서 다음 변수들을 추가:

   ```
   FIREBASE_PROJECT_ID=closetube-saas
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY=your_private_key
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   FIREBASE_CLIENT_CERT_URL=your_client_cert_url
   API_KEY=your_api_key
   DATABASE_URL=your_database_url
   ALLOWED_ORIGINS=http://localhost:3000,https://closetube-frontend.railway.app
   ```

3. **도메인 확인**
   - 배포 완료 후 제공되는 도메인 확인 (예: `https://closetube-backend.railway.app`)

### 2. 프론트엔드 배포 (Next.js)

1. **새로운 Railway 프로젝트 생성**
   - "New Project" → "Deploy from GitHub repo"
   - 같은 저장소 선택하되 `frontend` 폴더 지정

2. **환경변수 설정**
   Railway 대시보드 → Variables 탭에서 다음 변수들을 추가:

   ```
   NEXT_PUBLIC_API_URL=https://closetube-backend.railway.app
   NEXT_PUBLIC_APP_NAME=CloseTube
   NEXT_PUBLIC_APP_DESCRIPTION=나만의 소중한 사람들과 영상 공유
   ```

3. **도메인 확인**
   - 배포 완료 후 제공되는 도메인 확인 (예: `https://closetube-frontend.railway.app`)

## 🔧 환경변수 상세 설명

### 백엔드 환경변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID | `closetube-saas` |
| `FIREBASE_PRIVATE_KEY_ID` | Firebase 서비스 계정 키 ID | `abc123...` |
| `FIREBASE_PRIVATE_KEY` | Firebase 서비스 계정 개인키 | `-----BEGIN PRIVATE KEY-----...` |
| `FIREBASE_CLIENT_EMAIL` | Firebase 서비스 계정 이메일 | `firebase-adminsdk@...` |
| `FIREBASE_CLIENT_ID` | Firebase 클라이언트 ID | `123456789...` |
| `FIREBASE_CLIENT_CERT_URL` | Firebase 클라이언트 인증서 URL | `https://www.googleapis.com/...` |
| `API_KEY` | API 보안 키 | `your-secret-api-key` |
| `DATABASE_URL` | 데이터베이스 연결 URL | `postgresql://...` |
| `ALLOWED_ORIGINS` | CORS 허용 도메인 | `http://localhost:3000,https://closetube-frontend.railway.app` |

### 프론트엔드 환경변수

| 변수명 | 설명 | 예시 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | 백엔드 API URL | `https://closetube-backend.railway.app` |
| `NEXT_PUBLIC_APP_NAME` | 앱 이름 | `CloseTube` |
| `NEXT_PUBLIC_APP_DESCRIPTION` | 앱 설명 | `나만의 소중한 사람들과 영상 공유` |

## 🚨 주의사항

1. **환경변수 순서**: 반드시 백엔드를 먼저 배포하고, 그 도메인을 프론트엔드 환경변수에 설정
2. **CORS 설정**: `ALLOWED_ORIGINS`에 프론트엔드 도메인을 정확히 입력
3. **Firebase 설정**: 실제 Firebase 프로젝트 생성 후 서비스 계정 키 다운로드 필요
4. **도메인 확인**: 배포 후 제공되는 도메인을 메모해두기

## 🔍 배포 확인

### 백엔드 확인
```bash
curl https://closetube-backend.railway.app/
# 응답: {"message": "CloseTube API", "version": "1.0.0"}
```

### 프론트엔드 확인
- 브라우저에서 `https://closetube-frontend.railway.app` 접속
- CloseTube 메인 페이지가 정상적으로 로드되는지 확인

## 🛠️ 문제 해결

### 자주 발생하는 문제

1. **CORS 오류**
   - 백엔드 `ALLOWED_ORIGINS`에 프론트엔드 도메인 추가
   - 환경변수 재배포

2. **API 연결 실패**
   - 프론트엔드 `NEXT_PUBLIC_API_URL` 확인
   - 백엔드 서비스가 정상 실행 중인지 확인

3. **빌드 실패**
   - `package.json` 의존성 확인
   - Node.js 버전 확인 (Railway는 자동으로 최신 버전 사용) 