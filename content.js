console.log("AI Answer Score extension loaded.");

function createBadge() {

  if (document.getElementById("aas-test-badge")) return;

  const badge = document.createElement("div");
  badge.id = "aas-test-badge";

  badge.innerHTML = `
    <div class="aas-title">AI Answer Score</div>
    <div class="aas-score">
      <span class="aas-value">7.4</span>
      <span class="aas-scale">/10</span>
    </div>
    <div class="aas-label">Moderately reliable</div>
    <button class="aas-button">View analysis</button>
  `;

  document.body.appendChild(badge);

  badge.querySelector(".aas-button").addEventListener("click", openPanel);
}

function openPanel() {

  if (document.getElementById("aas-panel")) return;

  const panel = document.createElement("div");
  panel.id = "aas-panel";

  panel.innerHTML = `
    <div class="aas-panel-header">
      <div>
        <div class="aas-panel-title">AI Answer Score</div>
        <div class="aas-panel-subtitle">7.4 / 10</div>
      </div>
      <button id="aas-close">×</button>
    </div>

    <div class="aas-section">
      <div class="aas-section-title">Top issues</div>
      <ul>
        <li>Missing downside risks</li>
        <li>Assumes conditions without stating them</li>
        <li>Overgeneralized conclusion</li>
      </ul>
    </div>

    <div class="aas-section">
      <div class="aas-section-title">Best follow-up question</div>
      <p>What assumptions must be true for this recommendation to work?</p>
    </div>
  `;

  document.body.appendChild(panel);

  document.getElementById("aas-close").onclick = () => panel.remove();
}

window.addEventListener("load", () => {
  setTimeout(createBadge, 1500);
});
