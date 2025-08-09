document.addEventListener('DOMContentLoaded', function () {
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Elements
  const tabBtns = document.querySelectorAll('.tab-btn');
  const authForms = document.querySelectorAll('.auth-form');
  const switchTabLinks = document.querySelectorAll('.switch-tab');
  const authMessage = document.getElementById('authMessage');

  const rememberMeCheckbox = document.getElementById('rememberMe');
  const loginEmailInput = document.getElementById('loginEmail');
  const loginPasswordInput = document.getElementById('loginPassword');
  const registerNameInput = document.getElementById('registerName');
  const registerEmailInput = document.getElementById('registerEmail');
  const registerPasswordInput = document.getElementById('registerPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  // Password visibility toggle
  document.querySelectorAll('.password-toggle').forEach(button => {
    button.addEventListener('click', function () {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Switch tab function
  function switchTab(targetTab) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${targetTab}"]`).classList.add('active');

    authForms.forEach(form => form.classList.remove('active'));
    document.getElementById(`${targetTab}-form`).classList.add('active');

    if (authMessage) {
      authMessage.style.display = 'none';
      authMessage.textContent = '';
    }
  }

  tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  switchTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(link.dataset.tab);
    });
  });

  // Show message helper
  function showMessage(message, type) {
    if (!authMessage) return;
    authMessage.textContent = message;
    authMessage.className = `auth-message ${type}`;
    authMessage.style.display = 'block';
    setTimeout(() => {
      authMessage.style.display = 'none';
    }, 5000);
  }

  // Button loading state helper
  function setButtonLoading(button, loading) {
    let spinner = button.querySelector('.spinner');
    if (!spinner) {
      spinner = document.createElement('span');
      spinner.className = 'spinner';
    }

    if (loading) {
      button.disabled = true;
      if (!button.contains(spinner)) {
        button.prepend(spinner);
      }
      button.classList.add('loading');
    } else {
      button.disabled = false;
      if (spinner.parentNode === button) spinner.remove();
      button.classList.remove('loading');
    }
  }

  // Initialize persistence & set based on rememberMe flag from Firestore (if user logged in)
  async function initAuthPersistence() {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const rememberMe = userDoc.exists ? userDoc.data().rememberMe : false;

        await auth.setPersistence(
          rememberMe
            ? firebase.auth.Auth.Persistence.LOCAL
            : firebase.auth.Auth.Persistence.SESSION
        );
      } catch (err) {
        console.error("Error fetching rememberMe from Firestore:", err);
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
    } else {
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
  }
  initAuthPersistence();

  // LOGIN
  // LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    if (!email || !password) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    setButtonLoading(submitBtn, true);

    try {
      // Set persistence BEFORE login based on rememberMe checkbox
      await auth.setPersistence(
        rememberMe
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION
      );

      // Sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);

      // Email verification check removed here, login allowed if email registered and password correct

      // Update lastLogin and rememberMe flag in Firestore
      await db.collection('users').doc(userCredential.user.uid).update({
        rememberMe,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });

      showMessage('Login successful!', 'success');
      setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessages = {
        'auth/user-not-found': 'Email not registered',
        'auth/invalid-email': 'Invalid email format',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Try later.',
        'auth/user-disabled': 'Account disabled',
      };
      showMessage(errorMessages[error.code] || 'Login failed', 'error');
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });
}

  // REGISTRATION
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = registerNameInput.value.trim();
      const email = registerEmailInput.value.trim();
      const password = registerPasswordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const rememberMe = rememberMeCheckbox.checked;
      const submitBtn = registerForm.querySelector('button[type="submit"]');

      if (!name || !email || !password || !confirmPassword) {
        showMessage('All fields are required', 'error');
        return;
      }
      if (password !== confirmPassword) {
        showMessage('Passwords must match', 'error');
        return;
      }
      if (password.length < 8) {
        showMessage('Password must be 8+ characters', 'error');
        return;
      }

      setButtonLoading(submitBtn, true);

      try {
        const methods = await auth.fetchSignInMethodsForEmail(email);
        if (methods.length > 0) {
          showMessage('Email already registered. Please login instead.', 'error');
          setTimeout(() => switchTab('login'), 2000);
          return;
        }

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({ displayName: name });
        await userCredential.user.sendEmailVerification();

        // Save user profile in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
          name,
          email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
          totalIncome: 0,
          totalExpenses: 0,
          emailVerified: false, // You might update this on email verification elsewhere
          rememberMe,
        });

        showMessage('Registration successful! Check your email to verify.', 'success');

        if (!rememberMe) registerForm.reset();

        setTimeout(() => switchTab('login'), 3000);
      } catch (error) {
        console.error('Registration error:', error);
        const errorMessages = {
          'auth/email-already-in-use': 'Email already registered',
          'auth/invalid-email': 'Invalid email format',
          'auth/weak-password': 'Password too weak',
          'auth/operation-not-allowed': 'Registration disabled',
        };
        showMessage(errorMessages[error.code] || 'Registration failed', 'error');
      } finally {
        setButtonLoading(submitBtn, false);
      }
    });
  }

  // Single onAuthStateChanged listener for redirects and verification check
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await user.reload();

      if (user.emailVerified) {
        // Redirect logged-in verified users away from auth page
        if (window.location.pathname.includes('auth.html')) {
          window.location.href = 'dashboard.html';
        }
      } else {
        // Sign out unverified users outside auth page and redirect to auth page
        if (!window.location.pathname.includes('auth.html')) {
          await auth.signOut();
          alert('Please verify your email to continue.');
          window.location.href = 'auth.html';
        }
      }
    }
  });
});
