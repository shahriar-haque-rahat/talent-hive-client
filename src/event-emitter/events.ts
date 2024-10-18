export const createCompanyFollowedEvent = (companyId) =>
    new CustomEvent('companyFollowed', {
        detail: { companyId },
    });

export const createUserConnectionRequestedEvent = (userId) =>
    new CustomEvent('userConnectionRequested', {
        detail: { userId },
    });