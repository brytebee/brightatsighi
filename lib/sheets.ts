import { google } from "googleapis";

export interface TeamMember {
  email: string;
  role: string;
  status: string;
  rowIndex: number; // 1-based row number in sheet (including header); row 1 = header
}

function getAuth() {
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentialsJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON env var is not set.");
  }
  const credentials = JSON.parse(credentialsJson);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheetId(): string {
  const csvUrl = process.env.GOOGLE_SHEET_CSV_URL;
  
  // If we have a dedicated sheet ID, always prioritize it.
  const explicitId = process.env.GOOGLE_SHEET_ID;
  if (explicitId) return explicitId;

  if (!csvUrl) throw new Error("GOOGLE_SHEET_CSV_URL is not set.");
  
  // Try to extract from URL if it's a standard edit URL (NOT a published /e/ url)
  if (!csvUrl.includes("/d/e/")) {
    const editMatch = csvUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (editMatch) return editMatch[1];
  }

  throw new Error("Could not extract sheet ID. Please set GOOGLE_SHEET_ID env var.");
}

/** Read all team members from the Google Sheet */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getSheetId();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:C", // Email, Role, Status
  });

  const rows = res.data.values ?? [];
  if (rows.length <= 1) return []; // Only header or empty

  // rows[0] is the header row
  return rows.slice(1).map((row, index) => ({
    email: row[0]?.trim() ?? "",
    role: row[1]?.trim() ?? "",
    status: row[2]?.trim() ?? "Inactive",
    rowIndex: index + 2, // +2 because row 1 is header, and rows array is 0-indexed
  }));
}

/** Append a new team member row to the Google Sheet */
export async function addTeamMember(email: string, role: string): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getSheetId();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:C",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email.toLowerCase().trim(), role, "Active"]],
    },
  });
}

/** Update an existing team member's status (Active/Inactive) */
export async function updateTeamMemberStatus(
  rowIndex: number,
  status: "Active" | "Inactive"
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getSheetId();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!C${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[status]],
    },
  });
}

/** Delete a team member row by clearing its content */
export async function removeTeamMember(rowIndex: number): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getSheetId();

  // Clear the entire row
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `Sheet1!A${rowIndex}:C${rowIndex}`,
  });
}
