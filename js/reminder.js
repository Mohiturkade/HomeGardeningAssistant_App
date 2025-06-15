if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

let time = document.getElementById('time');
let date = document.getElementById('date');
let title = document.getElementById('title');

function setReminder() {
  const reminder = {
    title: title.value,
    date: date.value,
    time: time.value
  };

  const reminderKey = `reminder_${Date.now()}`;
  localStorage.setItem(reminderKey, JSON.stringify(reminder));
  document.getElementById('reminderMessage').innerText = "✅ Reminder saved!";
  scheduleNotification(reminder);
  displayReminder();
}

function displayReminder() {
  const container = document.getElementById("reminderList");
  container.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("reminder_")) {
      const reminder = JSON.parse(localStorage.getItem(key));
      const reminderElement = document.createElement("div");
      reminderElement.className = "reminder-item";
      reminderElement.innerHTML = `
        <h3>${reminder.title}</h3>
        <p><strong>Date:</strong> ${reminder.date}</p>
        <p><strong>Time:</strong> ${reminder.time}</p>
        <button onclick="deleteReminder('${key}')">🗑️ Delete</button>
      `;
      container.appendChild(reminderElement);
    }
  }
}


function deleteReminder(data) {
  localStorage.removeItem(data);
  displayReminder();
}

function scheduleNotification(reminder) {
  const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
  const now = new Date();
  const delay = reminderTime - now;

  if (delay > 0) {
    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("⏰ Reminder Alert", {
          body: `${reminder.title} at ${reminder.time}`,
          icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
        });
      }
    }, delay);
  }
}

function rescheduleAllReminders() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("reminder_")) {
      const reminder = JSON.parse(localStorage.getItem(key));
      scheduleNotification(reminder);
    }
  }
}

document.getElementById('reminderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  setReminder();
});

rescheduleAllReminders();
displayReminder();
