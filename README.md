# UzbCode - Блог для узбекских разработчиков

Django-приложение для блога с поддержкой многоязычности (русский, английский, узбекский), системой статей, комментариев и проектов.

## Особенности

- 🌐 Многоязычность (RU/EN/UZ)
- 📝 Система статей с CKEditor
- 💬 Комментарии и лайки
- 👤 Система пользователей
- 🎨 Темная/светлая тема
- 📱 Адаптивный дизайн
- 🏷️ Теги и категории
- 📊 Проекты и портфолио

## Установка и запуск

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd uzbek_code
```

2. Создайте виртуальное окружение:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows
```

3. Установите зависимости:
```bash
pip install -r requirements.txt
```

4. Создайте файл `.env`:
```bash
cp .env.example .env
```

5. Выполните миграции:
```bash
python manage.py migrate
```

6. Создайте суперпользователя:
```bash
python manage.py createsuperuser
```

7. Соберите статические файлы:
```bash
python manage.py collectstatic
```

8. Запустите сервер:
```bash
python manage.py runserver
```

### Деплой на Heroku

1. Установите Heroku CLI
2. Войдите в Heroku: `heroku login`
3. Создайте приложение: `heroku create your-app-name`
4. Установите переменные окружения:
```bash
heroku config:set SECRET_KEY="your-secret-key"
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS="your-app-name.herokuapp.com"
```
5. Деплой: `git push heroku main`

## Переменные окружения

- `SECRET_KEY` - Секретный ключ Django
- `DEBUG` - Режим отладки (True/False)
- `ALLOWED_HOSTS` - Разрешенные хосты (через запятую)
- `DATABASE_URL` - URL базы данных (для продакшена)

## Структура проекта

```
uzbek_code/
├── about_us/          # Приложение "О нас"
├── accounts/          # Система пользователей
├── articles/          # Система статей
├── comments/          # Комментарии
├── likes/            # Лайки
├── projects/         # Проекты
├── candidate/        # Контакты
├── static/           # Статические файлы
├── templates/        # Шаблоны
├── media/           # Загруженные файлы
└── uzbek_code/      # Основные настройки
```

## Технологии

- Django 4.2
- PostgreSQL (продакшен) / SQLite (разработка)
- CKEditor для редактирования
- Bootstrap/CSS для стилей
- Gunicorn для WSGI сервера

## Лицензия

MIT License
