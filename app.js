
const $ = (id) => document.getElementById(id);


if ($("btn-register")) {
  $("btn-register").addEventListener("click", async () => {
    const name = $("reg-name").value;
    const email = $("reg-email").value;
    const pass = $("reg-password").value;
    const role = $("reg-role").value;

    try {
      const cred = await auth.createUserWithEmailAndPassword(email, pass);

      if (role === "member") {
        await db.collection("members").doc(cred.user.uid).set({
          name,
          email,
          phone: "",
          fee: "",
          uid: cred.user.uid,
        });
      }

      await db.collection("users").doc(cred.user.uid).set({ name, email, role });

      alert("Registered successfully. Please login.");
    } catch (err) {
      alert(err.message);
    }
  });
}

if ($("btn-login")) {
  $("btn-login").addEventListener("click", async () => {
    const email = $("login-email").value;
    const pass = $("login-password").value;
    const roleSel = $("login-role").value;

    try {
      const cred = await auth.signInWithEmailAndPassword(email, pass);
      const snap = await db.collection("users").doc(cred.user.uid).get();
      if (!snap.exists) throw new Error("No user profile");

      const data = snap.data();
      if (data.role !== roleSel) {
        alert(`Role mismatch. You are registered as ${data.role}`);
        auth.signOut();
        return;
      }

      if (data.role === "admin") window.location = "admin.html";
      if (data.role === "member") window.location = "member.html";
      if (data.role === "user") window.location = "user.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

if ($("btn-logout")) {
  $("btn-logout").addEventListener("click", () => auth.signOut());
}

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    if (!window.location.pathname.includes("login.html")) {
      window.location = "login.html";
    }
  }
});

if (window.location.pathname.endsWith("admin.html")) {
  const membersTable = $("members-table");

  if ($("btn-save-member")) {
    $("btn-save-member").addEventListener("click", async () => {
      const id = $("member-id").value;
      const data = {
        name: $("member-name").value,
        email: $("member-email").value,
        phone: $("member-phone").value,
        fee: $("member-fee").value,
      };
      try {
        if (id) {
          await db.collection("members").doc(id).update(data);
          alert("Updated member");
        } else {
          const docRef = await db.collection("members").add(data);
          await db.collection("members").doc(docRef.id).update({ uid: docRef.id });
          alert("Added member");
        }
      } catch (e) {
        alert(e.message);
      }
    });
  }

  if ($("btn-delete-member")) {
    $("btn-delete-member").addEventListener("click", async () => {
      const id = $("member-id").value;
      if (!id) return alert("Enter member id");
      try {
        await db.collection("members").doc(id).delete();
        alert("Deleted");
      } catch (e) {
        alert(e.message);
      }
    });
  }

  if (membersTable) {
    db.collection("members").onSnapshot((snap) => {
      membersTable.innerHTML =
        "<tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Fee</th></tr>";
      snap.forEach((doc) => {
        const m = doc.data();
        membersTable.innerHTML += `<tr>
          <td>${doc.id}</td><td>${m.name}</td><td>${m.email}</td><td>${m.phone}</td><td>${m.fee}</td>
        </tr>`;
      });
    });
  }

  function loadMembersForBills() {
    const billMemberSelect = $("bill-member");
    if (!billMemberSelect) return;
    billMemberSelect.innerHTML = "<option value=''>--Select Member--</option>";
    db.collection("members").get().then(snapshot => {
      snapshot.forEach(doc => {
        const member = doc.data();
        const option = document.createElement("option");
        option.value = doc.id;        
        option.textContent = member.name; 
        billMemberSelect.appendChild(option);
      });
    });
  }
  loadMembersForBills();

  const billForm = $("bill-form");
  if (billForm) {
    billForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const memberId = $("bill-member").value;
      const amount = $("bill-amount").value;
      const note = $("bill-note") ? $("bill-note").value : "";
      const date = $("bill-date").value || new Date().toISOString();

      if (!memberId || !amount) return alert("Please fill all required fields");

      try {
        await db.collection("bills").add({ memberId, amount, note, date });
        alert("Bill created successfully!");
        billForm.reset();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  if ($("btn-send-notif")) {
    $("btn-send-notif").addEventListener("click", async () => {
      const data = {
        title: $("notif-title").value,
        message: $("notif-msg").value,
        date: new Date().toISOString(),
      };
      try {
        await db.collection("notifications").add(data);
        alert("Notification saved");
      } catch (e) {
        alert(e.message);
      }
    });
  }

  const suppTable = $("supp-table");
  if ($("btn-add-supp")) {
    $("btn-add-supp").addEventListener("click", async () => {
      const data = { name: $("supp-name").value, price: $("supp-price").value };
      try {
        await db.collection("supplements").add(data);
      } catch (e) {
        alert(e.message);
      }
    });
  }
  if (suppTable) {
    db.collection("supplements").onSnapshot((snap) => {
      suppTable.innerHTML = "<tr><th>Name</th><th>Price</th></tr>";
      snap.forEach((doc) => {
        const s = doc.data();
        suppTable.innerHTML += `<tr><td>${s.name}</td><td>${s.price}</td></tr>`;
      });
    });
  }

  
  const dietTable = $("diet-table");
  if ($("btn-add-diet")) {
    $("btn-add-diet").addEventListener("click", async () => {
      const data = { name: $("diet-name").value, desc: $("diet-desc").value };
      try {
        await db.collection("diets").add(data);
      } catch (e) {
        alert(e.message);
      }
    });
  }
  if (dietTable) {
    db.collection("diets").onSnapshot((snap) => {
      dietTable.innerHTML = "<tr><th>Name</th><th>Description</th></tr>";
      snap.forEach((doc) => {
        const d = doc.data();
        dietTable.innerHTML += `<tr><td>${d.name}</td><td>${d.desc}</td></tr>`;
      });
    });
  }

  function exportCSV(data, filename) {
    const rows = [Object.keys(data[0]).join(",")];
    data.forEach((row) => rows.push(Object.values(row).join(",")));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  if ($("btn-export-members")) {
    $("btn-export-members").addEventListener("click", async () => {
      const snap = await db.collection("members").get();
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (arr.length) exportCSV(arr, "members.csv");
    });
  }

  if ($("btn-export-bills")) {
    $("btn-export-bills").addEventListener("click", async () => {
      const snap = await db.collection("bills").get();
      const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (arr.length) exportCSV(arr, "bills.csv");
    });
  }
}

if (window.location.pathname.endsWith("member.html")) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) return;

    const billsTable = $("my-bills");
    if (!billsTable) return;

    const memberSnap = await db.collection("members").where("email", "==", user.email).get();
    if (memberSnap.empty) {
      billsTable.innerHTML = "<tr><td colspan='3'>No member record found</td></tr>";
      return;
    }

    const memberId = memberSnap.docs[0].id;

    db.collection("bills").where("memberId", "==", memberId)
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        billsTable.innerHTML = "<tr><th>Amount</th><th>Note</th><th>Date</th></tr>";
        snap.forEach((doc) => {
          const b = doc.data();
          billsTable.innerHTML += `<tr>
            <td>${b.amount}</td>
            <td>${b.note}</td>
            <td>${b.date.split('T')[0]}</td>
          </tr>`;
        });
      });

    const notifList = $("member-notifs");
    if (notifList) {
      db.collection("notifications").orderBy("date", "desc").onSnapshot((snap) => {
        notifList.innerHTML = "";
        snap.forEach((doc) => {
          const n = doc.data();
          notifList.innerHTML += `<li><b>${n.title}</b>: ${n.message}</li>`;
        });
      });
    }
  });
}

if (window.location.pathname.endsWith("user.html")) {
  const searchInput = $("search-query");
  const table = $("search-results");
  if (searchInput && table) {
    searchInput.addEventListener("input", async (e) => {
      const q = e.target.value.toLowerCase();
      const snap = await db.collection("members").get();
      table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Phone</th></tr>";
      snap.forEach((doc) => {
        const m = doc.data();
        if (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)) {
          table.innerHTML += `<tr><td>${m.name}</td><td>${m.email}</td><td>${m.phone}</td></tr>`;
        }
      });
    });
  }
}
