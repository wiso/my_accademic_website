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
          year: "2025",
          conference: "XXXI Cracow Epiphany Conference on the recent LHC Results",
          conferenceUrl: "https://epiphany.ifj.edu.pl/epiphany2025/index.html",
          title: "<a href='https://indico.cern.ch/event/1459306/contributions/6264193/'>ATLAS searches in the Higgs sector</a>",
        },
        {
          year: "2024",
          conference: "3rd ECFA workshop on e+e- Higgs, Top & ElectroWeak Factories",
          conferenceUrl: "https://indico.in2p3.fr/event/32629/",
          title: "<a href='https://indico.in2p3.fr/event/32629/timetable/?view=standard#118-dual-readout-fibre-samplin'>Dual-Readout Fibre-Sampling Calorimeter for next lepton collider</a>",
        },
        {
          year: "2022",
          conference: "Higgs Hunting",
          conferenceUrl: "https://indico.ijclab.in2p3.fr/event/7779/",
          title: "<a href='https://indico.ijclab.in2p3.fr/event/7779/timetable/#27-h125-bosonic-decays-in-the'>H(125) bosonic decays in the ATLAS experiment</a>",
        },
        {
          year: "2019",
          conference: "Workshop on Photon Physics and Simulation at Hadron Colliders",
          conferenceUrl: "",
          title: "<a href='https://indico.cern.ch/event/783361/timetable/?view=standard#9-single-higgs-atlascms'>Single Higgs (ATLAS+CMS)</a>",
        },
        {
          year: "2019",
          conference: "<a href='https://www.ualberta.ca/physics/research/lake-louise-winter-institute'>Lake Louise Winter Institute</a>",
          conferenceUrl: "",
          title: "<a href='https://indico.cern.ch/event/760557/contributions/3262337/'>Measurement of cross sections and properties of the Higgs boson in decays to bosons with the ATLAS experiment</a>",
        },
        {
          year: "2017",
          conference: "<a href='http://eps-hep2017.eu/'>EPS</a>",
          conferenceUrl: "",
          title: "<a href='https://indico.cern.ch/event/466934/contributions/2571342/'>Measurement of photon production cross sections with the ATLAS detector</a>",
        },
        {
          year: "2016",
          conference: "<a href='http://blois.in2p3.fr/2016/'>Rencontres de Blois</a>",
          conferenceUrl: "",
          title: "<a href='https://indico.cern.ch/event/464174/contributions/2135860/'>Searches for exotics at ATLAS</a>",
        },
        {
          year: "2015",
          conference: "<a href='http://www.lnf.infn.it/conference/LFC15/index.php'>LFC15</a>",
          conferenceUrl: "",
          title: "<a href='https://agenda.infn.it/contributionDisplay.py?contribId=34&confId=10047'>QCD at the LHC: status and prospects</a>",
        },
        {
          year: "2014",
          conference: "<a href='https://indico.cern.ch/event/297759/'>Higgs Couplings</a>",
          conferenceUrl: "",
          title: "<a href='https://indico.cern.ch/event/297759/contributions/679008/'>Measurent of the Higgs boson mass (ATLAS and CMS)</a>",
        },
        {
          year: "2012",
          conference: "<a href='https://agenda.infn.it/conferenceDisplay.py?confId=4251'>IFAE</a>",
          conferenceUrl: "",
          title: "<a href='http://dx.doi.org/10.1393/ncc/i2013-11470-1'>Search for the SM Higgs boson in the diphoton decay channel with ATLAS</a>",
        },
        {
          year: "2012",
          conference: "<a href='http://confs.obspm.fr/RencontresVietnam/index.htm'>Rencontres du Vietnam</a>",
          conferenceUrl: "",
          title: "<a href='https://cds.cern.ch/record/1497165/'>Search for the Standard Model Higgs Boson in the decay mode H &rarr;&gamma;&gamma; with ATLAS</a>",
        },
        {
          year: "2011",
          conference: "<a href='http://www.pg.infn.it/plhc2011/'>Physics at LHC</a>",
          conferenceUrl: "",
          title: "<a href='https://cds.cern.ch/record/1390418'>Measurements of isolated prompt photons in pp collisions with the ATLAS detector</a>",
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
            <dt class="timeline-year">${item.year}  <span><a href="${item.conferenceUrl}">${item.conference}</a></span></dt>
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
