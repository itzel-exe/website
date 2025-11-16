// Show current year in footer
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Example button action
  const btn = document.getElementById("clickMe");
  btn.addEventListener("click", () => {
    alert("Button clicked!");
  });
});
