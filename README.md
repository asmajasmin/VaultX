# VaultX - Secure Digital Document Vault

![VaultX Banner](https://via.placeholder.com/1200x400/123458/F1EFEC?text=VaultX+Secure+Storage)

**VaultX** is a modern, secure, and user-friendly Digital Document Vault application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It provides a sleek interface for users to securely upload, manage, and organize their sensitive files with military-grade encryption standards in mind.

---

## 🚀 Key Features

### 🔒 Security & Authentication
* **Secure User Auth:** JWT-based authentication with bcrypt password hashing.
* **Role-Based Access:** Basic User vs. Admin/Pro roles.
* **Activity Audit Trail:** A comprehensive, immutable log of every action (Login, Upload, Delete, Folder Creation) for security auditing.
* **Change Password:** Secure in-app password reset functionality.

### 📂 File Management
* **Cloud Storage:** Integration with Cloudinary for secure file hosting.
* **Folder System:** Create, nest, and organize files into a directory structure.
* **Drag & Drop:** Intuitive drag-and-drop file upload interface.
* **Global Search:** Instant search across all encrypted files and folders.
* **File Actions:** Move, Delete (with confirmation), and Preview files.

### 👤 User Experience
* **Dynamic Profile:** Real-time dashboard showing storage usage, file count, and subscription tier.
* **Tier System:** Visual indicators for Free vs. Pro/Personal plans.
* **Responsive Design:** Fully responsive UI built with Tailwind CSS, featuring a "Dark Navy & Beige" professional theme.
* **Toast Notifications:** Real-time feedback for all user actions.

---

## 🛠️ Tech Stack

### Frontend
* **React.js (Vite):** Blazing fast UI development.
* **Tailwind CSS:** Utility-first styling for a custom, modern look.
* **Lucide React:** Beautiful, consistent iconography.
* **React Router:** Seamless client-side navigation.

### Backend
* **Node.js & Express:** Robust REST API architecture.
* **MongoDB (Mongoose):** Flexible NoSQL database for metadata and logs.
* **Cloudinary:** Enterprise-grade media management service.
* **Multer:** Middleware for handling `multipart/form-data`.

---

## 📸 Screenshots

| **Dashboard** | **Profile & Settings** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/600x300/123458/ffffff?text=File+Browser+View) | ![Profile](https://via.placeholder.com/600x300/123458/ffffff?text=User+Profile+Page) |

| **Audit Trail** | **Secure Search** |
|:---:|:---:|
| ![Audit Log](https://via.placeholder.com/600x300/123458/ffffff?text=Activity+Log+Timeline) | ![Search](https://via.placeholder.com/600x300/123458/ffffff?text=Global+Search) |

---

## ⚙️ Installation & Setup

Follow these steps to run VaultX locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/vaultx.git](https://github.com/your-username/vaultx.git)
cd vaultx


