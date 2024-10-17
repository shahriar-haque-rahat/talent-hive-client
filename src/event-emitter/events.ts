export const createCompanyFollowedEvent = (companyId) =>
    new CustomEvent('companyFollowed', {
        detail: { companyId },
    });