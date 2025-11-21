# AI Email Reply Generator 📧

An intelligent email reply generator powered by Google Gemini AI. This project includes a full-stack web application and a Chrome extension that integrates directly into Gmail to help users generate contextual and tone-appropriate email responses quickly and efficiently.

## 🌟 Features

### Web Application
- **AI-Powered Replies**: Generate intelligent email responses using Google Gemini AI
- **Multiple Tone Options**: Choose from various tones (Formal, Casual, Friendly, Professional, Urgent)
- **Real-time Generation**: Instant email reply generation with loading indicators
- **Copy to Clipboard**: Easy one-click copy functionality
- **Clean UI**: Modern, responsive interface built with Material-UI
- **Split View**: Side-by-side view of original email and generated reply

### Chrome Extension
- **Gmail Integration**: Seamlessly integrates into Gmail's compose interface
- **One-Click Generation**: AI Reply button directly in Gmail toolbar
- **Auto-Insert**: Generated replies are automatically inserted into compose box
- **Context-Aware**: Reads the original email content for contextual responses

## 🏗️ Architecture

### Frontend (Web App)
- **React 18** with Hooks
- **Material-UI (MUI)** for UI components
- **Axios** for API calls
- **Vite** as build tool

### Backend
- **Spring Boot 3.x**
- **Java 23**
- **Maven** for dependency management
- **Google Gemini AI** for email generation

### Chrome Extension
- **Manifest V3**
- **Content Scripts** for Gmail DOM manipulation
- **Service Worker** for API communication
- **Chrome APIs** for extension functionality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Java 23**
- **Maven** (v3.8 or higher)
- **Google Chrome** browser (for extension)
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hp15aug/springboot-email-reply.git
cd springboot-email-reply
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd email-reply-sb
```

#### Configure Environment Variables

Create an `application.properties` file in `src/main/resources/`:

```properties
# Server Configuration
server.port=8080

# Gemini AI Configuration
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

**Note**: Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.

#### Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### 3. Frontend Setup (Web App)

#### Navigate to Frontend Directory
```bash
cd ../email-reply-frontend
```

#### Install Dependencies
```bash
npm install
```

#### Run Development Server
```bash
npm run dev
```

The frontend application will start on `http://localhost:5173` (or another port if 5173 is occupied)

### 4. Chrome Extension Setup

#### Load the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right corner)
3. Click **Load unpacked**
4. Select the `extension` folder from your project directory
5. The extension will now appear in your Chrome toolbar

#### Using the Extension

