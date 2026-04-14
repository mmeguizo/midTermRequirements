# STI Pre-Finals Exam — React Native Mobile Development

**Subject:** Mobile Application Development  
**Total Points:** 100 (10 questions × 10 points each)  
**Instructions:** Answer all questions. Write or type your answers clearly.

---

## Question 1 – React State (10 pts)

Look at the code below, taken from `LoginScreen.js`:

```js
const [user, setUser] = useState('');
const [pass, setPass] = useState('');
```

**(a)** What library/hook is `useState` imported from?

**(b)** What is the initial value of `user`?

**(c)** If a user types "juan@sti.edu" in the Email field, what function is called, and what will the new value of `user` be?

---

## Question 2 – Input Validation (10 pts)

The `handleLogin` function in `LoginScreen.js` begins with:

```js
if (!user.trim() || !pass.trim()) {
  Alert.alert('Oops', 'Please fill in all fields');
  return;
}
```

**(a)** What does `.trim()` do to a string?

**(b)** What will happen if the user leaves the password field blank and taps "Sign in"?

**(c)** Why is `return` used inside the `if` block?

---

## Question 3 – Firebase Authentication (10 pts)

Study this snippet from `LoginScreen.js`:

```js
signInWithEmailAndPassword(auth, user, pass)
  .then(({ user: firebaseUser }) => {
    signIn(firebaseUser.email);
    navigation.replace('Home');
  })
  .catch((err) => {
    Alert.alert('Authentication failed', err.message);
  });
```

**(a)** What Firebase service does `signInWithEmailAndPassword` belong to — Authentication or Firestore?

**(b)** What two arguments does it require (aside from `auth`)?

**(c)** What happens if the email/password combination is **wrong** in Firebase?

---

## Question 4 – Firebase Configuration (10 pts)

Look at `firebaseConfig.js`:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

**(a)** What does `initializeApp(firebaseConfig)` do?

**(b)** What is `auth` used for in the app?

**(c)** What is `db` used for, and in which component of this project is it used?

---

## Question 5 – React Context API (10 pts)

From `AuthContext.js`:

```js
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
```

And in `HomeScreen.js`:

```js
const { user } = useContext(AuthContext);
```

**(a)** What is the purpose of `createContext`?

**(b)** What three values does `AuthContext.Provider` share to child components?

**(c)** How does `HomeScreen` access the logged-in user's email?

---

## Question 6 – AsyncStorage & Session Persistence (10 pts)

From `AuthContext.js`:

```js
useEffect(() => {
  AsyncStorage.getItem('userEmail').then((email) => {
    if (email) setUser({ email });
  });
}, []);

const signIn = async (email) => {
  setUser({ email });
  await AsyncStorage.setItem('userEmail', email);
};
```

**(a)** What does `AsyncStorage.setItem('userEmail', email)` do?

**(b)** Why is `AsyncStorage` used here instead of just `useState`?

**(c)** What is the purpose of the empty dependency array `[]` in `useEffect`?

---

## Question 7 – React Navigation (10 pts)

From `AppNavigator.js`:

```js
<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
</Stack.Navigator>
```

**(a)** Which screen will appear first when the app launches? Why?

**(b)** What is the difference between `navigation.replace('Home')` and `navigation.navigate('Home')`?

**(c)** What does `headerShown: false` do to all screens?

---

## Question 8 – Reusable Components (10 pts)

From `AppButton.js`:

```js
export default function AppButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ padding: 12, backgroundColor: '#222', borderRadius: 8 }}>
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>
        {title}
      </Text>
    </Pressable>
  );
}
```

Used in `LoginScreen.js` as:

```js
<AppButton title="Sign in" onPress={handleLogin} />
```

**(a)** What two props does `AppButton` accept?

**(b)** What will be displayed on the button when the above code runs?

**(c)** What happens when the button is tapped by the user?

---

## Question 9 – Firestore Data Fetching (10 pts)

From `UsersModal.js`:

```js
useEffect(() => {
  if (!visible) return;
  const loadUsers = async () => {
    const q = collection(db, 'users_basic');
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setUsers(list);
  };
  loadUsers();
}, [visible]);
```

**(a)** Which Firestore collection is being read?

**(b)** What does `snap.docs.map((d) => ({ id: d.id, ...d.data() }))` produce?

**(c)** Why does the `useEffect` have `[visible]` in its dependency array?

---

## Question 10 – App Structure & Component Composition (10 pts)

