export const SITE_URL = 'https://udaradev.me';
export const SITE_NAME = 'Udara Nalawansa Portfolio';
export const PERSON_NAME = 'Udara Nalawansa';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const defaultDescription =
  'Udara Nalawansa is an Intern Software Engineer at Xaventra in Sri Lanka focused on full stack engineering, cloud infrastructure, Kubernetes, CI/CD automation, Terraform, Docker, and AWS.';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
