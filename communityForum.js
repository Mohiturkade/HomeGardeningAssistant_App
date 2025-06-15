import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCOCK-6585AyJxjB9BNrpvQRMboH2XlKmo",
  authDomain: "homegardeningassistant.firebaseapp.com",
  projectId: "homegardeningassistant",
  storageBucket: "homegardeningassistant.appspot.com",
  messagingSenderId: "152673905645",
  appId: "1:152673905645:web:12390b05bc256bd2b5d5e4",
  measurementId: "G-18HWMSLKFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM elements
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("community-posts");
const newTopicBtn = document.getElementById("newTopicBtn");

// Show form
newTopicBtn.addEventListener("click", () => {
  postForm.style.display = "block";
});

// Submit form
window.handlePostSubmit = async function (e) {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    alert("⚠️ You must be logged in to post.");
    return;
  }

  const newPost = {
    subject: subjectInput.value.trim(),
    message: messageInput.value.trim(),
    timestamp: serverTimestamp(),
    author: user.displayName || user.email
  };

  try {
    await addDoc(collection(db, "communityPosts"), newPost);
    subjectInput.value = "";
    messageInput.value = "";
    alert("✅ Post submitted!");
    fetchCommunityPosts();
  } catch (err) {
    console.error("Post error:", err);
    alert("❌ Failed to submit post");
  }
};

// Fetch and display posts
async function fetchCommunityPosts() {
  postsContainer.innerHTML = "<p>Loading posts...</p>";

  const q = query(collection(db, "communityPosts"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    postsContainer.innerHTML = "<p>No posts yet. Be the first!</p>";
    return;
  }

  postsContainer.innerHTML = "";
  snapshot.forEach(doc => {
    const post = doc.data();
    const time = post.timestamp?.toDate().toLocaleString() || "Unknown";

    const postEl = document.createElement("div");
    postEl.innerHTML = `
      <p>by <strong>${post.author || "Anonymous"}</strong></p>
      <h2>${post.subject}</h2>
      <p>${post.message}</p>
      <span>${time}</span>
      <hr/>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Auto load posts when user logs in
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchCommunityPosts();
  } else {
    postsContainer.innerHTML = "<p>Please log in to see posts.</p>";
  }
});
newTopicBtn.addEventListener('click' ,()=>{
postForm.style.display='block';
})