The root of the app in `App.js` is structured like this:

```js
<NavigationContainer>
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
</NavigationContainer>
```

**(a)** What is the role of `<NavigationContainer>`?

**(b)** Why is `<AuthProvider>` placed **inside** `<NavigationContainer>` but **outside** `<AppNavigator>`?

**(c)** If you wanted to add a new screen called `SettingsScreen`, list the **two files** you would need to modify and briefly describe what change each one needs.

---

---

# ANSWER KEY (For Teacher Use Only)

---

### Q1 – Answer Key

**(a)** `React` — imported as `import React, { useState } from 'react'`

**(b)** An empty string `''`

**(c)** `setUser("juan@sti.edu")` is called via `onChangeText={setUser}`; the new value of `user` will be `"juan@sti.edu"`

---

### Q2 – Answer Key

**(a)** `.trim()` removes leading and trailing whitespace from the string

**(b)** An alert dialog with title "Oops" and message "Please fill in all fields" will appear; login will not proceed

**(c)** `return` stops the function from continuing to the Firebase call — it acts as an early exit / guard clause

---

### Q3 – Answer Key

**(a)** Firebase **Authentication**

**(b)** The user's email (`user`) and password (`pass`)

**(c)** The `.catch()` block executes; an alert dialog shows the Firebase error message (e.g., "user not found" or "wrong password")

---

### Q4 – Answer Key

**(a)** It initializes the Firebase app instance using the project's configuration (API key, project ID, etc.)

**(b)** `auth` is used for Firebase Authentication — logging users in/out with email and password

**(c)** `db` is the Firestore database instance; it is used in `UsersModal.js` to fetch a list of users from the `users_basic` collection

---

### Q5 – Answer Key

**(a)** `createContext` creates a Context object that allows data to be shared across the component tree without passing props manually at every level (avoids "prop drilling")

**(b)** `user`, `signIn`, and `signOut`

**(c)** It calls `useContext(AuthContext)` to get `user`, then accesses `user?.email`

---

### Q6 – Answer Key

**(a)** It saves the user's email to the device's local storage under the key `'userEmail'`

**(b)** `useState` only holds data in memory — if the app is closed/restarted, the state is lost. `AsyncStorage` persists the data on the device so the user stays logged in across sessions

**(c)** An empty `[]` means the effect runs only once — when the component first mounts (equivalent to `componentDidMount`)

---

### Q7 – Answer Key

**(a)** `LoginScreen`, because `initialRouteName="Login"` sets it as the starting screen

**(b)** `replace` removes the current screen from the navigation stack (user cannot press back to return to Login), while `navigate` pushes the new screen on top of the stack (user can go back)

**(c)** It hides the default navigation header bar on every screen, giving a fully custom UI

---

### Q8 – Answer Key

**(a)** `title` (the label text) and `onPress` (the callback function to run on tap)

**(b)** The text **"Sign in"** inside a dark (`#222`) rounded rectangle button

**(c)** The `handleLogin` function is called, which validates fields and attempts Firebase sign-in

---

### Q9 – Answer Key

**(a)** The `users_basic` collection in Firestore

**(b)** It transforms each Firestore document snapshot into a plain JavaScript object containing the document `id` plus all its stored fields (e.g., `email`, `username`)

**(c)** The effect re-runs whenever `visible` changes — this ensures the users list is freshly fetched every time the modal is opened (when `visible` goes from `false` to `true`)

---

### Q10 – Answer Key

**(a)** `NavigationContainer` manages the navigation state and links the navigator to the app environment — it must wrap all navigation components

**(b)** Placing `AuthProvider` inside `NavigationContainer` allows navigators and screens to use both navigation and auth context. Placing it outside `AppNavigator` means ALL screens inside the navigator can access `AuthContext` via `useContext`

**(c)** Two files to modify:
- **`navigation/AppNavigator.js`** — import `SettingsScreen` and add `<Stack.Screen name="Settings" component={SettingsScreen} />`
- **`screens/SettingsScreen.js`** — create the new screen component file (new file)

---

## Delivery Tips

| Mode | Recommendation |
|---|---|
| **Pen & Paper** | Print the exam without the Answer Key section. Students write answers by hand. |
| **Laboratory** | Students open the actual project in VS Code + Expo Go and answer while inspecting the running app and source code. |
| **Bonus Practical** | "Run the app, log in with a valid account, and take a screenshot of the Home screen." |
