# TradeMate 🛠️

> **Find Trusted Local Professionals in Minutes.**

TradeMate is a local services marketplace web platform that connects users with verified local service providers — including tutors, cleaners, carpenters, electricians, and more. Users can search, book, and review professionals, while providers can manage their services, availability, and bookings all in one place.

---

## 📸 Preview

> _Landing page, User Dashboard, Provider Dashboard, and more — see `/screenshots` folder._

---

## 🚀 Features

### 👤 User Features
- Register and login as a **User** or **Service Provider**
- Search and filter service providers by category and location
- View detailed provider profiles with ratings and reviews
- Book services with date, time, and location selection
- Track bookings by status: Pending, Accepted, Completed, Cancelled
- Rate and review completed services
- User dashboard with recent bookings and recommended providers

### 🛠️ Provider Features
- Multi-step profile setup with progress indicator
- Upload identity and professional verification documents
- Add, edit, enable, or disable services
- Manage booking requests — Accept or Reject with reasons
- Earnings overview with transaction history
- Availability calendar management
- Provider dashboard with booking stats and earnings chart

### 🌐 General
- Fully responsive design (Mobile, Tablet, Desktop)
- Role-based access control (User vs Provider)
- Booking status workflow (Pending → Accepted → Completed)
- Search with category and location filters
- Trust badges, verified provider indicators
- Clean dark-themed UI with gradient accents

---

## 🧱 Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Markup       | HTML5                             |
| Styling      | CSS3 (Custom Properties, Flexbox, Grid) |
| Logic        | Vanilla JavaScript (ES6+)         |
| Icons        | Font Awesome / Heroicons          |
| Fonts        | Times New Roman, Arial, DM Sans   |
| Storage      | localStorage / sessionStorage     |
| Maps (opt.)  | Google Maps API (location input)  |

---

## 🎨 Brand & Design

### Color Palette

| Token        | Hex       | Usage                         |
|--------------|-----------|-------------------------------|
| `--accent`   | `#667eea` | Primary buttons, links        |
| `--accent-2` | `#764ba2` | Gradient, secondary elements  |
| `--dark`     | `#0D1117` | Page background               |
| `--dark-2`   | `#161B24` | Card backgrounds              |
| `--dark-3`   | `#1E2535` | Component backgrounds         |
| `--muted`    | `#8B95A8` | Secondary text, captions      |
| `--warning`  | `#F59E0B` | Pending states, alerts        |
| `--error`    | `#EF4444` | Errors, rejected states       |
| `--success`  | `#10B981` | Accepted, completed states    |

### Typography
- **Primary:** Times New Roman *(headings)*
- **Secondary:** Arial *(UI labels, body)*
- **Tertiary:** DM Sans *(captions, supporting text)*

---

## 📁 Project Structure

```
trademate/
│
├── index.html                  # Landing Page
│
├── pages/
│   ├── login.html              # Login Page
│   ├── register.html           # Register Page
│   │
│   ├── user/
│   │   ├── dashboard.html      # User Dashboard
│   │   ├── search.html         # Search Services Page
│   │   ├── bookings.html       # My Bookings Page
│   │   └── review.html         # Rate & Review Page
│   │
│   └── provider/
│       ├── dashboard.html      # Provider Dashboard
│       ├── profile-setup.html  # Provider Profile Setup
│       ├── verify.html         # Upload Verification Page
│       ├── services.html       # Manage Services Page
│       └── requests.html       # Booking Requests Page
│
├── provider/
│   └── [id].html               # Public Provider Profile Page
│
├── book/
│   └── [id].html               # Book Service Page
│
├── css/
│   ├── main.css                # Global styles, variables, reset
│   ├── components.css          # Buttons, cards, inputs, badges
│   ├── layout.css              # Grid, sidebar, navbar, footer
│   │
│   ├── pages/
│   │   ├── landing.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── search.css
│   │   ├── profile.css
│   │   ├── booking.css
│   │   └── review.css
│   │
│   └── responsive.css          # Media queries (mobile-first)
│
├── js/
│   ├── main.js                 # Global utilities, helpers
│   ├── auth.js                 # Login, Register, Role logic
│   ├── router.js               # Client-side routing (optional)
│   │
│   ├── user/
│   │   ├── dashboard.js
│   │   ├── search.js
│   │   ├── bookings.js
│   │   └── review.js
│   │
│   └── provider/
│       ├── dashboard.js
│       ├── profile-setup.js
│       ├── verify.js
│       ├── services.js
│       └── requests.js
│
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   └── hero-bg.jpg
│   └── icons/
│
└── README.md
```

---

## 🖥️ Pages Overview

