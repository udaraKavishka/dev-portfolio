export const SITE_URL = 'https://udaradev.me';
export const SITE_NAME = 'Udara Nalawansa Portfolio';
export const PERSON_NAME = 'Udara Nalawansa';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const defaultDescription =
  'Udara Nalawansa is a DevOps engineer in Sri Lanka focused on cloud infrastructure, Kubernetes, CI/CD automation, Terraform, Docker, AWS, and full stack engineering.';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
