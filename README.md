/src
  /components
    /auth
      - LoginForm.jsx
      - SignupForm.jsx
    /notes
      - NoteCard.jsx
      - NoteEditor.jsx
      - NotesList.jsx
    /profile
      - PublicProfile.jsx
      - MyProfile.jsx
    /common
      - Navbar.jsx
      - ProtectedRoute.jsx
      - Loader.jsx
  /pages
    - LoginPage.jsx
    - SignupPage.jsx
    - DashboardPage.jsx
    - PublicProfilePage.jsx
    - SearchResultsPage.jsx
  /services
    - api.js            # Axios instance withCookies
    - authService.js    # login, signup
    - notesService.js   # CRUD notes
    - profileService.js # Profile APIs
    - searchService.js  # Search APIs
  /context
    - AuthContext.jsx
  /hooks
    - useAuth.js
    - useNotes.js
  /utils
    - helpers.js        # small utils if needed
  App.jsx
  main.jsx
  index.css
