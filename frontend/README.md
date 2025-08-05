# CloseTube - 프라이빗 영상 공유 플랫폼

CloseTube는 가족, 친구들과만 공유하는 프라이빗 영상 플랫폼입니다. YouTube, Instagram, TikTok 등의 URL을 입력하면 해당 영상을 안전하게 공유할 수 있습니다.

## 🚀 주요 기능

- **다중 플랫폼 지원**: YouTube, Instagram, TikTok URL 지원
- **그룹 기반 공유**: 가족, 친구, 팀별로 영상 공유
- **프라이버시 보호**: 다운로드 금지, 외부 공유 금지 설정
- **실시간 댓글**: 영상에 대한 댓글 및 좋아요 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 🛠 기술 스택

### 프론트엔드
- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Lucide React** - 아이콘
- **Framer Motion** - 애니메이션

### 백엔드
- **FastAPI** - Python 웹 프레임워크
- **Pydantic** - 데이터 검증
- **Firebase** - 데이터베이스 (예정)

### 배포
- **Vercel** - 프론트엔드 배포
- **Railway** - 백엔드 배포

## 📦 설치 및 실행

### 프론트엔드

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 실행
npm start
```

### 백엔드

```bash
cd backend

# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
python main.py
```

## 🔧 환경 설정

### 프론트엔드 (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 백엔드 (.env)
```env
DATABASE_URL=your_firebase_url
API_KEY=your_api_key
```

## 📁 프로젝트 구조

```
closetube-saas/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 컴포넌트
│   ├── lib/                # 유틸리티 함수
│   └── types/              # TypeScript 타입 정의
├── backend/
│   ├── main.py             # FastAPI 애플리케이션
│   └── requirements.txt    # Python 의존성
├── public/                 # 정적 파일
└── package.json
```

## 🚀 배포

### Vercel (프론트엔드)
1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포

### Railway (백엔드)
1. Railway 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포

## 🔒 보안

- CORS 설정으로 허용된 도메인만 접근 가능
- 입력 데이터 검증 (Pydantic)
- XSS 방지
- CSRF 토큰 (예정)

## 📱 지원 브라우저

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

- 이메일: contact@closetube.com
- GitHub Issues: [이슈 등록](https://github.com/your-repo/issues)

## 🎯 로드맵

- [ ] Firebase 인증 시스템
- [ ] 실시간 알림
- [ ] 영상 다운로드 기능
- [ ] 모바일 앱 개발
- [ ] AI 기반 영상 추천
- [ ] 다국어 지원 