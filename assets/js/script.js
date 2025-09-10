
const apiBase = ""; // Kosong jika frontend & backend sama origin. Kalau beda domain, ganti dengan URL backend.

document.getElementById("btnGen").addEventListener("click", async () => {
  const btn = document.getElementById("btnGen");
  btn.disabled = true;
  btn.textContent = "Generating...";

  try {
    const r = await fetch(apiBase + "/api/generate", { method: "POST" });
    const j = await r.json();

    const email = j.email || j?.data?.email || JSON.stringify(j);
    const token = j.token || j?.data?.token || "";

    document.getElementById("emailText").textContent = email;
    document.getElementById("tokenText").textContent = token;
    document.getElementById("emailArea").style.display = "block";

  } catch (e) {
    alert("Gagal generate email");
    console.error(e);
  } finally {
    btn.disabled = false;
    btn.textContent = "Generate Email";
  }
});

document.getElementById("btnPoll").addEventListener("click", async () => {
  const email = document.getElementById("emailText").textContent;
  const token = document.getElementById("tokenText").textContent;
  if (!email || !token) return alert("Email/token tidak tersedia");

  const btn = document.getElementById("btnPoll");
  btn.disabled = true;

  try {
    const res = await fetch(apiBase + "/api/inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, m: 1 })
    });
    const data = await res.json();
    document.getElementById("inbox").innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (e) {
    alert("Gagal fetch inbox");
    console.error(e);
  } finally {
    btn.disabled = false;
  }
});
