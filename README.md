# 5th-mini-team8-server

> Double-Slash 5기 8팀 서버 레파지토리
>
> 재료 기반 음식추천

![node_badge](https://img.shields.io/badge/node-%3E%3D%208.0.0-green)
![issue_badge](https://img.shields.io/github/issues/JeonHa/JeonHa-Server)
![license_badge](https://img.shields.io/github/license/JeonHa/JeonHa-Server)
![npm_bedge](https://img.shields.io/badge/npm-v6.10.1-blue)

* 프로젝트 기간: 2020.09.05 ~ 2020.10.17
* [API 문서](https://github.com/kcartoonworld/kcartoonserver/wiki) 




## 프로젝트 설명

남는 재료를 관리해준다
있는 재료를 중심으로 레시피를 알려준다

재료기반 음식 추천앱 ‘**뭐 먹지?**’입니다. 



## Workflow


![workflow](https://user-images.githubusercontent.com/55734369/97807765-240e5500-1ca6-11eb-8b0b-7864c9eb6a08.png)



## Architecture

![architecture](https://user-images.githubusercontent.com/55734369/97808018-7d2ab880-1ca7-11eb-94bd-b24952d6c116.png)



## DB ERD

![ERD](https://user-images.githubusercontent.com/55734369/97807725-d7c31500-1ca5-11eb-8091-86530f15f473.png)



## Depenedncy

```json
{
  "dependencies": {
    "bcrypt": "^5.0.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.0",
    "nodemon": "^2.0.4",
    "promise-mysql": "^4.1.3",
    "request": "^2.88.2"
  }
}
```





## 시작하기

소스 코드는 Windows10 + Visiau Studio Code + Node v14.10.1 + NPM v6.14.8환경에서 제작되었습니다.

* Node.js의 Async/Await 도구를 사용해 (Promise) 비동기 제어를 하고 있습니다.



#### 설치하기

* `nodejs`와 `npm`을 을치합니다. (설치 방법 :  [nodejs.org](https://nodejs.org/) 를 참고)
* Node.js 10 LTS 버전을 설치합니다.
* 실행에 필요한 의존성을 설치합니다.

```
npm install
```



#### 실행하기

```
npm start
```

> localhost3000으로 접속 가능합니다.



## 배포

* [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=awsec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!awsec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템
* [AWS RDS](https://aws.amazon.com/ko/rds/) - 클라우드 환경 데이터베이스 관리 시스템



## 사용된 도구 

* [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임
* [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
* [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
* [PM2](http://pm2.keymetrics.io/) - Express 앱용 프로세스 관리자
* [vscode](https://code.visualstudio.com/) - 편집기
* [Mysql](https://www.mysql.com/) - DataBase



## 개발자
* [이인규](https://github.com/gyuuuu)
* [김병준](https://github.com/KimByoungJun)

[기여자 목록](https://github.com/Double-Slash/5th-mini-team8-server/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.



## 뭐먹지 서버의 연관 프로젝트

* [Android](https://github.com/Double-Slash/5th-mini-team8-android)
