const STYLE_ID = "wromo-auth-widget-styles";
const INJECTED_STYLE = [
  ":root {",
  "  --wa-panel: rgba(255, 255, 255, 0.96);",
  "  --wa-ink: #163126;",
  "  --wa-muted: #5d7267;",
  "  --wa-line: rgba(22, 49, 38, 0.12);",
  "  --wa-accent: #1e8e64;",
  "  --wa-shadow: 0 24px 48px rgba(18, 45, 35, 0.12);",
  "}",
  "body {",
  "    background: linear-gradient(180deg, #f7fbf6 0%, #eef4ef 100%);",
  "    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif; ",
  "    margin: 0;",
  "    min-height: 100vh;",
  "    display: flex;",
  "    align-items: center;",
  "    justify-content: center;",
  "}",
  ".wa-mount {",
  "  width: min(400px, 100%);",
  "  margin: 0 auto;",
  "}",
  ".wa-card {",
  "  background: var(--wa-panel);",
  "  border: 1px solid var(--wa-line);",
  "  border-radius: 26px;",
  "  padding: 32px 28px;",
  "  box-shadow: var(--wa-shadow);",
  "  text-align: center;",
  "}",
  ".wa-title {",
  "  margin: 0 0 8px;",
  "  color: var(--wa-ink);",
  "  font: 700 1.4rem/1.3 'Trebuchet MS', sans-serif;",
  "}",
  ".wa-subtitle {",
  "  margin: 0 0 24px;",
  "  color: var(--wa-muted);",
  "  font: 400 0.95rem/1.5 Georgia, serif;",
  "}",
  ".wa-form { display: grid; gap: 16px; }",
  ".wa-input {",
  "  width: 100%;",
  "  padding: 0 18px;",
  "  min-height: 52px;",
  "  border: 1px solid var(--wa-line);",
  "  border-radius: 999px;",
  "  font: 500 1rem/1.4 'Trebuchet MS', sans-serif;",
  "  color: var(--wa-ink);",
  "  background: rgba(255, 255, 255, 0.9);",
  "  box-sizing: border-box;",
  "  outline: none;",
  "  transition: border-color 0.2s;",
  "}",
  ".wa-input:focus { border-color: var(--wa-accent); }",
  ".wa-btn {",
  "  width: 100%;",
  "  min-height: 52px;",
  "  background: var(--wa-ink);",
  "  color: #fff;",
  "  border: none;",
  "  border-radius: 999px;",
  "  font: 700 1rem/1 'Trebuchet MS', sans-serif;",
  "  cursor: pointer;",
  "  transition: background 0.2s;",
  "}",
  ".wa-btn:hover { background: var(--wa-accent); }",
  ".wa-btn:disabled { background: var(--wa-muted); cursor: not-allowed; }",
  ".wa-status {",
  "  margin-top: 16px;",
  "  font: 500 0.9rem/1.4 'Trebuchet MS', sans-serif;",
  "}",
  ".wa-status.success { color: var(--wa-accent); }",
  ".wa-status.error { color: #d93025; }"
].join("\n");

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = INJECTED_STYLE;
  document.head.appendChild(style);
}

function createAuthMarkup(target) {
  const wrapper = document.createElement("div");
  wrapper.className = "wa-mount";
  wrapper.innerHTML = `
    <div class="wa-card">
      <h2 class="wa-title">Secure Login</h2>
      <p class="wa-subtitle">We'll send a magic link to your inbox. No password needed.</p>
      <form class="wa-form" id="wa-login-form">
        <input type="email" id="wa-email" class="wa-input" placeholder="name@domain.com" required autocomplete="email">
        <button type="submit" id="wa-submit" class="wa-btn">Send Magic Link</button>
      </form>
      <div id="wa-message" class="wa-status"></div>
    </div>
  `;
  target.appendChild(wrapper);
  return {
    form: wrapper.querySelector("#wa-login-form"),
    emailInput: wrapper.querySelector("#wa-email"),
    submitBtn: wrapper.querySelector("#wa-submit"),
    messageBox: wrapper.querySelector("#wa-message")
  };
}

function showMessage(elements, text, type) {
  elements.messageBox.textContent = text;
  elements.messageBox.className = "wa-status " + type;
}

async function initFirebaseAuth() {
  const nodes = document.querySelectorAll("[data-wromo-auth]");
  if (nodes.length === 0) return;

  injectStyles();

  // Import Firebase Auth dynamically, without build tools
  // Import Firebase Auth dynamically, using the new version 12.14.0
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js");
  const { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } = await import("https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js");

  for (const node of nodes) {
    if (node.dataset.ready === "true") continue;
    node.dataset.ready = "true";

    const configUrl = node.getAttribute("data-wromo-auth-config");
    const redirectUrl = node.getAttribute("data-wromo-auth-redirect") || window.location.href;

    try {
      const configRes = await fetch(configUrl);
      const firebaseConfig = await configRes.json();
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      
      const elements = createAuthMarkup(node);

      // Check if the user just returned from the email by clicking on the link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        elements.emailInput.style.display = "none";
        elements.submitBtn.style.display = "none";
        showMessage(elements, "Authenticating...", "success");

        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // If they opened the link on a different device, we ask for their email for security confirmation
          email = window.prompt('Please provide your email for confirmation');
        }

        try {
          // 1. We perform the login and capture the result
          const result = await signInWithEmailLink(auth, email, window.location.href);
          
          // 2. Extract the permanent UID provided by Firebase
          const userUid = result.user.uid;
          
          // 3. Save the UID in the browser's Local Storage
          window.localStorage.setItem('wromo_uid', userUid);
          
          // Clear the temporary email used for login
          window.localStorage.removeItem('emailForSignIn');
          
          showMessage(elements, "Success! Redirecting...", "success");
          window.location.href = redirectUrl;
        } catch (error) {
          showMessage(elements, "Link expired or invalid. Please try again.", "error");
          elements.emailInput.style.display = "block";
          elements.submitBtn.style.display = "block";
        }
        return; // We stop execution to not show the empty form
      }

      // Function for sending the login link
      elements.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        elements.submitBtn.disabled = true;
        elements.submitBtn.textContent = "Sending...";
        
        const email = elements.emailInput.value.trim();
        const actionCodeSettings = {
          url: window.location.href, // We redirect back to the same page to complete the logic
          handleCodeInApp: true
        };

        try {
          await sendSignInLinkToEmail(auth, email, actionCodeSettings);
          window.localStorage.setItem('emailForSignIn', email);
          showMessage(elements, "Check your inbox for the magic link!", "success");
          elements.form.reset();
        } catch (error) {
          showMessage(elements, error.message, "error");
        } finally {
          elements.submitBtn.disabled = false;
          elements.submitBtn.textContent = "Send Magic Link";
        }
      });

    } catch (err) {
      node.innerHTML = `<div class="wa-status error">Auth widget failed to load.</div>`;
      console.error(err);
    }
  }
}

export { initFirebaseAuth as mount };

if (typeof window !== 'undefined') {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFirebaseAuth);
  } else {
    initFirebaseAuth();
  }
}
