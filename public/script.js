const CONFERENCES_URL = "data/conferences.json";
const THESES_URL = "data/theses.json";

// Plain text if no url is given, a link otherwise
function renderLabel(text, url) {
  const element = document.createElement(url ? "a" : "span");
  if (url) {
    element.href = url;
  }
  element.textContent = text;
  return element;
}

function renderConference(item) {
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

function renderConferences(container, items) {
  container.replaceChildren(...items.map(renderConference));
}

function renderThesis(item) {
  const student = document.createElement("dt");
  student.append(`${item.year} - ${item.student} `);

  const badge = document.createElement("span");
  badge.className = `degree-badge degree-badge-${item.degree.toLowerCase()}`;
  badge.textContent = item.degree;
  student.appendChild(badge);

  const title = document.createElement("dd");
  title.appendChild(renderLabel(item.title, item.url));

  return [student, title];
}

function renderTheses(container, items) {
  container.replaceChildren(...items.flatMap(renderThesis));
}

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Fill a container with the items of a json file, if the container is on the page
async function fillSection(selector, url, render) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    render(container, await loadJson(url));
  } catch (error) {
    console.error(`Cannot load ${url}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fillSection(".timeline", CONFERENCES_URL, renderConferences);
  fillSection(".thesis-list", THESES_URL, renderTheses);
});
