export const fr = {
  site: {
    name: "IntentScan",
    badge: "Aperçu MVP",
  },

  hero: {
    eyebrow: "Analyseur d’intention de messages par IA",
    title: "Décryptez les messages suspects avant de répondre.",
    description:
      "Collez un DM, email, SMS ou message LinkedIn. IntentScan détecte les arnaques, le spam, la manipulation, les signaux sociaux suspects, puis génère des réponses prêtes à copier.",
    analyze: "Analyser un message",
    examples: "Voir des exemples",
  },

  analyzer: {
    title: "Analyseur de message",
    description: "Collez n’importe quel message suspect.",
    live: "En ligne",
    analyzing: "Analyse...",
    placeholder: "Collez un message étrange ici...",
    button: "Analyser l’intention",
    minLengthError: "Le message doit contenir au moins 10 caractères.",
    genericError: "Une erreur est survenue.",
    copyError: "Impossible de copier la réponse.",
    risk: "Risque",
    intent: "Intention",
    redFlags: "Signaux d’alerte",
    noRedFlags: "Aucun signal d’alerte évident détecté.",
    replies: "Réponses prêtes à copier",
    copy: "Copier",
    copied: "Copié !",
  },

  tones: {
    professional: "Professionnel",
    firm: "Ferme",
    friendly: "Amical",
    roast: "Piquant",
  },

  examples: {
    clickToTry: "Cliquer pour essayer",

    items: [
      "Bonjour, je peux vous aider à gagner 5 000 € par semaine avec mon accompagnement crypto. Envoyez-moi votre WhatsApp et je vous explique.",
      "Bonjour, souhaitez-vous obtenir un site web gratuitement ? Nous avons déjà créé plus de 30 000 sites et sommes classés numéro 1 en ligne.",
      "Votre colis est bloqué. Cliquez sur ce lien maintenant pour confirmer vos informations de livraison avant le retour du colis.",
    ],
  },
} as const;
