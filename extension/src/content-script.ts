console.log("[IntentScan] content script loaded");

document.documentElement.setAttribute("data-intentscan", "loaded");

const buttonId = "intentscan-analyze-button";

type AnalyzeMessageResponse =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

function getVisibleConversationText() {
  const conversationRoot =
    document.querySelector('[data-view-name="message-thread"]') ??
    document.querySelector(".msg-s-message-list-container") ??
    document.body;

  const rawText = conversationRoot.textContent ?? "";

  return rawText
    .replace(/\s+/g, " ")
    .replace(/Le statut est :.*?niveau · 1er/g, "")
    .replace(/Voir le profil de .*? \d{1,2}:\d{2}/g, "")
    .replace(
      /\b\d{1,2}\s+(janv|févr|mars|avr|mai|juin|juil|août|sept|oct|nov|déc)\.?\b/gi,
      ""
    )
    .replace(
      /[A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+ a envoyé (le message suivant|les messages suivants) à \d{1,2}:\d{2}/g,
      ""
    )
    .replace(
      /[A-ZÀ-ÿ][A-ZÀ-ÿ\s'-]+ a envoyé (le message suivant|les messages suivants)/g,
      ""
    )
    .replace(/👏|👍|😊/g, "")
    .replace(/Ouvrir le clavier des émoticônes/g, "")
    .trim();
}

function showIntentScanPopup(data: unknown) {
  const existingPopup = document.getElementById("intentscan-popup");

  if (existingPopup) {
    existingPopup.remove();
  }

  const result = data as {
    riskScore?: number;
    riskLevel?: string;
    intent?: string;
    summary?: string;
    redFlags?: string[];
    manipulationTechniques?: string[];
    replyOptions?: Record<string, string>;
  };

  const popup = document.createElement("aside");

  popup.id = "intentscan-popup";
  popup.innerHTML = `
    <div class="intentscan-popup-header">
      <div>
        <p class="intentscan-popup-eyebrow">IntentScan analysis</p>
        <h2>${result.intent ?? "Unknown intent"}</h2>
      </div>
      <button id="intentscan-popup-close" type="button">×</button>
    </div>

    <div class="intentscan-score">
      <span>${result.riskLevel ?? "UNKNOWN"}</span>
      <strong>${result.riskScore ?? "?"}/100</strong>
    </div>

    <p class="intentscan-summary">${result.summary ?? "No summary available."}</p>

    <div class="intentscan-section">
      <h3>Red flags</h3>
      <ul>
        ${(result.redFlags ?? []).map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="intentscan-section">
      <h3>Manipulation techniques</h3>
      <ul>
        ${(result.manipulationTechniques ?? [])
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
    </div>

    <div class="intentscan-section">
      <h3>Suggested replies</h3>
      <div class="intentscan-replies">
        ${Object.entries(result.replyOptions ?? {})
          .map(
            ([label, text]) => `
              <button class="intentscan-copy-reply" type="button" data-reply="${encodeURIComponent(
                text
              )}">
                <span>${label}</span>
                <small>${text}</small>
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  document
    .getElementById("intentscan-popup-close")
    ?.addEventListener("click", () => popup.remove());

  document.querySelectorAll(".intentscan-copy-reply").forEach((button) => {
    button.addEventListener("click", () => {
      const reply = button.getAttribute("data-reply");

      if (!reply) {
        return;
      }

      void navigator.clipboard.writeText(decodeURIComponent(reply));
    });
  });
}

function injectAnalyzeButton() {
  if (document.getElementById(buttonId)) {
    return;
  }

  const button = document.createElement("button");

  button.id = buttonId;
  button.type = "button";
  button.textContent = "Analyze with IntentScan";

  button.style.position = "fixed";
  button.style.right = "24px";
  button.style.bottom = "24px";
  button.style.zIndex = "999999";
  button.style.padding = "12px 18px";
  button.style.borderRadius = "999px";
  button.style.border = "1px solid rgba(255,255,255,0.12)";
  button.style.background = "rgba(15,23,42,0.92)";
  button.style.color = "#ffffff";
  button.style.fontWeight = "600";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
  button.style.backdropFilter = "blur(12px)";

  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)";
  });

  button.addEventListener("click", () => {
    const messageText = getVisibleConversationText();

    console.log("[IntentScan] extracted conversation:", messageText);

    if (!messageText) {
      alert("Aucun texte détecté.");
      return;
    }

    chrome.runtime.sendMessage(
      {
        type: "INTENTSCAN_ANALYZE",
        payload: {
          message: messageText,
        },
      },
      (response: AnalyzeMessageResponse) => {
        if (!response?.ok) {
          console.error("[IntentScan] analysis failed:", response?.error);
          alert("IntentScan API error. Check console.");
          return;
        }

        console.log("[IntentScan] analysis result:", response.data);
        showIntentScanPopup(response.data);
      }
    );
  });

  document.body.appendChild(button);
}

injectAnalyzeButton();
