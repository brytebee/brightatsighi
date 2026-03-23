import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GoogleProvider from "next-auth/providers/google";

// Helper to fetch and parse the Google Sheet CSV
async function getRoleFromSheet(email: string): Promise<string | null> {
  const csvUrl = process.env.GOOGLE_SHEET_CSV_URL;
  if (!csvUrl) {
    console.warn("GOOGLE_SHEET_CSV_URL is not set. Denying access.");
    return null;
  }
  
  try {
    const response = await fetch(csvUrl, { next: { revalidate: 60 } }); // Cache for 60 seconds
    if (!response.ok) {
      console.error("Failed to fetch Google Sheet CSV.", response.status);
      return null;
    }
    const csvText = await response.text();
    // Assuming CSV headers: Email, Role, Status
    // Expected at least 3 columns
    const lines = csvText.split('\n');
    
    for (let i = 1; i < lines.length; i++) { // Skip header row
      const line = lines[i].trim();
      if (!line) continue;
      
      const columns = line.split(',');
      if (columns.length >= 3) {
        const sheetEmail = columns[0].trim().toLowerCase();
        const sheetRole = columns[1].trim();
        const sheetStatus = columns[2].trim().toLowerCase();
        
        if (sheetEmail === email.toLowerCase() && sheetStatus === 'active') {
          return sheetRole;
        }
      }
    }
    console.warn(`Email ${email} not found in sheet or not active.`);
    return null; // Not found or not active
  } catch (error) {
    console.error("Error fetching Google Sheet CSV:", error);
    return null;
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // Include existing callbacks from auth.config.ts
    async signIn({ user }) {
      if (!user.email) return false;
      const role = await getRoleFromSheet(user.email);
      if (role) {
        // Tag user with role for the JWT
        (user as any).role = role;
        return true;
      }
      return false; // Return false to deny login
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  }
});
