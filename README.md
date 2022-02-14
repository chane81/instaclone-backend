# instaclone-backend

인스타그램 클론 backend

## Prisma
### Setup
- prisma url
  - https://www.prisma.io/docs/concepts/components/prisma-client
- package install
  ```bash
  $ yarn add -D prisma
  $ yarn add @prisma/client
  $ npx prisma init
  ```
- vsc extension setup
  - "Prisma" 검색 후 설치

### db modeling & migrate
- 모델작성
  - /prisma/schema.prisma
- 마이그레이트
  ```bash
  $ npx prisma migrate dev --name init
  ```

## Postgress DB
- download
  - <https://www.postgresql.org/download/windows>
  - 설치파일 설치시 PG Admin 은 제외하고 설치
    - 설치하고 확인결과 제대로 실행이 되지 않음
  - PG ADMIN 4는 아래에서 다운받아서 따로 설치 할 것
    - <https://www.pgadmin.org/download/pgadmin-4-windows>

- 사용자 계정생성 및 비번 set

  ```sql
    -- user add
    create user chane81
      superuser
      createdb
      createrole
      replication
      bypassrls;

    -- user pwd change
    alter user chane81 with password '12345';
  ```