// Fallback type declaration for nodemailer.
// This ensures TypeScript can always resolve the module even when
// @types/nodemailer resolution fails (e.g. in Vercel's strict build env).
// The @types/nodemailer package in dependencies provides the full types;
// this file acts as a safety net.
declare module "nodemailer";
