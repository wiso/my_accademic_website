const CONFERENCES_URL = "data/conferences.json";

// Plain text if no url is given, a link otherwise
function renderLabel(text, url) {
  const element = document.createElement(url ? "a" : "span");
  if (url) {
    element.href = url;
  }
  element.textContent = text;
  return element;
}

function renderTimelineItem(item) {
  const timelineItem = document.createElement("div");
  timelineItem.className = "timeline-item";

  timelineItem.innerHTML = `
    <div class="timeline-row">
      <div class="timeline-year-column">
        <dt class="timeline-year"></dt>
      </div>
      <div class="timeline-content-column">
        <dd class="timeline-title"></dd>
      </div>
    </div>
  `;

  const year = timelineItem.querySelector(".timeline-year");
  year.append(`${item.year} `, renderLabel(item.conference, item.conferenceUrl));

  const title = timelineItem.querySelector(".timeline-title");
  title.append(renderLabel(item.title, item.titleUrl));

  return timelineItem;
}

function renderTimeline(container, items) {
  container.innerHTML = ""; // Clear existing content
  items.forEach((item) => container.appendChild(renderTimelineItem(item)));
}

document.addEventListener("DOMContentLoaded", async function () {
  const timelineContainer = document.querySelector(".timeline");
  if (!timelineContainer) return;

  try {
    const response = await fetch(CONFERENCES_URL);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    renderTimeline(timelineContainer, await response.json());
  } catch (error) {
    console.error(`Cannot load ${CONFERENCES_URL}:`, error);
  }
});
