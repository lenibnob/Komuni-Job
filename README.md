# Komuni-Job

!!!Backend DEVS!!! <br>
Before doing anything in Django, always use the my_workshop virtual environment to be able
to run manage.py commands. <br>

To run my_workshop virtual environment on cmd. type "my_workshop\Scripts\activate.bat".

manage.py commands:<br>
manage runserver //start a local server. <br>
manage makeMigrations //make changes available for merging. <br>
manage migrate //execute migration. <br><br>

---------------------------------------------------------------------------------------------

!!!For all DEVS!!! <br>
!!!Komuni-Job gitupdate Usage!!! 

1. Copy path.
2. click windows button. Search "Edit the system environment variable". Hit enter.
3. Click Environment Variables.
4. Click path, then click edit.
5. Click new, then paste the Komuni-Job gitupdate Shortcut path. 
6. Click OK until all windows vanishes.

Keywords: <br>
update pull //pull from repository <br>
update push //update repository <br>

Important note: <br>
Always do "update pull" before editing any file. <br><br>

Use integrated terminal for using commands.<br><br>

-----------------------------------------------------------------------------------------------------------------<br><br>

To make your flow: <br>

*Homepage → Sign Up → User Dashboard → (exit website) → open again → auto-redirect to User Dashboard*,<br>
you need to *persist the user login session*, so when they come back, they don't have to log in again.<br><br>

Here's how to *implement this logic*:<br><br>

---

## ✅ 1. *Use Persistent Login (Session or Token-based Auth)*

### 🛠 If you use JWT (JSON Web Tokens):

* When the user logs in or signs up:

  * Generate a *JWT token*
  * Store it in **localStorage** or **cookies** (preferably *HttpOnly secure cookie* for security)
* On future visits:

  * Check if a valid token exists
  * If yes → auto-redirect to User Dashboard
  * If not → stay on Homepage / login page

### 🔐 Best practice:

* *Store token in cookies (HttpOnly + Secure)* to prevent XSS.
* On the server side, verify the token for each protected route.

---

## ✅ 2. *Routing Logic*

In your frontend (React, Vue, etc.): <br>

// Example in React-like pseudocode <br>
<pre>
useEffect(() => { 
  const token = localStorage.getItem('token'); 
  if (token) { 
    navigate('/dashboard');
  } 
}, []); 
</pre>
Or if using Next.js / Vue / SvelteKit / etc., use middleware or route guards. <br><br>

---

## ✅ 3. *Logout Flow*

Ensure that logout: 

* Removes token from localStorage/cookie
* Redirects user to homepage or login page
<pre>
function logout() { 
  localStorage.removeItem('token'); 
  navigate('/'); 
} 
</pre>
--- <br><br>

## 🧪 Bonus UX Tip:

Show a brief *"Welcome back" loader/screen* if you’re verifying the token in the background before redirecting. <br><br>

--- <br><br>

Would you like code snippets in a specific framework (React, Vue, PHP, etc.)?