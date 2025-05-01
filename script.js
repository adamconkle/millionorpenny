document.getElementById("million").addEventListener("click", () => {
  showResult("million");
});

document.getElementById("penny").addEventListener("click", () => {
  showResult("penny");
});

function showResult(choice) {
  const resultEl = document.getElementById("result");
  const breakdownEl = document.getElementById("breakdown");

  // Clear previous content and styles
  resultEl.textContent = "";
  breakdownEl.innerHTML = "";
  breakdownEl.style.listStyleType = "none";
  breakdownEl.style.paddingLeft = "0";

  if (choice === "million") {
    resultEl.textContent = "You chose $1,000,000!";
  } else if (choice === "penny") {
    let amount = 0.01;

    const finalAmount = (0.01 * Math.pow(2, 30)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    resultEl.textContent = `You chose the penny. After 30 days, you'd have $${finalAmount}!`;

    // Add and animate each day
    for (let day = 1; day <= 30; day++) {
      const formattedAmount = amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const li = document.createElement("li");
      li.textContent = `Day ${day}: $${formattedAmount}`;

      // Initial styles for animation
      li.style.opacity = "0";
      li.style.transform = "translateY(10px)";
      li.style.transition = "opacity 0.4s ease, transform 0.4s ease";

      breakdownEl.appendChild(li);

      // Closure to capture the list item and apply animation with delay
      setTimeout(((el, delay) => () => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      })(li, day), day * 50); // 50ms delay between each item

      amount *= 2;
    }
  }
}
