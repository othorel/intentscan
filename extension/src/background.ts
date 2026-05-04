chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type !== "INTENTSCAN_ANALYZE") {
    return false;
  }

  fetch("http://localhost:3000/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message.payload.message,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      sendResponse({ ok: true, data });
    })
    .catch((error: unknown) => {
      console.error("[IntentScan] background analysis failed:", error);
      sendResponse({ ok: false, error: "IntentScan API error" });
    });

  return true;
});
