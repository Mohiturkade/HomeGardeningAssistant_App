import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOCK-6585AyJxjB9BNrpvQRMboH2XlKmo",
  authDomain: "homegardeningassistant.firebaseapp.com",
  projectId: "homegardeningassistant",
  storageBucket: "homegardeningassistant.appspot.com",
  messagingSenderId: "152673905645",
  appId: "1:152673905645:web:12390b05bc256bd2b5d5e4",
  measurementId: "G-18HWMSLKFC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const regionSelect = document.getElementById("region");
const seasonSelect = document.getElementById("season");
const form = document.getElementById("tipForm");
const container = document.getElementById("seasonalTips");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const region = regionSelect.value.trim();
  const season = seasonSelect.value.trim().toLowerCase();
  await getSeasonalTips(region, season);
});

async function getSeasonalTips(region, season) {
  try {
    const docRef = doc(db, "seasonalTips", region);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const tips = data[season];

      if (Array.isArray(tips) && tips.length > 0) {
        displayTips(region, season, tips);
      } else {
        displayTips(region, season, ["No tips available for this season."]);
      }
    } else {
      container.innerHTML = `<p>❌ No data found for region: <strong>${region}</strong></p>`;
    }
  } catch (error) {
    container.innerHTML = `<p>🔥 Error fetching tips: ${error.message}</p>`;
  }
}

function displayTips(region, season, tips) {
  container.innerHTML = `
    <h3>🌿 Gardening Tips for <em>${season}</em> in <em>${region}</em></h3>
    <ul>
      ${tips.map(tip => `<li>${tip}</li>`).join("")}
    </ul>
  `;
}

document.getElementById("getTipBtn").addEventListener("click", () => {
  const region = regionSelect.value.trim();
  const season = seasonSelect.value.trim().toLowerCase();
  getSeasonalTips(region, season);
});


