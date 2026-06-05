const PHONE = "918218628232";

export const wa = (msg: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;

export const WA = {
  base: `https://wa.me/${PHONE}`,
  bookCall: wa("Hi! I'd like to book a free strategy call with Core Elite Digital."),
  projectBrief: wa("Hi! I'd like to send a project brief to Core Elite Digital."),
  generalInquiry: wa("Hi! I'd like to discuss a project with Core Elite Digital."),
  question: wa("Hi! I have a question for Core Elite Digital."),
  startProject: wa("Hi! I'd like to start a project with Core Elite Digital."),
  blogReader: wa("Hi! I read your blog and I'd like to discuss a project with Core Elite Digital."),
  followUp: wa("Hi! I just submitted an inquiry and wanted to follow up."),
  aiCall: wa("I want to deploy AI Call Management for my business."),
  aiCallDemo: wa("Hi! I'd like to see a live demo of the AI Phone System."),
  aiWhatsApp: wa("I want to automate my WhatsApp business with AI."),
  aiWhatsAppDemo: wa("Hi! I'd like to see the AI WhatsApp automation in action."),
  aiSocial: wa("I want AI to manage my social media."),
  aiSocialSample: wa("Hi! I'd like to see sample AI social media content from Core Elite Digital."),
  aiSite: wa("I want an AI-powered website for my business."),
  quote: wa("Hi! I'd like to get a quote from Core Elite Digital."),
} as const;
