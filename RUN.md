# Login App - Run Guide

Login, Sign Up, and Dashboard app with React frontend, Express backend, and MySQL database.

## Prerequisites

- Node.js 18+ (for local run)
- Docker and `docker-compose` (for Docker run)
- MySQL (only if running locally without Docker)

---

## Option 1: Run with Docker (Recommended)

This starts both **MySQL** and the **web app** together.

### Start app

```bash
docker-compose up --build -d
```

### Open in browser

```bash
http://localhost:8080
```

### Stop app

```bash
docker-compose down
```

### View logs

```bash
docker-compose logs -f web
docker-compose logs -f db
```

### Rebuild after code changes

```bash
docker-compose down
docker-compose up --build -d
```

---

## Option 2: Run Locally (Without Docker)

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

Copy from example:

```bash
cp .env.example .env
```

Update values in `.env`:

```env
DB_HOST=172.17.0.6
DB_USER=root
DB_PASSWORD=q1234567
DB_NAME=login_app
DB_PORT=3306
PORT=3001
```

### 3. Create database table

If MySQL is already running, execute:

```bash
mysql -h 172.17.0.6 -u root -p < server/schema.sql
```

### 4. Start frontend + backend

```bash
npm run dev
```

### Open in browser

```bash
http://localhost:5173
```

---

## App Flow

1. Open **Sign Up** page
2. Create account with:
   - Full Name
   - Email
   - City
   - Password
3. Go to **Login** page
4. Login with email and password
5. After successful login, **Dashboard** will open
6. Click **Logout** to return to login page

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server and DB connection |
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/login` | Login user |

### Example signup request

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Akash Gaur","email":"akash@test.com","password":"secret123","city":"Delhi"}'
```

### Example login request

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"akash@test.com","password":"secret123"}'
```

---

## Database Table

Database name: `login_app`  
Table name: `users`

| Column | Type |
|--------|------|
| id | INT (Primary Key, Auto Increment) |
| name | VARCHAR(100) |
| email | VARCHAR(255, Unique) |
| password | VARCHAR(255, Hashed) |
| city | VARCHAR(100) |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend + backend locally |
| `npm run server` | Run backend only |
| `npm run client` | Run frontend only |
| `npm run build` | Build frontend for production |
| `docker-compose up --build -d` | Start app in Docker |
| `docker-compose down` | Stop Docker containers |
| `docker-compose ps` | Check running containers |

---

## Troubleshooting

### Error: `Unexpected token '<', "<!doctype "... is not valid JSON`

This means frontend is running but backend API is not reachable.

**Fix:**
- Use `docker-compose up --build -d` (not only static frontend)
- Make sure web container is running: `docker-compose ps`

### MySQL connection failed

**Fix:**
- Wait a few seconds after `docker-compose up` for MySQL to start
- Check DB logs: `docker-compose logs db`

### Port already in use

**Fix:**
- Change port in `docker-compose.yml`:

```yaml
ports:
  - "8081:3000"
```

Then open: `http://localhost:8081`

---

## Project Structure

```text
login-app/
├── src/                 # React frontend
├── server/              # Express backend + auth routes
├── server/schema.sql    # MySQL table schema
├── docker-compose.yml   # Docker services
├── Dockerfile           # Web app Docker image
└── .env                 # Local environment variables
```
