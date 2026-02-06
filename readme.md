<div align="center">

# BookWorm - Personalized Book Recommendation & Reading Tracker

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Overview

BookWorm is an intelligent book recommendation and personal reading tracker application designed to help users discover new books, track their reading progress, write reviews, and receive personalized suggestions based on their reading habits. With a cozy library-inspired design, BookWorm transforms the overwhelming task of finding your next great read into an engaging and personalized experience.

**Key Capabilities:**
- Personalized book recommendations powered by reading history analysis
- Multi-shelf reading tracker (Want to Read, Currently Reading, Read)
- Comprehensive book discovery with advanced search and filtering
- Community-driven review system with moderation
- Reading challenge and goal tracking with visual statistics
- Role-based access control (Admin & User)
- Embedded YouTube tutorials for book reviews and recommendations

---

## Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with SSR/SSG | ^15.x |
| **React** | UI library | ^18.x |
| **Tailwind CSS** | Utility-first styling | ^3.x |
| **Chart.js / Recharts** | Data visualization | Latest |
| **React Hook Form** | Form management | ^7.x |
| **Axios** | HTTP client | ^1.x |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime | ^20.x |
| **Express.js** | Web framework | ^4.x |
| **MongoDB** | NoSQL database | Latest |
| **Mongoose** | MongoDB ODM | ^8.x |
| **JWT** | Authentication | ^9.x |
| **bcrypt** | Password hashing | ^5.x |
| **Cloudinary** | Image hosting | ^2.x |

---

## Features

### User Role Features

**Personal Library Management**
- **Three Reading Shelves**: Want to Read, Currently Reading, Read
- **Progress Tracking**: Track pages read with percentage completion
- **Shelf Organization**: Move books between shelves with one click
- **Reading Statistics**: Books read this year, total pages, average ratings

**Book Discovery**
- **Advanced Search**: Search by title, author, or keywords
- **Multi-Select Filters**: Filter by genres (multiple selections)
- **Rating Filter**: Filter by rating range (1-5 stars)
- **Smart Sorting**: Sort by rating, most shelved, or newest
- **Pagination/Infinite Scroll**: Smooth browsing experience

**Personalized Recommendations**
- **AI-Powered Suggestions**: Based on reading history and preferences
- **Multi-Factor Algorithm**: 
  - Most common genres from "Read" shelf
  - Average user ratings given to books
  - Books with highest community-approved reviews in similar genres
- **Fallback System**: Popular books for new users (<3 books read)
- **"Why This Book?" Tooltips**: Explanation for each recommendation
- **Carousel Display**: 12-18 recommended books on dashboard

**Reviews & Ratings**
- **5-Star Rating System**: Rate books on a scale of 1-5
- **Written Reviews**: Share detailed thoughts and opinions
- **Review Status**: Pending until admin approval
- **Community Reviews**: Read approved reviews from other readers

**Reading Challenge & Goals**
- **Annual Reading Goals**: Set yearly book targets (e.g., "Read 50 books in 2026")
- **Visual Progress Tracking**: Circular progress bars and statistics
- **Comprehensive Stats**:
  - Books read this year
  - Total pages read
  - Average rating given
  - Favorite genre breakdown
  - Reading streak (days with progress logged)
- **Interactive Charts**: Pie chart for genres, bar chart for monthly reads, line chart for pages over time

**Tutorial Library**
- **Embedded YouTube Videos**: 10-12 curated book-related content
- **Topics**: Book recommendations, reviews, reading tips
- **Protected Access**: Available to authenticated users

### Admin Role Features

**Dashboard Overview**
- Total books in library
- Total registered users
- Pending reviews count
- Recent activity feed

**Book Management**
- **Create Books**: Title, Author, Genre, Description, Cover Image Upload
- **View All Books**: Table/list with thumbnails and quick actions
- **Edit Books**: Update all book information
- **Delete Books**: With confirmation modal for safety

**Genre Management**
- Create new book genres/categories
- Edit existing genres
- View genre usage statistics
- Link books to specific genres

**User Management**
- View all registered users
- Assign roles (promote to Admin or demote to User)
- Monitor user activity
- Manage user permissions

**Review Moderation**
- View all pending reviews
- Approve reviews to make them publicly visible
- Delete inappropriate or spam reviews
- Monitor review quality

**Tutorial Management**
- Add YouTube video links
- Embed and organize tutorials
- Edit or remove existing tutorials
- Curate educational content

### Social Features (Bonus)

**Follow System**
- Follow other readers
- Track reading activity of followed users

**Activity Feed**
- "User X added Book Y to Read shelf"
- "User Z rated Book W 5 stars"
- "User A finished reading Book B"
- Real-time updates on dashboard

---

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (unique, required),
  photoURL: String,
  password: String (hashed, required),
  role: ['user', 'admin'] (default: 'user'),
  readingGoal: {
    target: Number,
    year: Number,
    progress: Number
  },
  followedUsers: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Book Model
