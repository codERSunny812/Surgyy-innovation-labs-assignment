## Surgyy Innovation Labs

A real-time hospital triage management system that efficiently handles patient intake, prioritization, treatment, and discharge using a priority queue. Built with Node.js, Express, MongoDB, WebSockets, and JWT authentication.

### 📌 Features

#### 🏥 Patient Queue Management

- Add patients with a triage level (1-5, where 1 is the highest priority).

- Prioritize based on triage level and wait time.

- Automatically move patients to treatment when a doctor is available.

- Discharge patients after treatment.

#### 📡 Real-time WebSocket Updates

- Notify staff when a critical patient (triage 1) is added.

- Alert if hospital capacity exceeds safe limits.

#### 🔐 Authentication & Security

- JWT-based authentication for doctors/admins.

- Role-based access control (RBAC) for API endpoints.

- Rate limiting to prevent abuse.

#### 🛠 Tech Stack

- Backend: Node.js, Express.js

- Database: MongoDB

- Authentication: JWT

- Real-time Updates: WebSockets (Socket.io)

#### 🚀 Installation & Setup

- 1️⃣ Clone the Repository

```javascript
git clone https://github.com/yourusername/hospital-triage-system.git

cd hospital-triage-system
```

- 2️⃣ Install Dependencies

```javascript
npm install
```

- 3️⃣ Configure Environment Variables

##### Create a .env file and add

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- 4️⃣ Start the Server

```bash
npm start
```

#### The server will run at <http://localhost:3000>

#### 🏥 API Endpoints

👤 Authentication

- POST /api/v1/auth/register – Register a new doctor.

- POST /api/v1/auth/login – Login and receive JWT.

#### 🏥 Patient Management

- POST /api/v1/patient/add – Add a patient to the queue.

- GET /api/v1/patient/queue – Get current patient queue.

- POST /api/v1/patient/treat – Move patient to "being treated".

- POST /api/v1/patient/discharge – Discharge a patient.

#### 📡 WebSocket Events

- patient_added – Broadcasts when a new patient is added.

- critical_patient_alert – Alerts when a triage level 1 patient arrives.

#### 🛡 Security Measures

- ✅ JWT Authentication for protected routes.
- ✅ Role-based access control (RBAC).
- ✅ Rate limiting to prevent API abuse.
- ✅ Input validation to prevent malformed requests.

#### 🤝 Contributing

Feel free to submit pull requests or raise issues!

#### 🧑‍💻 Author

- 👤 SUSHIL PANDEY
- 📧 <sengersunny448@gmail.com>