| Page                    | Route                        | Access       |
|-------------------------|------------------------------|--------------|
| Landing Page            | `/index.html`                | Public       |
| Login                   | `/pages/login.html`          | Public       |
| Register                | `/pages/register.html`       | Public       |
| User Dashboard          | `/pages/user/dashboard.html` | User only    |
| Search Services         | `/pages/user/search.html`    | Public       |
| Provider Profile        | `/provider/[id].html`        | Public       |
| Book Service            | `/book/[id].html`            | User only    |
| My Bookings             | `/pages/user/bookings.html`  | User only    |
| Rate & Review           | `/pages/user/review.html`    | User only    |
| Provider Dashboard      | `/pages/provider/dashboard.html` | Provider only |
| Provider Profile Setup  | `/pages/provider/profile-setup.html` | Provider only |
| Upload Verification     | `/pages/provider/verify.html` | Provider only |
| Manage Services         | `/pages/provider/services.html` | Provider only |
| Booking Requests        | `/pages/provider/requests.html` | Provider only |

---

## ⚙️ Getting Started

### Prerequisites

No build tools required. Just a modern web browser and optionally a local server.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trademate.git
cd trademate
```

### 2. Open in Browser

**Option A — Direct open:**
```bash
# Simply open index.html in your browser
open index.html
```

**Option B — Local server (recommended):**
```bash
# Using VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# OR using Python
python -m http.server 3000

# OR using Node.js http-server
npx http-server . -p 3000
```

Then visit: **`http://localhost:3000`**

---

## 🔐 Authentication Flow

TradeMate uses **localStorage** to manage sessions on the frontend.

```
Register
  └──> Choose role: User | Provider
  └──> Fill form & submit
  └──> Store user object in localStorage
  └──> Redirect:
         User     → /pages/user/dashboard.html
         Provider → /pages/provider/profile-setup.html

Login
  └──> Enter email + password + role
  └──> Validate against stored users
  └──> Set session in localStorage
  └──> Redirect based on role
```

### Session Object (localStorage)
```json
{
  "id": "usr_001",
  "name": "John Mensah",
  "email": "john@email.com",
  "role": "user",
  "isVerified": true,
  "profileCompleted": true
}
```

---

## 📦 Booking Status Workflow

```
Pending
  ├──> Accepted  ──> In Progress ──> Completed
  ├──> Rejected
  └──> Cancelled
```

| Status      | Color     | User Action           | Provider Action     |
|-------------|-----------|----------------------|---------------------|
| Pending     | 🟡 Yellow | Cancel booking       | Accept / Reject     |
| Accepted    | 🟢 Green  | View / Contact       | Mark as completed   |
| In Progress | 🔵 Blue   | Track                | Update status       |
| Completed   | 🟣 Purple | Leave Review / Rebook| —                   |
| Rejected    | 🔴 Red    | Rebook               | —                   |
| Cancelled   | ⚫ Grey   | Rebook               | —                   |

---

## 📱 Responsive Breakpoints

| Breakpoint | Width       | Layout                          |
|------------|-------------|----------------------------------|
| Mobile     | `< 480px`   | Single column, stacked nav       |
| Tablet     | `768px`     | 2-column grid, collapsible menu  |
| Desktop    | `1024px`    | Sidebar + multi-column grid      |
| Wide       | `≥ 1280px`  | Full layout, 4-column grids      |

---

## 🗺️ UX Flows

### User Journey
```
Register/Login → Search Services → View Provider Profile
   → Book Service → Booking Confirmed → Service Completed
      → Rate & Review Provider
```

### Provider Journey
```
Register → Complete Profile Setup → Upload Verification
   → Admin Approves → Add Services → Receive Booking Requests
      → Accept/Reject → Complete Job → Get Paid
```

---

## ✅ Business Rules

- Users can only see **their own** bookings
- Only **completed** bookings can receive a review
- One review per booking — cannot review twice
- Provider **cannot accept** a booking if slot is already taken
- Providers must complete **profile setup** before accessing dashboard
- Services in **Draft** mode do not appear in search results
- **Disabled** services are hidden but remain in the database
- Providers **cannot delete** a service with active bookings

---

## 🔒 Security Considerations

> Since this is a frontend-only project, the following are simulated but should be implemented server-side in production:

- Role-based page access (redirect if wrong role)
- Booking ownership validation before display
- Input sanitization to prevent XSS
- File type validation on document uploads
- Rate limiting on form submissions
- Password hashing before storage *(use bcrypt in backend)*

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and naming conventions.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**TradeMate Design & Development Team**  
Built with ❤️ for connecting local professionals with their communities.

---

## 📬 Contact

| Channel  | Details                        |
|----------|--------------------------------|
| Email    | support@trademate.com          |
| Website  | [www.trademate.com](#)         |
| Twitter  | [@trademate](#)                |

---

> _TradeMate — Connecting communities, one service at a time._
