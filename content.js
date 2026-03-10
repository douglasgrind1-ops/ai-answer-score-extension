console.log("AI Answer Score extension loaded.");

let badgeInserted = false;

function findAssistantMessage() {
  // Common selectors that may match ChatGPT message content.
  const selectors = [
    '[data-message-author-role="assistant"]',
    'div[data-message-author-role="assistant"]',
    'article'
  ];

  for (const selector of selectors) {
    const nodes = document.querySelectorAll(selector);
    if (nodes.length > 0) {
      return nodes[nodes.length - 1];
    }
  }

  return null;
}

function createBadge(targetElement) {
  if (document.getElementById("aas-test-badge")) return;
  if (!targetElement) return;

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

  // Place the badge near the detected answer block.
  badge.style.position = "relative";
  badge.style.top = "auto";
  badge.style.right = "auto";
  badge.style.marginTop = "12px";
  badge.style.marginLeft = "auto";
  badge.style.width = "220px";

  targetElement.appendChild(badge);

  const button = badge.querySelector(".aas-button");
  if (button) {
    button.addEventListener("click", openPanel);
  }
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

  const closeButton = document.getElementById("aas-close");
  if (closeButton) {
    closeButton.onclick = () => panel.remove();
  }
}

function checkForAssistantResponse() {
  if (badgeInserted) return;

  const assistantMessage = findAssistantMessage();

  if (assistantMessage) {
    createBadge(assistantMessage);
    badgeInserted = true;
    console.log("AI Answer Score badge attached to assistant message.");
  }
}

// Check repeatedly because ChatGPT content is dynamic.
setInterval(checkForAssistantResponse, 2000);
