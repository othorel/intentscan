console.log("[IntentScan] content script loaded");

document.documentElement.setAttribute("data-intentscan", "loaded");

const buttonId = "intentscan-analyze-button";

type AnalyzeMessageResponse =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

function getVisibleConversationText() {
  const candidates = [
    document.querySelector('[data-view-name="message-thread"]'),
    document.querySelector(".msg-s-message-list-container"),
    document.querySelector(".msg-thread"),
    document.querySelector(".msg-s-event-list"),
    document.querySelector(".scaffold-layout__detail"),
  ].filter(Boolean);

  for (const candidate of candidates) {
    const rawText = candidate.textContent ?? "";

    const cleanedText = rawText
      .replace(/\s+/g, " ")
      .replace(/0 notification au total/g, "")
      .replace(/Accéder à la recherche/g, "")
      .replace(/Passer au contenu principal/g, "")
      .replace(/Raccourcis clavier/g, "")
      .replace(/Fermer le menu de navigation/g, "")
      .replace(/Le statut est :.*?niveau · 1er/g, "")
      .replace(/Voir le profil de .*? \d{1,2}:\d{2}/g, "")
      .replace(/Ouvrir la liste des options.*?(?=LinkedIn|Sponsorisé|Bonjour|$)/g, "")
      .replace(/Accessibilité :.*$/g, "")
      .replace(/Infos Accessibilité Assistance clientèle.*$/g, "")
      .replace(/Rédiger un message.*$/g, "")
      .replace(/Analyze with IntentScan/g, "")
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

    if (
      cleanedText &&
      !cleanedText.includes('"entityUrn"') &&
      !cleanedText.includes("com.linkedin.voyager") &&
      cleanedText.length > 30
    ) {
      return cleanedText;
    }
  }

  return "";
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

    <div class="intentscan-score intentscan-risk-${(result.riskLevel ?? "UNKNOWN").toLowerCase()}">
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
            <div class="intentscan-reply-card">
              <div>
                <span>${label}</span>
                <small>${text}</small>
              </div>
              <button
                class="intentscan-copy-reply"
                type="button"
                aria-label="Copy reply"
                data-reply="${encodeURIComponent(text)}"
              >
                ⧉
              </button>
            </div>
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

      void navigator.clipboard.writeText(decodeURIComponent(reply)).then(() => {
        button.textContent = "✓";

        window.setTimeout(() => {
          button.textContent = "⧉";
        }, 1200);
      });
    });
  });
}

function injectAnalyzeButton() {
  if (!window.location.pathname.includes("/messaging")) {
    document.getElementById(buttonId)?.remove();
    return;
  }

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
      alert("Aucun texte détecté. Ouvre une conversation LinkedIn puis réessaie.");
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

function keepAnalyzeButtonAlive() {
  injectAnalyzeButton();

  window.setTimeout(keepAnalyzeButtonAlive, 1000);
}

keepAnalyzeButtonAlive();
