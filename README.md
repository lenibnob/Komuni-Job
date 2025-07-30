# Komuni-Job

### Backend DEVS

<pre>
Before doing anything in Django, always use the virtual environment to be able
to run manage.py commands. To use a virtual environment, just simply type "python -m venv [filename]".
[filename] can be named with anything that you want. 
</pre>
<br>
To run virtual environment on cmd, just type "[filename]\Scripts\activate.bat". <br>
Or you can use the env.bat. 

Install required dependencies with "pip install -r requirements.txt" <br>

Usage env.bat:
* env [venv folder name]

#### Important note:
Add this to your settings.json in your vscode "python.terminal.activateEnvironment": false, . <br>
This stops the .bat file on running automatically on your new terminal.


manage.py commands:
* manage runserver //start a local server. 
* manage makeMigrations //make changes available for merging. 
* manage migrate //execute migration. 
* manage flush //deletes all data from all tables

### MySQL Shortcut

This shortcut command is to open your MySQL server for testing and viewing records.<br>
This command allows you to open MySQL server and mysql.exe easily. <br><br>

Important note!<br>
your computer must have xampp installed.<br>

#### Installation Guide
1. Copy path of the folder MySQL Shortcut.
2. click windows button. Search "Edit the system environment variable". Hit enter.
3. Click Environment Variables.
4. Click path on the upper table, then click edit.
5. Click new, then paste the MySQL Shortcut path. 
6. Click OK until all windows vanishes.
7. Restart your VSCode.

Keywords:
* database runserver mysql //This command opens MySQL server.
* database runserver apache //This command opens Apache server.
* database open online //This command opens MySQL server online database.
* database open //This command opens MySQL with a user root.
* database open [username] [password] //This command opens MySQL with a user of choice and its password.

---------------------------------------------------------------------------------------------

## For all DEVS 
### Komuni-Job gitupdate Usage

#### Installation Guide
1. Copy path.
2. click windows button. Search "Edit the system environment variable". Hit enter.
3. Click Environment Variables.
4. Click path, then click edit.
5. Click new, then paste the Komuni-Job gitupdate Shortcut path. 
6. Click OK until all windows vanishes.
7. Restart your VSCode.

Keywords: <br>
update <command> <option> <br>
command - ['-a', '-c', '-p'] <br>
option - if -a is chosen, type the name of the file that you wanted to add changes into. <br>
       - if -c is chosen, type the message for the commit. <br>
       - if -p is chosen, you don't need to type anything after it. this pushes your updates to the remote branch <br>
       - if -f is chosen, you don't need to type anything after it. this fetches updates from the remote branch <br>
       - if -m is chosen, you don't need to type anything after it. this merges your local repository with the updates from the remote branch <br>
usage: <br>
update -a <filename> / . (to add all changes) <br>
update -a <filename> / . (to add all changes) <br>
update -c <comment/message> <br>
update -p <br>
update -f <br>
update -m <br>
proper usage: <br>
update -f -m <br>
update -a <filename/.> -c <comment/message> -p <br><br>

Important note: <br>
Make sure to fetch and merge before you work on a ny file. <br>
Push everytime you finish a file <br>

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
