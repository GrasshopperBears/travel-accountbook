# 여행용 가계부

> 제주도로 여행을 갈 예정인데요, 제가 쓰려고 만들었습니다.
>
> 여행 기반의 가계부로 내역, 금액, 날짜, 카테고리, 메모, 장소를 저장하고 조회할 수 있습니다.

### 프로젝트 시작 방법

```bash
git clone https://github.com/GrasshopperBears/travel-accountbook
```

```bash
// at server directory
npm i
npm start
nano .env

// /server/.env
---------------------------------
CLIENT_ADDR=
JWT_SECRET=

# DB
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=

# KAKAO OAUTH
KAKAO_CLIENT_ID=
KAKAO_REDIRECT_URI=
KAKAO_CLIENT_SECRET=
---------------------------------
```

```bash
// at client directory
npm i
npm run build
nano .env

// /client/.env
---------------------------------
REACT_APP_SERVER_HOST=

# KAKAO
REACT_APP_REST_API_KEY=
REACT_APP_KAKAO_OAUTH_URL=
REACT_APP_KAKAO_CALLBACK_URL=
---------------------------------
```



## 서비스 소개

#### 메인 화면

![메인 화면](https://user-images.githubusercontent.com/34625313/105060757-1ce42f80-5abc-11eb-88cf-99570d226f22.png)

좌측에는 생성한 여행 목록이 보이고 여행 추가, 로그아웃 버튼이 있습니다.

본 화면에는 여행 전체에서 사용한 금액, 오늘 사용한 금액이 나와있습니다.

목록은 일 별로 묶어서 보여지고 입력한 정보들을 확인할 수 있습니다.



#### 여행 추가

![여행 추가](https://user-images.githubusercontent.com/34625313/105060460-c971e180-5abb-11eb-90e4-e92969e5dd7a.png)

여행 이름과 여행 장소를 지정할 수 있습니다.



#### 카테고리 관리

![카테고리 관리](https://user-images.githubusercontent.com/34625313/105061660-1b673700-5abd-11eb-958b-5d5b2dd45fc3.png)

헤더의 카테고리 수정을 통해 카테고리를 관리할 수 있습니다. 수정 및 삭제도 가능합니다.



#### 내역 추가

우측 하단의 지출 내역 추가하기 버튼을 클릭하면 지출 내역을 추가할 수 있습니다.

![내역 추가](https://user-images.githubusercontent.com/34625313/105060457-c8d94b00-5abb-11eb-8e65-85e85e809606.png)

장소의 경우 검색 및 선택할 수 있습니다.



#### 달력으로 보기

![달력으로 보기](https://user-images.githubusercontent.com/34625313/105060463-c971e180-5abb-11eb-8938-74c5db7c8853.png)



#### 일별 지출 내역 확인

![일별 지출 내역 확인](https://user-images.githubusercontent.com/34625313/105060465-ca0a7800-5abb-11eb-8712-4c7cc82479f9.png)



#### 카테고리 별 통계 확인

![카테고리별](https://user-images.githubusercontent.com/34625313/105060467-caa30e80-5abb-11eb-87d6-43acfcdf12ed.png)



#### 장소 별 확인

*추후 구현 예정입니다.*

