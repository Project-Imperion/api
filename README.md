# The Imperion API
RESTful backend API for Project Imperion.
Built with Node.js, TypeScript, Express, and MongoDB.

## 🛠️ Requirements
- Node.js v18.0.0 or newer
- npm 9+
- GitHub account (for commiting / forking)
- Docker (optional, for a local database)
- MongoDB Compass (optional)

## 🚀 Quick Start
### 1. Download / Clone the Repository
```bash
git clone https://github.com/Project-Imperion/api.git
cd api
```

### 2. Install Dependencies
Make sure you have Node.js ≥ 18.0.0 installed.
Then run:
```bash
npm install
```

### 3. Set up the DB
Create a DB with the handy included script:
```bash
npm run setupDB
```

You can also reset any changes you have made to the db with:
```bash
npm run resetDB
```

### 4. Run Locally
Start the dev server with:
```bash
npm run dev
```

Test the endpoints using postman, or a locally hosted version of the website.


## 🤝 Contributing
1. Fork the repository and clone your fork
2. Create your feature branch: git checkout -b feature/your-change
3. Make changes and commit: git commit -am 'Add your feature'
4. Push to the branch: git push origin feature/your-change
5. Open a Pull Request
