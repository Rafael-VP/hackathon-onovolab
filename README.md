# Academic Profile Analyzer (APA)

An AI-powered tool for analyzing the quality and integrity of academic researchers.

## How to run:
- Edit backend/prompt.txt.example.
- Edit backend/.env.example.
```shell
mv backend/prompt.txt.example backend/prompt.txt
mv backend/.env.example backend/.env
```

### - With Docker:
```shell
docker-compose up --build
```

### - From source:
```shell
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
flask run
```
and
```shell
cd frontend
npm install
npm start
```
