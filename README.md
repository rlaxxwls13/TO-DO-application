# Opensource 7 - TO-DO application

## 개발언어

React Native(Javascript)

## 왜 개발하였는가?

아이폰 기본 캘린더 어플을 사용하면서 직관적이지 못하다는 문제점을 파악하고, 입력한 정보들을 빠르고 보기 쉽게 돌려받아야 한다고 생각이 들어 사용자 경험을 토대로 새로운 기능을 추가하여 향상되고 개선된 사용성을 제공하고자 함.

## 개발할 때 중점적으로 본 것

- 해야 할 일을 한눈에 알아볼 수 있게 시각화
  
  - 태그 색
  
  - 달력
  
  - 통계

- 통계를 제공하여 사용자가 성취감을 얻어 다른 일들을 할 원동력이 될 수 있게 함.

- 직관적인 버튼들과 기능들

- 사용하면서 답답함이 느껴지지 않도록 최적화

## 프로젝트 파일 / 폴더 구조

| 경로               | 용도                                     |
| ---------------- | -------------------------------------- |
| assets/          | 에셋 폴더                                  |
| components/      | 할 일 추가, 태그 추가, 버튼 등이 있는 재사용가능한 컴포넌트 폴더 |
| lib/TodoStore.js | 할 일과 태그를 저장하고 불러오는 사용자 정의 hook         |
| readme_files/    | 깃허브 프로젝트의 README.md를 위한 파일들이 있는 폴더     |
| tabs/            | 달력, 할 일, 통계 탭 컴포넌트들이 있는 폴더             |
| .gitignore       | 깃이 무시할 파일이나 폴더 설정                      |
| .prettierrc      | Prettier를 활용한 코드 스타일 통합                |
| App.js           | 태그, 탭, 메뉴 등이 들어가는 기반이 되는 컴포넌트          |
| README.md        | 프로젝트 설명 파일                             |
| app.json         | 기본적인 앱 설정 파일, 안드로이드나 아이폰 각각 필요한 설정도 함  |
| babel.config.js  | Babel 설정 파일                            |
| package.json     | npm, 의존성 등을 관리하는 파일                    |

## 기능

- [x] 할일 추가 / 편집 / 삭제

- [x] 태그 추가 / 편집 / 삭제

- [x] 태그 별 분류

- [x] 검색 기능

- [x] 통계 ( 전체 / 일간 / 주간 / 월간 )

- [x] 달력

- [ ] 알림 기능

## 스크린샷

| ![](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/calender_tab.png) | ![](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/todo_tab.png) | ![](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/stat_tab.png) |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
|                                                                                                | ![](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/todo.png)     | ![](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/tag.png)      |

## 컴포넌트 데이터 흐름도![diagram](https://raw.githubusercontent.com/chjunyo/opensource_7/main/readme_files/diagram.png)

- License 컴포넌트 생략

- 대부분의 컴포넌트들은 단방향 데이터의 흐름에 맞게 데이터는 자식으로만 전달된다.

- 자식으로부터 부모에게는 이벤트를 활용하여 데이터를 전달하여 부모가 그 데이터를 활용한다.

## 개선점

- 알림기능

- 성능향상
  
  - 현재 즉각적인 반응이 잘 안이루어질 때도 있음

- 안티패턴(anti-pattern) 개선
  
  - 현재 단방향 데이터 흐름에 맞지 않는 부분이 있음
    
    - 이유: 자식이 부모의 값을 직접적으로 변경하게 된다면, 나중에 프로젝트가 커지게 되면 버그가 발생할 가능성이 높고 디버깅이 어려워 짐.
