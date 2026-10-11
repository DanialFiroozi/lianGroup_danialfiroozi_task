# User Management Dashboard

A responsive user management dashboard built with React, TypeScript, Vite, and Tailwind CSS. The application allows users to view, search, sort, add, delete, and inspect user details, with support for API data and local storage.

## ✨ Features

- **User Management:** View, add, and delete users.
- **API Integration:** Fetch user data from an external API.
- **Local Storage:** Store locally added users and manage local data.
- **User Details:** View detailed information for each user.
- **Search:** Search users by relevant fields such as name, username, and email.
- **Sorting:** Sort users by supported table columns.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- **Light & Dark Mode:** Switch between light and dark themes.
- **Form Validation:** Validate user input using React Hook Form.
- **Loading & Notifications:** Display loading indicators and toast notifications.
- **Client-side Routing:** Navigate between application pages without full page reloads.

## 🛠️ Tech Stack

- **React 19** — Building the user interface.
- **TypeScript** — Static typing and improved code reliability.
- **Vite** — Development server and build tooling.
- **React Router** — Client-side routing.
- **TanStack React Query** — Server-state management and API requests.
- **TanStack React Table** — Table configuration and data presentation.
- **Axios** — HTTP requests.
- **Tailwind CSS 4** — Styling and responsive layouts.
- **React Hook Form** — Form handling and validation.
- **Lucide React** — Icons.
- **React Hot Toast** — User notifications.
- **React Spinners** — Loading indicators.

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (a version compatible with the installed Vite version)
- npm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd danialfiroozi_task
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

If the application uses an external API, create a `.env` file in the project root and configure the API base URL:

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Replace the URL with the API endpoint used by your project.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 📦 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Runs TypeScript checks and creates a production build. |
| `npm run lint` | Runs ESLint to check code quality. |
| `npm run preview` | Previews the production build locally. |

## 👥 User Management

### Display Users

Fetch and display users from the configured API in a structured table.

### Add Users

Allow users to add new records through a form with input validation. Newly created users can be stored locally and/or submitted to the API, depending on the configured data flow.

### Delete Users

Remove users from the interface and update the relevant data source.

### User Details

Display detailed information about a selected user, including available contact information, address, and company details.

### Search and Sorting

Search the user list and sort supported columns to make user information easier to navigate.

## 💾 Data Persistence

The application supports API-based data retrieval and local storage for locally managed users.

- **API data:** Used to retrieve and display remote user records.
- **Local storage:** Used to persist locally managed data across browser refreshes.
- **Data synchronization:** The application should distinguish between remote and local records to prevent duplicate entries and unexpected overwrites.

**Note:** If JSONPlaceholder is used as the API, its POST and DELETE endpoints simulate successful operations but do not permanently modify the server's database. Locally persisted changes should therefore be handled separately.

## 📱 Responsive Design

The interface adapts to different screen sizes, providing a usable experience across desktop computers, tablets, and mobile devices.

## 🎨 Theme Support

The application supports light and dark themes to improve usability in different lighting conditions.

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

The generated files will be available in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## 📄 License

This project was developed as a user management dashboard task.

