### APP DESCRIPTION

 A web-based contact book where users can add, view, and delete contacts. The UI is responsive (works on mobile and desktop). Contacts are stored in a database and fetched paginated.

### STACK USED:

#### 1. BACKEND:
1. Node.js / Express.js
2. REST APIs
3. Cors

#### 2. FRONTEND
1. React.js / Vite
2. TailwindCSS
3. MaterialUI
4. React-Icons
5. Axios

#### 3. DATABASE
1. SQLITE DB

### KEY FEATURES:
- Form for adding contacts with validation.
- List to display contacts.
- Delete functionality.
- Pagination for fetching contacts.

To Execute a **Development Environment**, Type the Following Commands:

1. For Backend/API

    ```console

    C:\>git clone https://github.com/SeveredSeikyo/contact-book-app
    C:\>cd contact-book-app
    C:\contact-book-app\>cd backend
    C:\contact-book-app\backend\>copy C:\contact-book-app\backend\.env.example .env
    C:\contact-book-app\backend\>npm install
    C:\contact-book-app\backend\>npm start

    ```

2. For Frontend/UI

    ```console

    C:\>git clone https://github.com/SeveredSeikyo/contact-book-app
    C:\>cd contact-book-app
    C:\contact-book-app\>cd frontend
    C:\contact-book-app\frontend\>copy C:\contact-book-app\frontend\.env.example .env
    C:\contact-book-app\frontend\>npm install
    C:\contact-book-app\frontend\>npm run dev

    ```

**NOTE:** **.env.example** is a pre-written environment file created to assign environmental variables to actual project. **.env** contains environmental vairables that needed to connect Frontend and Backend.


To Test the APIs directly, Change Directory to Backend **cd backend** and open **test.http** in VSCode or Any other code editor.

```console

C:\>git clone https://github.com/SeveredSeikyo/contact-book-app
C:\>cd contact-book-app
C:\contact-book-app\>cd backend
C:\contact-book-app\backend\>npm install
C:\contact-book-app\backend\>npm start

```

**test.http** is a pre-written file with sample data and API points written for fast testing.