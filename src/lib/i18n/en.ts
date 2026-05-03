export const en = {
  site: {
    name: "IntentScan",
    badge: "MVP Preview",
  },

  hero: {
    eyebrow: "AI Analysis",
    signal: "Scams · Spam · Phishing",
    title: "Decode before you reply.",
    highlight: "Understand the real intent.",
    description:
      "Paste a DM, email, SMS, or LinkedIn pitch. IntentScan detects scams, spam, manipulation, social red flags, and generates clean replies you can copy.",
    analyze: "Analyze a message",
    examples: "View examples",
  },

  analyzer: {
    title: "Message analyzer",
    description: "Paste anything suspicious.",
    live: "Live",
    analyzing: "Analyzing...",
    placeholder: "Paste a weird message here...",
    button: "Analyze intent",
    minLengthError: "Message must contain at least 10 characters.",
    genericError: "Something went wrong.",
    copyError: "Failed to copy reply.",
    risk: "Risk",
    intent: "Intent",
    redFlags: "Red flags",
    noRedFlags: "No obvious red flags detected.",
    replies: "Copy-ready replies",
    copy: "Copy",
    copied: "Copied!",
    helperEnter: "Enter ↵ to analyze",
    helperNewLine: "Shift + Enter for new line",
    riskLevels: {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
    },
    intentLabels: {
      LEGIT: "Legit",
      SALES: "Sales",
      SCAM: "Scam",
      PHISHING: "Phishing",
      ROMANCE: "Romance scam",
      RECRUITING: "Recruiting",
      UNKNOWN: "Unknown",
    },
  },

  tones: {
    professional: "Professional",
    firm: "Firm",
    friendly: "Friendly",
    roast: "Roast",
  },

  examples: {
    clickToTry: "Click to try",
    items: [
      "Hey dear, I can help you make $5,000 per week with my crypto mentorship. Send me your WhatsApp and I will explain.",
      "Hi, any interest in having a website built for you free of charge? We have created 30,000+ websites and are rated #1 online.",
      "Your package is blocked. Click this link now to confirm your delivery details before it is returned.",
    ],
  },
} as const;
