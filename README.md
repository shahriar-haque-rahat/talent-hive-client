# Talent Hive

Talent Hive is a full-stack professional networking platform designed to connect users, share posts, manage job applications, and foster professional relationships. Built with scalability and real-time functionality in mind, Talent Hive allows users to interact, apply for jobs, connect with companies, and communicate seamlessly. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure and Servers](#project-structure-and-servers)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Features

### Authentication & Security
- **Custom Email Verification**: New users receive an email verification link to activate their accounts.
- **Password Recovery**: Users can securely reset forgotten passwords through email verification.
- **JWT Token Management**: Secure access and refresh tokens with a 1-hour session timeout, ensuring user security and automatic session extension during activity.

### Newsfeed
- **Dynamic Newsfeed**: Displays a mix of posts from connections and suggested users with a three-column layout (user info, posts, and suggestions).
- **Engagement Options**: Users can post, like, comment, share, and bookmark posts. Images open in a modal with a slideshow for better content viewing.

### Real-Time Messaging
- **Messaging Platform**: Real-time chat system powered by Socket.IO, with contact lists, unread message counts, and search functionality.
- **Seamless Navigation**: Divided layout with a contact list on the left and active chat on the right.

### Jobs Section
- **Job Listings**: Users can view, apply for, and post job opportunities. Jobs are recommended based on user profile details.
- **Resume Submission**: Users can upload resumes directly to job applications.
- **Company Job Management**: Users affiliated with companies can post job openings and manage applications.

### Company Directory
- **Company Listings**: Shows a list of followed and unfollowed companies, each with detailed company information and job listings.
- **Follow/Unfollow Options**: Users can easily follow or unfollow companies.

### Connections Management
- **Connection Requests**: Users can send, receive, and manage connection requests.
- **Recommended Connections**: Personalized suggestions based on profile similarities.

### Notifications
- **Activity Notifications**: Notifications for likes, comments, shares, connection requests, and more.
- **Unread Counts**: Notification icon displays the number of unread notifications. Users can mark notifications as read, delete them, or mark all as read.

### User Profile Management
- **Profile Editing**: Users can edit personal information, add social media links, upload resumes, and manage saved/bookmarked posts.
- **Content and Media Storage**: Utilizes EdgeStore for secure media and file storage.

### Reporting and Support
- **Report Posts**: Users can report posts, automatically sending details to support via email.
- **Contact Us**: Dedicated contact page for user inquiries, sent directly to the support center.

### Search Functionality
- **Comprehensive Search**: Search features in the connections and companies sections to find users or companies quickly.

### Microservices Architecture
- **Service Separation**: Backend is split into three servers - main server, auth server, and chat server - for optimized performance and modularity.

---

## Technologies Used

- **Frontend**: Next.js, Redux, Tailwind CSS
- **Backend**: Nest.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO
- **Email Service**: Nodemailer
- **File Storage**: EdgeStore
- **Authentication**: JSON Web Tokens (JWT) with access and refresh tokens

---

## Project Structure and Servers

Talent Hive is divided into three main servers:

- **Main Server**: Core backend handling routes, business logic, job posts, connections, and notifications.
  - GitHub: [Talent Hive Main Server](https://github.com/shahriar-haque-rahat/talent-hive-server)
  
- **Auth Server**: Responsible for user authentication, account activation, and JWT token management.
  - GitHub: [Talent Hive Auth Server](https://github.com/shahriar-haque-rahat/talent-hive-auth)
  
- **Chat Server**: Manages real-time messaging with Socket.IO for live updates in the messaging interface.
  - GitHub: [Talent Hive Chat Server](https://github.com/shahriar-haque-rahat/talent-hive-chat)

---

## Usage

1. **Authentication**: Sign up and activate the account via email. Use "Forgot Password" if necessary.
2. **Newsfeed**: Post, like, comment, share, and bookmark posts from connections.
3. **Jobs**: Browse job listings, apply, and post new jobs if affiliated with a company.
4. **Connections**: Send, receive, and manage connections. Find suggested connections and users.
5. **Real-Time Messaging**: Use the messaging section for instant communication.
6. **Profile Management**: Update personal information, upload a resume, and manage saved posts.
7. **Notifications**: View activity alerts and mark notifications as read.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request
