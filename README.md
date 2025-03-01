# 색담 - AI를 통해 벽화를 색다르게

<div align="center">
<img src="https://github.com/user-attachments/assets/9f05c195-6d44-4c86-91bd-1f975bde78e9" width="400" alt="색담 로고">
</div>

<div align="center">
  <a href="https://splashy-band-e63.notion.site/SKT-FLY-AI-6-1778ab91c32080a5b396f4809387d475" target="_blank">팀 노션</a> | <a href="https://github.com/typingmistake/saekdam-be">백엔드 레포</a> | <a href="https://github.com/typingmistake/saekdam-web-fe">프론트엔드 웹 레포</a> | <a href="https://github.com/SKFLY-FINAL-PROJECT-6/saekdam-app-fe">프론트엔드 앱 레포</a>
</div>

---

## 📋 프로젝트 소개

색담은 인공지능 기술을 활용하여 낡은 벽에 요구사항을 반영한 새로운 색을 칠하고, 결과물을 공유할 수 있는 서비스입니다. 

스테이블 디퓨전 모델 베이스로, 벽화의 느낌을 살리기 위해 LoRA기법의 학습을 진행했습니다.

---

### 🖥️ 주요 페이지 구조

<div align="center">
<table>
  <tr>
    <td align="center"><b>메인페이지</b><br><img src="https://github.com/user-attachments/assets/3640c67e-d139-4e7e-8e04-7a094864dc7a" width="250" alt="메인페이지"><br>서비스 소개 및 주요 기능 안내</td>
    <td align="center"><b>게시판 페이지</b><br><img src="https://github.com/user-attachments/assets/89c70917-15a4-43f4-bed3-35f8bdb10857" width="250" alt="게시판 페이지"><br>사용자 작업 및 커뮤니티 게시물</td>
    <td align="center"><b>게시물 페이지</b><br><img src="https://github.com/user-attachments/assets/82318ba4-3f5d-454d-b3e5-de8624eb120a" width="250" alt="게시물 페이지"><br>개별 게시물 상세 내용</td>
  </tr>
</table>
</div>

### 🤖 소켓 활용 작업 프로세스 모니터링

<div align="center">
<table>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/942c8a12-42be-428e-b96c-a98e0693c080" width="230" alt="테마 지정"><br><b>0. 테마 지정</b></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/722de78a-1968-449b-ae36-141340483078" width="230" alt="프롬프트 입력"><br><b>0. 프롬프트 입력</b></td>
    <td align="center"><b>1. 작업 대기중</b><br><img src="https://github.com/user-attachments/assets/1322b8fe-b517-472a-9f0b-7514614812c5" width="230" alt="작업 대기중"></td>
    <td align="center"><b>2. 작업 진행중</b><br><img src="https://github.com/user-attachments/assets/3c892b7b-01b7-48b2-81e0-3a523f27a395" width="230" alt="작업 진행중"></td>
    <td align="center"><b>3. 작업 완료</b><br><img src="https://github.com/user-attachments/assets/0732a28f-7537-4340-886b-b3568281ca81" width="230" alt="작업 완료"></td>
  </tr>
</table>
</div>

---

## 🔧 주요 기술적 고민사항
- [BastionHost 대신 SSM을 사용해보자](https://splashy-band-e63.notion.site/BastionHost-SSM-19b8ab91c32080a0a155d73f90d6b5c7)
- [Redis와 ws를 활용한 AI 작업 모니터링](https://splashy-band-e63.notion.site/Redis-ws-AI-19f8ab91c320802b831eebce460deb1e)
- [객체 버킷과 PreSigned URL](https://splashy-band-e63.notion.site/PreSigned-URL-19b8ab91c320804faecbfbe964240faf)
- [Stable Diffusion 모델 LoRA 적용 과정](https://splashy-band-e63.notion.site/Stable-Diffusion-LoRA-1a08ab91c320804ba27ccc635cb3a2bb)

---

## 🔄 AI 작업 주요 시퀀스

```mermaid
sequenceDiagram
    participant Storage as 스토리지
    participant Client as 클라이언트
    participant Server as 서버
    participant Redis as Redis 메시지큐
    participant PubSub as Pub/Sub 채널
    participant ModelServer as 모델 서버
    
    Client->>Server: 1. Task ID 요청
    Server->>Client: Task ID 응답
    
    Client->>Server: 2. 이미지 업로드 URL 요청 (Task ID 기반)
    Server->>Client: 업로드 URL 응답
    
    Client->>Storage: 3. 이미지 업로드
    
    Client->>Server: 4. Task 제출 (Task ID, 작업 내용)
    
    Client->>Server: 5. 소켓 연결 체결 (Task ID 기반)
    
    Server->>Redis: 6. Task 등록
    
    ModelServer->>Redis: 7. Task 가져오기
    ModelServer->>PubSub: 7-1. INPROGRESS 상태 전송
    
    PubSub->>Server: INPROGRESS 상태 수신
    
    Server->>Client: 8. 소켓 연결 통해 진행 상태 전송
    
    ModelServer->>Storage: 9. 이미지 처리 후 저장
    
    ModelServer->>PubSub: 9-1. COMPLETED 상태 전송
    
    PubSub->>Server: COMPLETED 상태 수신
    
    Server->>Client: 10. 소켓 연결 통해 완료 상태 전송
    
    Client->>Server: 11. 처리된 이미지 URL 요청 (Task ID 기반)
    Server->>Client: 처리된 이미지 URL 응답
    
    Client->>Storage: 12. 이미지 가져오기 요청
    Storage->>Client: 처리된 이미지 데이터 전송
```

---

## 🏗️ 시스템 아키텍처

<img src="https://github.com/user-attachments/assets/faa1ebf5-bc55-44d5-a0f6-1110c22fcc39" width="1000" alt="시스템 아키텍처" style="display: block; margin: 0 auto;">

---

## 📅 세부 개발 일정

<div align="center">

| 단계 | 기간 | 활동 | 비고 |
|:----|:-----|:-----|:-----|
| **사전기획** | 1/6(월) ~ 1/14(화) | 프로젝트 기획 및 주제 선정 | 아이디어 선정 |
| **데이터 수집** | 1/15(수) ~ 1/20(월) | 시장 조사, 학습 데이터 수집 | 크롤링, 오픈 데이터셋 |
| **데이터 전처리** | 1/21(화) ~ 1/23(목) | 데이터 정제 | - |
| **모델링** | 1/24(금) ~ 1/31(금) | 세그멘테이션, 생성형 모델 구현 | 모델 성능 평가 |
| **서비스 구축** | 1/14(화) ~ 2/21(금) | 백엔드, 모바일, 웹 서비스 구현 | - |
| **테스트 및 배포** | 2/24(월) ~ 2/28(금) | 베타 테스트 및 사용자 피드백 | - |

</div>

## 구성원 소개
![image](https://github.com/user-attachments/assets/8f9c6611-b7cf-4824-8915-70d12f2ee35d)
