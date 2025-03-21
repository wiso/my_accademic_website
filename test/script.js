document.addEventListener("DOMContentLoaded", function () {
  const timelineContainer = document.querySelector(".timeline");

  // State management
  const state = {
    getCurrentYear() {
      return new Date().getFullYear();
    },
    get items() {
      const currentYear = this.getCurrentYear();
      return [
        {
          year: "<a href='#'>2025 - XXXI Cracow Epiphany Conference on the recent LHC Results</a>",
          title: "ATLAS searches in the Higgs sector",
        },
        {
          year: (currentYear - 1).toString(),
          title: "Artificial Intelligensce breakthrough in medical research",
        },
        {
          year: (currentYear - 2).toString(),
          title: "First successful Mars colony simulation",
        },
        {
          year: (currentYear - 3).toString(),
          title: "Global renewable energy initiative begins",
        },
      ];
    },
  };

  // Render timeline items
  function renderTimelineItems() {
    timelineContainer.innerHTML = ""; // Clear existing content

    state.items.forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item";

      timelineItem.innerHTML = `
        <div class="timeline-row">
          <div class="timeline-year-column">
            <dt class="timeline-year">${item.year}</dt>
          </div>
          <div class="timeline-content-column">
            <dd class="timeline-title">${item.title}</dd>
          </div>
        </div>
      `;

      timelineContainer.appendChild(timelineItem);
    });
  }

  // Initialize the timeline
  renderTimelineItems();
});







