# codeMarks

**Project Name: CODEMARKS**

CODEMARKS is a single-page application for posting and sharing snippets of code in various code languages. Users can authenticate using GitHub via the PassportJS GitHub strategy. After authenticating, the landing page displays code snippets in three possible categories: self-authored (i.e. “my posts”), popular (i.e. “most upvoted”), and most recent.

Users can thumbs-up and comment on the posts, and posts’ authors can “star” individual comments. The application also includes the following features and functionality:

- Automatic syntax highlighting for code using prisim.js
- Comments are updated in pseudo-realtime using socket.io
- Comments on a post can be associated with specific portions of the post’s code snippet

**Project Value:**

CODEMARKS provides a more visually friendly interface for sharing code snippets. Along with being more visually pleasing, it will also allow users to select and comment on a line or section of code.

**Developers on the app**

- Gouri Peddinti
- Josh Cosson
- Stella Kim
- Patrick Schroedl

**Page Structure**

- Landing (unauthenticated Home)
- Home (authed Home)
- New post page (or modal)
- Detail page (viewing a post)
- User page (profile)

**View Project App**

- https://codemarks-app.herokuapp.com/
- https://github.com/stellie82/codeMarks
- Google Slides Presentation: https://docs.google.com/presentation/d/1GtH9pnPA3OQA98P-bx6xdPMplHwMkEMKqMrKc1ipDnQ/edit?usp=sharing