```javascript
{
  title: String (required),
  author: String (required),
  genre: ObjectId (ref: 'Genre', required),
  description: String,
  coverImage: String (URL),
  totalPages: Number,
  averageRating: Number (calculated),
  shelfCount: {
    wantToRead: Number,
    currentlyReading: Number,
    read: Number
  },
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### Genre Model
```javascript
{
  name: String (unique, required),
  description: String,
  bookCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### UserBook Model (Reading Shelf)
```javascript
{
  user: ObjectId (ref: 'User', required),
  book: ObjectId (ref: 'Book', required),
  shelf: ['wantToRead', 'currentlyReading', 'read'] (required),
  progress: {
    pagesRead: Number,
    percentage: Number
  },
  startedAt: Date,
  finishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  book: ObjectId (ref: 'Book', required),
  rating: Number (1-5, required),
  reviewText: String,
  status: ['pending', 'approved', 'rejected'] (default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Tutorial Model
```javascript
{
  title: String (required),
  youtubeURL: String (required),
  embedCode: String,
  description: String,
  addedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
GET    /api/auth/me                # Get current user
PUT    /api/auth/profile           # Update profile
POST   /api/auth/logout            # Logout user
```

### Books (User)
```
GET    /api/books                  # Get all books (search, filter, sort, paginate)
GET    /api/books/:id              # Get single book details
GET    /api/books/recommendations  # Get personalized recommendations
```

### Books (Admin)
```
POST   /api/books                  # Create new book
PUT    /api/books/:id              # Update book
DELETE /api/books/:id              # Delete book
```

### Genres
```
GET    /api/genres                 # Get all genres
POST   /api/genres                 # Create genre (admin)
PUT    /api/genres/:id             # Update genre (admin)
DELETE /api/genres/:id             # Delete genre (admin)
```

### User Library
```
GET    /api/library                # Get user's shelves
POST   /api/library                # Add book to shelf
PUT    /api/library/:id            # Update shelf/progress
DELETE /api/library/:id            # Remove from shelf
GET    /api/library/stats          # Get reading statistics
```

### Reviews
```
GET    /api/reviews/:bookId        # Get approved reviews for book
POST   /api/reviews                # Submit review
GET    /api/reviews/pending        # Get pending reviews (admin)
PUT    /api/reviews/:id/approve    # Approve review (admin)
DELETE /api/reviews/:id            # Delete review (admin/owner)
```

### Users (Admin)
```
GET    /api/users                  # Get all users
PUT    /api/users/:id/role         # Update user role
```

### Tutorials
```
GET    /api/tutorials              # Get all tutorials
POST   /api/tutorials              # Add tutorial (admin)
PUT    /api/tutorials/:id          # Update tutorial (admin)
DELETE /api/tutorials/:id          # Delete tutorial (admin)
```

### Dashboard
```
GET    /api/dashboard/admin        # Admin dashboard stats
GET    /api/dashboard/user         # User dashboard stats
```

---

## Recommendation Algorithm

### Multi-Factor Analysis

**1. Genre Preference Analysis**
```javascript
// Calculate most common genres from "Read" shelf
const genrePreferences = userReadBooks
  .map(book => book.genre)
  .reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
```

**2. Rating Pattern Analysis**
```javascript
// Average user ratings to understand preferences
const averageRating = userReviews
  .reduce((sum, review) => sum + review.rating, 0) / userReviews.length;
```

**3. Community Validation**
```javascript
// Books with highest approved reviews in similar genres
const communityFavorites = await Book.find({
  genre: { $in: preferredGenres },
  averageRating: { $gte: averageRating }
})
.sort({ approvedReviewCount: -1 })
.limit(12);
```

**4. Fallback for New Users**
```javascript
if (userReadBooks.length < 3) {
  // Show mix of popular books + random selections
  const popularBooks = await Book.find()
    .sort({ averageRating: -1, shelfCount: -1 })
    .limit(10);
  
  const randomBooks = await Book.aggregate([
    { $sample: { size: 8 } }
  ]);
  
  recommendations = [...popularBooks, ...randomBooks];
}
```

---

## Authentication & Route Protection

### Route Guards

**Protected Routes**
- All routes require authentication
- Unauthenticated users redirected to `/login`
- No public homepage

**Role-Based Redirection**
```javascript
// Default route behavior
if (user.role === 'admin') {
  redirect('/admin/dashboard');
} else {
  redirect('/library');
}
```

**Admin-Only Routes**
- `/admin/dashboard`
- `/admin/books`
- `/admin/genres`
- `/admin/users`
- `/admin/reviews`
- `/admin/tutorials`

**User Routes**
- `/library` (My Library)
- `/books` (Browse Books)
- `/books/:id` (Book Details)
- `/tutorials`
- `/profile`

---

## Architecture

### Project Structure

```
bookworm/
│
├── client/                        # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # App Router
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (user)/
│   │   │   │   ├── library/     # My Library page
│   │   │   │   ├── books/       # Browse books
│   │   │   │   ├── tutorials/
│   │   │   │   └── profile/
│   │   │   ├── (admin)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── books/
│   │   │   │   ├── genres/
│   │   │   │   ├── users/
│   │   │   │   ├── reviews/
│   │   │   │   └── tutorials/
│   │   │   └── layout.js
│   │   ├── components/
│   │   │   ├── books/
│   │   │   ├── library/
│   │   │   ├── reviews/
│   │   │   ├── charts/
│   │   │   ├── admin/
│   │   │   └── shared/
│   │   ├── lib/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── server/                       # Express.js Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── bookController.js
│   │   │   ├── genreController.js
│   │   │   ├── libraryController.js
│   │   │   ├── reviewController.js
│   │   │   ├── userController.js
│   │   │   └── tutorialController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Book.js
│   │   │   ├── Genre.js
│   │   │   ├── UserBook.js
│   │   │   ├── Review.js
│   │   │   └── Tutorial.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── admin.js
│   │   │   └── validator.js
│   │   ├── utils/
│   │   │   ├── recommendation.js
│   │   │   ├── cloudinary.js
│   │   │   └── imageUpload.js
│   │   └── config/
│   └── package.json
│
└── README.md
```

---

## Key Workflows

### Book Discovery Flow
```
1. User lands on Browse Books page
2. Applies filters (genre, rating) and search
3. Results displayed with pagination
4. Click book to view details
5. Read reviews and ratings
6. Add to desired shelf
7. Optionally write review
```

### Reading Progress Flow
```
1. User adds book to "Currently Reading"
2. Opens My Library page
3. Updates progress (pages read)
4. System calculates percentage
5. Move to "Read" when finished
6. System prompts for review/rating
7. Stats automatically updated
```

### Recommendation Generation Flow
```
1. User accesses dashboard
2. System analyzes reading history
3. Identifies favorite genres
4. Calculates average rating preference
5. Finds similar highly-rated books
6. Filters out already shelved books
7. Displays 12-18 recommendations
8. Shows "Why this book?" explanation
```

### Review Moderation Flow
```
1. User submits review on book page
2. Review saved with "pending" status
3. Admin views in moderation panel
4. Admin approves or deletes review
5. Approved reviews appear on book page
6. Book's average rating recalculated
```

---

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)
```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookworm

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=production

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_URL=http://localhost:3000
```

---

## Design Philosophy

### Cozy Library Aesthetic

**Visual Theme:**
- Warm, inviting color palette (browns, creams, soft oranges)
- Book-themed illustrations and icons
- Comfortable typography (serif for headings, sans-serif for body)
- Subtle textures (paper, wood grain)
- Generous white space for readability

**User Experience:**
- Intuitive navigation
- Clear visual hierarchy
- Smooth transitions and animations
- Loading skeletons for better perceived performance
- Helpful error messages
- Responsive on all devices (mobile, tablet, desktop)

---

## Performance Optimizations

### Next.js Features
- **Server-Side Rendering**: Dynamic book pages for SEO
- **Static Site Generation**: Pre-render popular book pages
- **Image Optimization**: Next/Image for automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Incremental Static Regeneration**: Update static pages without rebuild

### Database Optimization
- Indexed fields: email, genre, rating, shelf counts
- Aggregation pipelines for recommendations
- Efficient population strategies
- Pagination for large datasets

### Frontend Performance
- Lazy loading for book covers
- Debounced search input
- Memoized expensive calculations
- Virtual scrolling for long lists

---

## Security Implementation

- **Password Security**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token generation and validation
- **Role-Based Access**: Middleware for admin routes
- **Input Validation**: Server-side validation with express-validator
- **Image Upload**: Cloudinary secure upload with file type validation
- **XSS Protection**: Sanitized user input
- **CORS Configuration**: Restricted origins
- **MongoDB Injection Prevention**: Mongoose sanitization

---

## Testing Checklist

- [ ] User registration with photo upload
- [ ] User login and JWT token persistence
- [ ] Role-based route protection
- [ ] Admin can create/edit/delete books
- [ ] Admin can manage genres
- [ ] Admin can moderate reviews
- [ ] User can add books to shelves
- [ ] User can track reading progress
- [ ] User can submit reviews
- [ ] Personalized recommendations display correctly
- [ ] Search and filters work properly
- [ ] Pagination/infinite scroll functions
- [ ] Reading challenge tracking updates
- [ ] Charts display correctly
- [ ] YouTube tutorials embed properly
- [ ] Responsive design on all devices
- [ ] No console errors on production
- [ ] Authentication works on deployment

---

## Development Requirements Met

✅ **GitHub Management**: 12+ meaningful commits on both repos  
✅ **Responsive Design**: Mobile, tablet, and desktop optimized  
✅ **Unique Design**: Cozy library-themed aesthetic  
✅ **Live Deployment**: Hosted on Vercel  
✅ **Error Handling**: Graceful error messages and edge cases  
✅ **Clean Code**: Modular, organized, following best practices  
✅ **Loading States**: Spinners and skeletons for better UX  

---

<div align="center">

Built with by **Zahidul Islam**

</div>
