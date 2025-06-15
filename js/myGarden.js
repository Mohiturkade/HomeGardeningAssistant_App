import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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
const userId = user.uid;; 
const addBtn = document.getElementById("add-plant-btn");
const modal = document.getElementById("addPlantModal");
const closeBtn = document.getElementById("closeModal");
const plantSelector = document.getElementById("plantSelector");
const form = document.getElementById("gardenTrackerForm");
const plantedDate = document.getElementById("plantedDate");
const growthNotes = document.getElementById("growthNotes");
const wateringSchedule = document.getElementById("wateringSchedule");
const fertilizerSchedule = document.getElementById("fertilizerSchedule");
const gardenEntries = document.getElementById("gardenEntries");

let allPlants = [];

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});


closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

const auth = getAuth();
const userName = document.getElementById('userName')

const userSection = document.querySelector(".user-section span");
onAuthStateChanged(auth, (user) => {
  if (user) {
    const displayName = user.displayName || user.email || "Gardener";
    userName.textContent = `Hello, ${displayName}`;
  } else {
    userName.textContent = "Hello, Guest";

   window.location.href = "/login.html";
  }
});



async function fetchPlants() {
  try {
    const snapshot = await getDocs(collection(db, "plants"));
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      allPlants.push(data);
      const option = document.createElement("option");
      option.value = data.commonName;
      option.textContent = data.commonName;
      plantSelector.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading plants:", error);
  }
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const selectedPlantName = plantSelector.value;
  const plant = allPlants.find((p) => p.commonName === selectedPlantName);

  if (!plant) {
    alert("Select a valid plant!");
    return;
  }

  const newEntry = {
    commonName: plant.commonName,
    scientificName: plant.scientificName || "",
    careSchedule: {
      watering: wateringSchedule.value || "N/A",
      fertilizing: fertilizerSchedule.value || "N/A",
    },
    plantedDate: plantedDate.value,
    growthNotes: growthNotes.value || "",
  };

  try {
    await addDoc(collection(db, "users", userId, "garden"), newEntry);
    loadGardenEntries();
    form.reset();
    modal.style.display = "none";
  } catch (error) {
    console.error("Error saving entry:", error);
  }
});


async function loadGardenEntries() {
  gardenEntries.innerHTML = "";

  try {
    const snapshot = await getDocs(collection(db, "users", userId, "garden"));
    snapshot.forEach((docSnap) => {
      const entry = docSnap.data();
      const card = document.createElement("div");
      card.className = "entry-card";
      card.innerHTML = `
        <h3>${entry.commonName}</h3>
        <p><strong>Planted:</strong> ${entry.plantedDate}</p>
        <p><strong>Growth Notes:</strong> ${entry.growthNotes || "None"}</p>
        <p><strong>Watering:</strong> ${entry.careSchedule?.watering || "N/A"}</p>
        <p><strong>Fertilizing:</strong> ${entry.careSchedule?.fertilizing || "N/A"}</p>
        <button onclick="deleteEntry('${docSnap.id}')">🗑️ Delete</button>
      `;
      gardenEntries.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading entries:", error);
  }
}


window.deleteEntry = async function (entryId) {
  if (confirm("Delete this plant entry?")) {
    try {
      await deleteDoc(doc(db, "users", userId, "garden", entryId));
      loadGardenEntries();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
};

function addReminder() {
  
}

fetchPlants();
loadGardenEntries();
