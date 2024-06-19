<h1 align="center"><b>mmop v1.0.0</b></h1>
<p align="center">
<img src="https://img.shields.io/badge/made by-noma-red">
<img src="https://img.shields.io/badge/React-18.2.0-blue">
<img src="https://img.shields.io/badge/next-14.2.2-purple">
<img src="https://img.shields.io/badge/typescript-5.3.3-brightgreen">
</p>
  
<img width="100%" alt="thumbnail" src="https://github.com/Noma98/mmop-project/assets/69305320/c5e6d209-2ab0-4af4-b33f-903bd15447a3">
  
<h2 align="center"><a href="https://mmop.vercel.app/"><b> Live Demo (Click Here!🌟) </b></a></h2>

<br/>

# 📰 Table Of Contents

1. [ 프로젝트 소개](#1-프로젝트-소개)
2. [ 개발 및 배포 환경](#2-개발-및-배포-환경)
3. [ 어플리케이션 기능](#3-어플리케이션-기능)

   - [ 1. 구글 로그인](#1-구글-로그인)
   - [ 2. 포트폴리오 커스텀하기](#2-포트폴리오-커스텀하기)
     - [2.1 포트폴리오 정보 수정](#21-포트폴리오-정보-수정)
     - [2.2 사용자 정보 수정](#22-사용자-정보-수정)
     - [2.3 커스텀 결과물](#23-커스텀-결과물)
   - [ 3. 프로젝트 등록](#3-프로젝트-등록)
   - [ 4. 프로젝트 조회](#4-프로젝트-조회--필터링)
   - [ 5. 반응형 UI](#5-반응형-ui)

   <br/>

## 1. 프로젝트 소개

mmop는 make my own portfolio의 약자로, 나만의 포트폴리오를 만드는 포트폴리오 웹 제작 서비스입니다.

구글 로그인을 통해 손쉽게 회원가입이 가능하며, 로그인 후 사용자는 사용자만의 포트폴리오 주소(https://mmop.vercel.app/id/아이디)를 가질 수 있습니다.

사용자는 설정에서 자신을 소개하는 글을 작성할 수 있고, 프로필 사진, 배경 컬러, 로고, 포트폴리오 이름, 서브 타이틀, 스킬, 연락처 등을 수정해 포트폴리오를 커스텀 할 수 있습니다. 개발자의 경우 깃허브 주소를 등록하면, 포트폴리오 최상단에 깃허브 컨트리뷰션도 보이게 할 수 있습니다.

My Projects 섹션에서는 모든 글이 프로젝트 기간 최신순으로 정렬되고, 프로젝트 타입(business/side)과 최근 4년간의 년도로 필터링 해서 볼 수 있습니다.

<br/>

## 2. 개발 및 배포 환경

- 💻 Development Environment
  : nextjs, typescript, next-auth, sanity, swr, jest, testing-library, tailwind

- 🚀 Deployment : Vercel

- 📅 Period : 5/23 ~ 6/16 - Version 1.0.0

- 🔔 Modules
  - date-fns, nanoid, next-auth, react-color, react-date-range, react-github-calendar, react-hook-form, react-multi-carousel, react-spinners, swr, jest, testing-library, typescript, dotenv

<br/>

## 3. 어플리케이션 기능

### 1. 구글 로그인

- 구글 계정을 이용하여 별도의 회원가입 없이 쉽게 서비스 이용이 가능합니다.
  <img height="120" alt="image" src="https://github.com/Noma98/mmop-project/assets/69305320/fd2ffee4-89a9-4daf-846a-9a30827893fa">
- 로그인하면 자동으로 이름과 이메일, 프로필 사진이 저장되고, 이를 기반으로 기본적인 포트폴리오가 생성됩니다.
- 포트폴리오는 상단 헤더의 My Portfolio→ 버튼을 클릭해 확인할 수 있습니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/73239a9c-61c4-4862-b8b8-b2cab35ef239)
  <img width="300" alt="image" src="https://github.com/Noma98/mmop-project/assets/69305320/c842d7ba-e5b4-4b6d-b80e-9c76748eaef6">

### 2. 포트폴리오 커스텀하기

#### 2.1 포트폴리오 정보 수정

- 제목, 부제, 소개, 로고, 배경색을 원하는 대로 설정할 수 있습니다. 사용자가 정한 제목, 부제, 로고를 가지고 포트폴리오 페이지의 메타데이터를 동적으로 설정합니다.
  ![Group 100](https://github.com/Noma98/mmop-project/assets/69305320/866530b7-e7d7-46fb-bdb8-153d14de9d79)
- 또한 프로젝트 소개란의 배경을 원하는 그라데이션 색상을 지정할 수 있습니다.
  ![gradient](https://github.com/Noma98/mmop-project/assets/69305320/73be7773-7743-43e2-b805-18c82c0be877)

#### 2.2 사용자 정보 수정

- 이름, 연락처, 프로필 이미지, 스킬, 깃허브 주소를 수정해 포트폴리오를 커스텀 할 수 있습니다.
  ![Group 101](https://github.com/Noma98/mmop-project/assets/69305320/32bc4d1b-3a78-414d-9751-1485c249d7fa)

#### 2.3 커스텀 결과물

- Setting에서 변경한 내용을 바탕으로 포트폴리오가 기본 정보가 수정됩니다.
  ![aboutme](https://github.com/Noma98/mmop-project/assets/69305320/aa39a1ca-3f1a-4047-8238-f069e80cdd2e)
  ![contactme](https://github.com/Noma98/mmop-project/assets/69305320/bc32096f-9c9d-4915-b1f4-42461427dc7d)
- 사용자 기본 정보에서 깃허브 주소를 작성한 경우 포트폴리오 상단에 깃허브 잔디를 표시해줍니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/aafeba3e-14ea-41f8-9277-f30092695248)
- 만약 사용자가 유효하지 않는 주소를 작성했거나, 사용자가 private 계정일 경우 아래와 같이 볼 수 없음을 표기합니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/cf164a14-b255-466a-aea2-cd4f6de62458)
- 아예 깃허브 주소를 작성하지 않은 사용자는 다음과 같은 기본 UI가 보여집니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/fab4b8a2-a804-4bf2-a754-3bcbfdaaae72)

### 3. 프로젝트 등록

- 등록된 프로젝트가 하나도 없으면서, 로그인한 사용자가 본인 포트폴리오을 보고 있을 경우, 다음과 같이 Start now 버튼이 보여집니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/bf3a2f87-f0c3-4099-b62e-0f52130d2267)
- 본인 포트폴리오가 아니거나 로그인 하지 않은 경우, 아래와 같이 보여집니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/57f1a9b7-9e27-4c75-a2da-82f548f9a10d)
- 다시 돌아와, Start Now 버튼을 누르면 아래와 같이 프로젝트를 등록할 수 있는 페이지로 이동이 됩니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/ba5bc7b9-558a-4aee-b594-ee6617f7ef55)
- Period 입력창을 누르면 아래와 같이 기간을 선택할 수 있는 캘린더가 뜹니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/6a53f6d6-d072-4233-a118-62187d1bdc9c)
- Acievements는 하단의 Add achievement 버튼을 통해 새 입력창을 생성할 수 있고 우측 X 버튼으로 다시 제거할 수도 있습니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/ad10de04-1e8c-43a8-bcfd-301b1ddc4c38)
- 프로젝트 이미지는 원하는 만큼 선택해 추가할 수 있습니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/617ed900-7bfb-4c96-8e54-07dbde7c882b)
- 스킬은 입력 창에 작성후 엔터를 누르면 하단에 태그가 생성되며, 태그를 다시 클릭하면 등록된 스킬을 제거할 수 있습니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/eb5b1d74-ebef-4c1b-9928-8fca12ae94d2)

### 4. 프로젝트 조회 (+ 필터링)

- 프로젝트를 저장하면 포트폴리오 페이지에서 다음과 같이 프로젝트를 볼 수 있게 됩니다. (만약 Setting에서 깃허브 주소를 등록한 경우 My Projects가 아닌 My {dev} Projects로 제목이 보여집니다.)
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/6eaeff9f-5946-47c2-a16a-b58fef5fc376)
- 이미지는 캐러셀로 보여집니다.
  ![Jun-19-2024 11-32-53](https://github.com/Noma98/mmop-project/assets/69305320/6651ea99-b596-4526-8f56-26a1b6556303)
- 최근 4년과 프로젝트 타입에 따라 필터링 할 수 있습니다. 만약, 해당하는 프로젝트가 없을 경우 아래와 같이 표기됩니다.
  ![image](https://github.com/Noma98/mmop-project/assets/69305320/667bcb04-5dce-4b31-9ccf-a3e6908d35e0)

### 5. 반응형 UI

- 모바일 사이즈에도 깨지지 않게 처리했습니다.

  <img width="250" alt="image" src="https://github.com/Noma98/mmop-project/assets/69305320/4e8420f9-5987-4e4e-8409-481b4f724331">
  <br/>
