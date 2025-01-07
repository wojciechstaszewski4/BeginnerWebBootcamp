// Handling saving comments to the database:

document
  .getElementById("commentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = form.querySelector('input[name="email"]');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(emailInput.value)) {
      alert("Wprowadź poprawny adres e-mail!");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch("comments-write.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Błąd HTTP! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        alert("Wiadomość została wysłana i zapisana!");

        const overlay = document.getElementById("refresh-overlay");
        overlay.style.display = "block";

        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        alert(result.error || "Wystąpił błąd podczas wysyłania wiadomości!");
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania komentarza: ", error);
      alert("Wystąpił problem podczas zapisywania komentarza!");
    }
  });

// Handling reading comments from the database:

async function loadComments() {
  const noComments = document.querySelector(".no-comments");
  const errorComments = document.querySelector(".error-comments");

  try {
    const response = await fetch(
      `comments-read.php?timestamp=${new Date().getTime()}`
    );

    if (!response.ok) {
      throw new Error(`Błąd HTTP! Status: ${response.status}`);
    }

    const comments = await response.json();
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";

    noComments.style.display = "none";
    errorComments.style.display = "none";

    if (comments.length === 0) {
      noComments.style.display = "block";
      return;
    }

    comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.className = "comments";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      const img = document.createElement("img");
      img.src = "img/avatar.png";
      img.alt = "Awatar";
      avatar.appendChild(img);

      const details = document.createElement("div");
      details.className = "details";

      const author = document.createElement("p");
      author.className = "author";
      author.textContent = comment.author;

      const content = document.createElement("p");
      content.className = "content";
      content.textContent = comment.content;

      const date = document.createElement("p");
      date.className = "date";

      try {
        date.textContent = getTimeAgo(comment.date);
      } catch (error) {
        console.error("Błąd w getTimeAgo:", error);
      }

      details.append(author, content, date);
      commentElement.append(avatar, details);

      commentsContainer.appendChild(commentElement);
    });
  } catch (error) {
    console.error("Błąd podczas pobierania komentarzy: ", error);
    alert("Wystąpił problem podczas ładowania komentarzy!");

    document.getElementById("comments").innerHTML = "";
    document.querySelector(".no-comments").style.display = "none";
    errorComments.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", loadComments);

// Function to calculate the time since the comment was posted:

function getTimeAgo(dateString) {
  const date = parseDate(dateString);

  if (isNaN(date.getTime())) {
    console.error("Nieprawidłowa data: ", dateString);
    return "Nieznana data!";
  }

  const units = [
    {
      max: 60,
      singular: "sekundę",
      pluralFew: "sekundy",
      pluralMany: "sekund",
      divisor: 1,
    },
    {
      max: 60,
      singular: "minutę",
      pluralFew: "minuty",
      pluralMany: "minut",
      divisor: 60,
    },
    {
      max: 24,
      singular: "godzinę",
      pluralFew: "godziny",
      pluralMany: "godzin",
      divisor: 3600,
    },
    {
      max: 30,
      singular: "dzień",
      pluralFew: "dni",
      pluralMany: "dni",
      divisor: 86400,
    },
    {
      max: 12,
      singular: "miesiąc",
      pluralFew: "miesiące",
      pluralMany: "miesięcy",
      divisor: 2592000,
    },
    {
      max: Infinity,
      singular: "rok",
      pluralFew: "lata",
      pluralMany: "lat",
      divisor: 31536000,
    },
  ];

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  for (const { max, singular, pluralFew, pluralMany, divisor } of units) {
    const value = Math.floor(seconds / divisor);
    if (value < max) {
      if (value === 1) return `1 ${singular} temu`;
      if (value >= 2 && value <= 4) return `${value} ${pluralFew} temu`;
      return `${value} ${pluralMany} temu`;
    }
  }
}

// Parses a date string and converts it to a valid ISO format:

function parseDate(dateString) {
  if (typeof dateString !== "string") {
    console.error("Nieprawidłowy typ daty:", dateString);
    return new Date(NaN);
  }

  return new Date(dateString.replace(" ", "T"));
}
