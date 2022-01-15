# docker_homework
# 1 Лекция
Написать Dockerfile для frontend располагается в директории /frontend, собрать и запустить

# Решение:
В директории frontend создал Dockerfile. Коментировал в нем решения,
которые принимал. 
Запусал с помощью
```
docker build -t alex/testfront .
docker run -p 8080:80 alex/testfront
```

# 2 Лекция
Написать Dockerfile для backend который располагается в директории /lib_catalog(для сборки контейнера необходимо использовать файл /lib_catalog/requirements.txt), для работы backend необходим postgresql, т.е. необходимо собрать 2 контейнера:
1. backend
2. postgresql
Осуществить сетевые настройки, для работы связки backend и postgresql

# Решение:
Создадим сеть и volume для повторного исопьзования
```
docker network create -d bridge test-network
docker volume create test-data
```

Соберем образ сервера БД и запустим в фоновом режиме
```
docker build -t alex/testfdb -f Dockerfile.postgresql .

docker run -d -p 5432:5432 --network test-network \
          -v test-data:/var/lib/postgresql/data \
            --name database alex/testfdb
```

Соберем образ Django приложение и запустим development сервер в фоне
```
docker build -t alex/testback -f Dockerfile.django .
docker run -d -p 8000:8000 --network test-network \
          --name testback01 alex/testback01
```

Выполним миграцию БД
```
docker exec testback01 python manage.py migrate
```

Создадим администратора приложения
```
docker exec -it testback01 python manage.py createsuperuser
```

Админка будет доступна по адресу $SERVER:8000

# 3 Лекция
Написать docker-compose.yaml, для всего проекта, собрать и запустить

# Решение:
Создал environment.env и docker-compose.yaml, в котором реализована 
сборка образов. Окончательное приложение работает на 80 порту. 

Сборка образов и запуск docker-compose осуществлял через:
```
docker-compose up --build
```

# Критерий оценки финального задания
1. Dockerfile должны быть написаны согласно пройденным best practices
2. Для docker-compose необходимо использовать локальное image registry
3. В docker-compose необходимо сетевые настройки 2 разных интерфейса(bridge), 1 - для фронта, 2 - для бека с postgresql

4.* Осущиствить сборку проекта самим docker-compose команда docker-compose build(при использовании этого подхода необходимо исключить 2 пункт из критерии оценки)
