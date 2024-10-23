# NPTEL Practice Website

A web platform for practicing NPTEL quizzes made using React.

## Features

- **Customizable Quiz System**: Easily update quiz questions to suit different topics and quiz structures.
- **Visitor Analytics Server**: Includes an optional **Express-based server** that tracks website visitors per hour and stores the data in a MongoDB database, helping you track quiz participation and active users over time.

## Setup and Deployment

### Frontend (React App)

#### Prerequisites
- Node.js and npm installed.

#### Steps:
1. **Clone the repository**:
	```bash
	git clone https://github.com/ashishsaranshakya/nptel-practice.git
	```

2. **Install dependencies**:
	```bash
	npm install
	```

3. **Environment Setup**:
   	Create a `.env` file in the root of the React app
    ```
    VITE_ANALYTIC_SERVER_URL=<analytics-server-url>
    ```

4. **Build the App**:
	```bash
	npm run build
	```
	The build will create a static version of the app in the `dist/` folder, which can be deployed to any static hosting service.

5. **Run the App Locally**:
   If you want to run the app locally:
   ```bash
   npm run dev
   ```

### Analytics Server (Express and MongoDB)

#### Prerequisites
- Node.js and npm installed.
- MongoDB instance (either local or remote).

#### Steps:
1. **Navigate to the server directory and install dependencies**:
	```bash
	cd analytics-server
	npm install
	```

2. **Environment Setup**:
   	Create a `.env` file in the `analytics-server` directory
	```
	MONGO_URI=<your-mongodb-uri>
	PASSWORD=<admin-password-for-reset>
	```

3. **Run the Server**:
	```bash
	npm start
	```
	This will start the server on `http://localhost:3000`.

#### The server has the following routes:
   - `POST /take-quiz`: Tracks a quiz being taken and increments the visitor count for the current hour.
   - `POST /reset-stats`: Resets the visitor stats (requires the password specified in `.env`).
   - `GET /stats`: Retrieves the current statistics of visitors per hour.

## Customization

### 1. Customizing Questions
- Modify the `questions.json` file in the `src/assets` directory of the frontend project to add or update quiz questions.
- The questions are stored as an array of chapters with each chapter containing an array of questions.
  ```json
  [
	[
		{
		  "question": "question text",
		  "options": ["option 1", "option 2", "option 3", "option 4"],
		  "answer": "option 2"
		},
		...
	],
	...
  ]
  ```

### 2. Adjusting Analytics
- The analytics server can be customized to track more metrics or additional data by modifying the `Visitor` model and Express routes in the `analytics-server` codebase.

## License
This project is open-source and available under the [MIT License](LICENSE).