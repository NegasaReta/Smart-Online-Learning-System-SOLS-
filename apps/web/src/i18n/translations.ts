import { amExtra, omExtra } from "./translations-extra";

export type Language = "en" | "am" | "om";

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "am", label: "Amharic", nativeLabel: "\u12A0\u121B\u122D\u129B" },
  { code: "om", label: "Afaan Oromoo", nativeLabel: "Afaan Oromoo" },
];

// Flexible string key — any English text doubles as a translation key
export type TranslationKey = string;

type Dict = Record<string, string>;

const en: Dict = {
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.search": "Search",
  "common.logout": "Log out",
  "common.back": "Back",
  "common.loading": "Loading...",
  "common.languageChanged": "Language updated",

  "portal.parent": "Parent",
  "portal.teacher": "Teacher",

  "nav.dashboard": "Dashboard",
  "nav.classManagement": "Class Management",
  "nav.createContent": "Create Content",
  "nav.subjectResources": "Subject Resources",
  "nav.studentFeedback": "Student Feedback",
  "nav.performanceAnalytics": "Performance Analytics",
  "nav.settings": "Settings",
  "nav.progress": "Child Progress",
  "nav.report": "Report Card",
  "nav.logs": "Activity Logs",
  "nav.feedback": "Send Feedback",

  "settings.title": "Settings",
  "settings.subtitleParent":
    "Manage your parent account, notifications, and connected children.",
  "settings.subtitleTeacher":
    "Manage your educator profile, notifications, and class assignments.",
  "settings.tab.profile": "Profile",
  "settings.tab.notifications": "Notifications",
  "settings.tab.security": "Security",
  "settings.tab.children": "Linked Children",
  "settings.tab.assignments": "Teaching Assignments",
  "settings.tab.preferences": "Preferences",
  "settings.tab.account": "Account",

  "prefs.title": "Language & Region",
  "prefs.description": "Personalize how content is displayed across the portal.",
  "prefs.language": "Language",
  "prefs.timezone": "Time zone",
  "prefs.dateFormat": "Date format",
};

const am: Dict = {
  "common.save": "\u12A0\u1235\u1240\u121D\u1325",
  "common.cancel": "\u1230\u122D\u12DD",
  "common.search": "\u134D\u1208\u130B",
  "common.logout": "\u12C8\u1323",
  "common.back": "\u1270\u1218\u120B\u1218\u1235",
  "common.loading": "\u12A5\u12E8\u1270\u132B\u1290\u1208...",
  "common.languageChanged": "\u1262\u1235\u120B\u1273\u120D\u1235",

  "portal.parent": "\u12C8\u120B\u1305",
  "portal.teacher": "\u1218\u121B\u122A",

  "nav.dashboard": "\u12F3\u123D\u1266\u122D\u12F5",
  "nav.classManagement": "\u12E8\u12AD\u134D\u120D \u12A0\u1235\u1270\u12F3\u12F0\u122D",
  "nav.createContent": "\u12CD\u1325\u1265 \u134D\u1320\u122D",
  "nav.subjectResources": "\u12E8\u12A8\u134D\u1208\u1273 \u130D\u1265\u12A6\u127D",
  "nav.studentFeedback": "\u12E8\u1270\u121B\u122A \u12C8\u12F0\u1262",
  "nav.performanceAnalytics": "\u12E8\u12A0\u1208\u1338\u120B\u1349\u121D \u120A\u1235\u1275",
  "nav.settings": "\u1245\u1295\u1265\u122E\u127D",
  "nav.progress": "\u12E8\u120D\u1305 \u12A5\u12F5\u1308\u1275",
  "nav.report": "\u12E8\u12CD\u1324\u1275 \u12AB\u122D\u12F5",
  "nav.logs": "\u12E8\u1325\u1215\u1349\u1275 \u121B\u1235\u1273\u12C8\u123B",
  "nav.feedback": "\u12C8\u12F0\u1262 \u120B\u12AD",

  "settings.title": "\u1245\u1295\u1265\u122E\u127D",
  "settings.subtitleParent":
    "\u12E8\u12C8\u120B\u1305 \u128B\u1245\u1295\u1275\u12CE\u1295, \u121B\u1233\u1234\u1262\u12EB\u12CE\u127D \u12A5\u1293 \u12E8\u1270\u1308\u1293\u1299 \u120D\u1303\u1290\u1276\u127D \u12EB\u1235\u1270\u12F3\u12F5\u1229\u1362",
  "settings.subtitleTeacher":
    "\u12E8\u121B\u1235\u1270\u121B\u122A \u130E\u1390\u12CE\u1295, \u121B\u1233\u1234\u1262\u12EB\u12CE\u127D \u12A5\u1293 \u120D\u12E8\u1295\u1267\u1276\u127D \u12EB\u1235\u1270\u12F3\u12F5\u1229\u1362",
  "settings.tab.profile": "\u130E\u1390\u120D",
  "settings.tab.notifications": "\u121B\u1233\u1234\u1262\u12EB\u12CE\u127D",
  "settings.tab.security": "\u1235\u122B \u12F0\u1205\u1295\u1290\u1275",
  "settings.tab.children": "\u12E8\u1270\u1308\u1293\u1299 \u120D\u1303\u1290\u1276\u127D",
  "settings.tab.assignments": "\u12E8\u121B\u1235\u1270\u121B\u122A \u120D\u12E8\u1295\u1267\u1276\u127D",
  "settings.tab.preferences": "\u121D\u122D\u132B\u12CE\u127D",
  "settings.tab.account": "\u128B\u1245\u1295\u1275",

  "prefs.title": "\u1240\u1295\u1245\u12A3\u121B \u12A5\u1293 \u12A0\u12AB\u1263\u1262",
  "prefs.description":
    "\u12E8\u121D\u1275\u1218\u1208\u12A8\u1276\u1295 \u12A0\u1240\u122B\u1228\u1265 \u12A0\u1235\u1270\u12AB\u12AD\u120D\u1362",
  "prefs.language": "\u1240\u1295\u1245\u12A3",
  "prefs.timezone": "\u12E8\u1230\u12D3\u1275 \u1230\u1208\u1320\u122B",
  "prefs.dateFormat": "\u12E8\u1240\u1295 \u135D\u122B\u120D",
};