1. Navigate to [Gmail](https://mail.google.com)
2. Open an email you want to reply to
3. Click the **Reply** button to open the compose window
4. Look for the **AI Reply** button in the compose toolbar
5. Click it to generate an AI-powered response
6. The generated reply will be automatically inserted into the compose box
7. Edit if needed and send!

**Note**: Make sure the backend server is running on `http://localhost:8080` for the extension to work.

## 📁 Project Structure

```
email-reply-generator/
├── email-reply-frontend/          # React Frontend
│   ├── src/
│   │   ├── App.jsx               # Main application component
│   │   └── main.jsx              # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── email-reply-sb/               # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/email/reply/
│   │   │   │   ├── config/       # Configuration classes
│   │   │   │   ├── controller/   # REST controllers
│   │   │   │   ├── models/       # Data models
│   │   │   │   ├── service/      # Business logic
│   │   │   │   └── EmailReplySbApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
│
└── extension/                    # Chrome Extension
    ├── manifest.json             # Extension configuration
    ├── popup.js                  # Content script (Gmail integration)
    ├── popup.css                 # Extension styles
    ├── background.js             # Service worker (API calls)
    ├── reply.png                 # Extension icon
    └── icons/                    # Additional icons
```

## 🔌 API Endpoints

### Generate Email Reply

**Endpoint**: `POST /api/email/generate`

**Request Body**:
```json
{
  "emailContent": "Original email text here...",
  "tone": "Professional"
}
```

**Response**:
```json
"Generated email reply text..."
```

**Available Tones**:
- `None` (Default)
- `Formal`
- `Casual`
- `Friendly`
- `Professional`
- `Urgent`

## 🎨 Usage

### Web Application

1. **Paste Original Email**: Copy and paste the email you want to reply to in the left panel
2. **Select Tone**: Choose the desired tone for your reply from the dropdown
3. **Generate**: Click the "Generate" button to create an AI-powered reply
4. **Edit & Copy**: Review the generated reply, make any edits, and copy to clipboard

### Chrome Extension

1. **Open Gmail**: Navigate to your Gmail inbox
2. **Open Email**: Click on an email you want to reply to
3. **Start Reply**: Click the "Reply" button in Gmail
4. **Generate**: Click the "AI Reply" button in the compose toolbar
5. **Review & Send**: Review the generated response, edit if needed, and send

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI Framework |
| Material-UI | Component Library |
| Axios | HTTP Client |
| Vite | Build Tool |

### Backend
| Technology | Purpose |
|------------|---------|
| Spring Boot | Backend Framework |
| Java 23 | Programming Language |
| Maven | Build & Dependency Management |
| Google Gemini | AI Model |

### Extension
| Technology | Purpose |
|------------|---------|
| Chrome Extension API | Browser Integration |
| Manifest V3 | Extension Framework |
| Content Scripts | DOM Manipulation |
| Service Worker | Background Processing |

## ⚙️ Configuration

### Backend Configuration Options

Edit `application.properties` to customize:

```properties
# Server Port
server.port=8080

# CORS Configuration (if needed)
cors.allowed.origins=http://localhost:5173

# Gemini Configuration
gemini.api.key=${GEMINI_API_KEY}
gemini.api.url=${GEMINI_API_URL}
gemini.model=gemini-pro
```

### Frontend Configuration

Update API endpoint in `App.jsx` if backend runs on a different port:

```javascript
const response = await axios.post("http://localhost:8080/api/email/generate", {
  emailContent,
  tone,
});
```

### Extension Configuration

The extension is configured to connect to `http://localhost:8080` by default. If you need to change this, update the API URL in `background.js`.

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure Java 23 is installed: `java -version`
- Check if port 8080 is available
- Verify Gemini API key is correctly set

**Frontend can't connect to backend:**
- Ensure backend is running on port 8080
- Check CORS configuration
- Verify API endpoint URL in `App.jsx`

**Extension not working:**
- Ensure backend is running on `http://localhost:8080`
- Check if extension is enabled in `chrome://extensions/`
- Verify you're on Gmail (`mail.google.com`)
- Check browser console for errors (F12 → Console)
- Try reloading the extension and refreshing Gmail

**AI Reply button not appearing:**
- Wait a few seconds after opening compose window
- Refresh the Gmail page
- Check if you're in the compose view
- Reload the extension from `chrome://extensions/`

**API Key Issues:**
- Verify your Gemini API key is valid
- Check API quota and usage limits
- Ensure proper environment variable configuration

## 📝 Environment Variables

Create a `.env` file or set system environment variables:

```bash
# For Backend
export GEMINI_API_KEY="your-api-key-here"
export GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
```

## 🔒 Security Notes

- The extension requires permission to access `mail.google.com` to inject the AI Reply button
- The extension communicates with `localhost:8080` - ensure your backend has proper security measures
- API keys should never be committed to version control
- For production use, implement proper authentication and rate limiting

## 🚀 Production Deployment

### Backend
- Configure production database if needed
- Set up environment variables securely
- Use HTTPS for production endpoints
- Implement rate limiting and authentication

### Frontend
- Build for production: `npm run build`
- Deploy to hosting service (Vercel, Netlify, etc.)
- Update API endpoints to production URLs

### Extension
- Update `background.js` to use production API endpoint
- Package extension for Chrome Web Store if publishing
- Follow Chrome Web Store guidelines for submission

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powering the email generation
- Material-UI for the beautiful component library
- Spring Boot community for excellent documentation
- Chrome Extension API for seamless browser integration

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Made with ❤️ using React, Spring Boot, Google Gemini AI, and Chrome Extensions**