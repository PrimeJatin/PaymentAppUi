💳 PaymentApp Mobile UI
A modern, dark-mode focused mobile payment application UI built using React components. The app provides quick access to Scan-to-Pay functionality, bill payments, money transfers, and transaction history.

✨ Features
Mobile-First Design: A clean, vertical layout optimized for mobile screens.

Dark Mode Aesthetic: Utilizes a modern dark/light contrast for a premium feel.

Quick Scan-To-Pay: Prominent QR scanner functionality on the home screen and in the navigation bar.

Comprehensive Services: Features popular bill payments, utilities, finance, and lifestyle categories.

Alerts & Reminders: Dedicated section for system alerts, offers, and bill reminders.

Detailed History: Transaction history view with filtering options (All, Payments, Transfers, Bills).

Authentication Flow: Simple and clear login screen.

🛠️ Tech Stack & Structure
This project is built using the following technologies, as suggested by your file structure:

Frontend Framework: React

Tooling: Vite (indicated by vite.config.js)

Styling: CSS (likely a utility framework like Tailwind CSS or similar)

Components: Logic is broken into multiple pages/views: First.jsx, Second.jsx, Third.jsx, and LoginContent.jsx.

📂 Key Components and Views
Component/View	Description	Corresponding Screenshot
LoginContent.jsx	The authentication screen.	Screenshot 2025-10-15 152021.png
First.jsx (Home)	Main dashboard showing Scan-to-Pay and Money Transfer options.	Screenshot 2025-10-15 151959.png
Second.jsx (Services)	Full list of services (Utilities, Donations, etc.).	Screenshot 2025-10-15 152634.png
Third.jsx (History/Alerts)	Transaction history and Alerts & Messages screens.	Screenshot 2025-10-15 152528.png, Screenshot 2025-10-15 152402.png

Export to Sheets
💻 Installation and Setup
Prerequisites
Node.js (LTS recommended)

npm or yarn

1. Clone the repository
Bash

git clone [YOUR_REPO_URL]
cd PaymentApp
2. Install Dependencies
Bash

npm install
# or
yarn install
3. Run the Project
Since this project uses Vite, you can start the development server using:

Bash

npm run dev
# or
yarn dev
The application should now be viewable in your browser, likely at http://localhost:5173. View the app using a mobile device emulator in your browser's developer tools for the best experience.

🔑 Login Credentials
Use the following credentials to access the dashboard after starting the application:

Field	Value
Username	admin@gmail.com
Password	123
