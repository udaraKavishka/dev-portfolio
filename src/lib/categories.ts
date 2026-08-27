export const CATEGORIES = [
    { slug: 'intern-diaries', label: 'intern diaries' },
    { slug: 'research-diaries', label: 'research diaries' },
    { slug: 'self-learn', label: 'self-learn' },
    { slug: 'devops-tools', label: 'devops & tools' },
] as const;

// Posts in these categories are day-to-day notes: they stay reachable under
// their own filter, but only the pinned ones surface in the "all" list.
export const ARCHIVED_CATEGORIES = new Set<string>(['intern-diaries']);