const om: Dict = {
  "common.save": "Olkaa'i",
  "common.cancel": "Haquu",
  "common.search": "Barbaadi",
  "common.logout": "Ba'i",
  "common.back": "Duuba",
  "common.loading": "Fe'amaa jira...",
  "common.languageChanged": "Afaan jijjiirameera",

  "portal.parent": "Maatii",
  "portal.teacher": "Barsiisaa",

  "nav.dashboard": "Daashbordii",
  "nav.classManagement": "Bulchiinsa Daree",
  "nav.createContent": "Qabiyyee Uumuu",
  "nav.subjectResources": "Qabeenya Barnootaa",
  "nav.studentFeedback": "Yaada Barattootaa",
  "nav.performanceAnalytics": "Xiinxala Raawwii",
  "nav.settings": "Qindaa'ina",
  "nav.progress": "Guddina Ijoollee",
  "nav.report": "Kaardii Qabxii",
  "nav.logs": "Galmee Sochii",
  "nav.feedback": "Yaada Ergi",

  "settings.title": "Qindaa'ina",
  "settings.subtitleParent":
    "Akkaawuntii maatii, beeksisaaleefi ijoollee walitti hidhaman bulchi.",
  "settings.subtitleTeacher":
    "Profaayilii barsiisaa, beeksisaaleefi ramaddiiwwan daree bulchi.",
  "settings.tab.profile": "Profaayilii",
  "settings.tab.notifications": "Beeksisaalee",
  "settings.tab.security": "Nageenya",
  "settings.tab.children": "Ijoollee Walitti Hidhamte",
  "settings.tab.assignments": "Ramaddiiwwan Barsiisuu",
  "settings.tab.preferences": "Filannoowwan",
  "settings.tab.account": "Akkaawuntii",

  "prefs.title": "Afaan & Naannoo",
  "prefs.description":
    "Akkaataa qabiyyeen portaalii kanarratti agarsiifamu jijjiiri.",
  "prefs.language": "Afaan",
  "prefs.timezone": "Sa'aatii Naannoo",
  "prefs.dateFormat": "Bifa Guyyaa",
};

export const TRANSLATIONS: Record<Language, Dict> = {
  en,
  am: { ...am, ...amExtra },
  om: { ...om, ...omExtra },
};
