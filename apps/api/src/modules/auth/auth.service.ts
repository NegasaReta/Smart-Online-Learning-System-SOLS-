// apps/api/src/modules/auth/auth.service.ts

export class AuthService {
    /**
     * Generates a summary of the authenticated session.
     * @param clerkAuthData Data attached by Samford-Zed's Clerk middleware
     */
    static async getSessionSummary(clerkAuthData: any) {
        // If there is no auth data, the user shouldn't be here (middleware should catch this, but it's good to be safe)
        if (!clerkAuthData || !clerkAuthData.userId) {
            throw new Error('Unauthorized');
        }

        // Return the session summary
        return {
            userId: clerkAuthData.userId,
            sessionId: clerkAuthData.sessionId,
            status: 'active',
            message: 'Valid Clerk session active'
        };
    }

    /**
     * Handles backend logout logic.
     * (Clerk mostly handles logout on the frontend, but if your backend 
     * ever sets custom cookies or cache, you would clear them here).
     */
    static async logout() {
        return {
            message: 'Logged out successfully. (Local backend cleanup complete)'
        };
    }
}