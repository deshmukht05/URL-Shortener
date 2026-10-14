const fetchShortendURL = async () => {
  const res = await fetch("/links");
  const links = await res.json();

  console.log("Links: ", links);

  const list = document.getElementById("shortened-urls");
  list.innerHTML = "";

  for (const [shortCode, url] of Object.entries(links)) {
    const li = document.createElement("li");
    const trancateURL = url.length >= 30 ? `${url.slice(0, 30)}...` : url;
    li.innerHTML = `<a href = "/${shortCode}" target = "_blank">${window.location.origin}/${shortCode}</a> - ${trancateURL}`;
    list.appendChild(li)
  }
};

document
  .getElementById("shorten-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const url = formData.get("url");
    const shortCode = formData.get("shortCode");

    console.log("Submitting:", { url, shortCode });

    try {
      const res = await fetch("/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, shortCode }),
      });

      if (res.ok) {
        fetchShortendURL();
        alert("Form submitted successfully.");
        event.target.reset();
      } else {
        const errorMessage = await res.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  });
fetchShortendURL();
