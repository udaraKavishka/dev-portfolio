export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Udara Nalawansa",
    url: "https://udaradev.me",
    email: "hello@udaradev.me",
    image: "https://udaradev.me/profile.jpg",
    jobTitle: "DevOps Engineer",
    description: "DevOps Engineer and Full Stack Developer specializing in cloud infrastructure, CI/CD pipelines, Kubernetes, Docker, and MLOps",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Jaffna",
      sameAs: "https://www.jfn.ac.lk/"
    },
    sameAs: [
      "https://github.com/udaraKavishka",
      "https://www.linkedin.com/in/udaranalawansa/",
      "https://web.facebook.com/udara.nalawansa/",
      "https://instagram.com/_udara27"
    ],
    knowsAbout: [
      "DevOps",
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Terraform",
      "Ansible",
      "Jenkins",
      "Python",
      "Go",
      "React",
      "Next.js",
      "MLOps",
      "Infrastructure as Code",
      "Cloud Computing",
      "Microservices"
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Udara Nalawansa Portfolio",
    url: "https://udaradev.me",
    description: "Professional portfolio showcasing DevOps engineering projects, cloud infrastructure work, and software development",
    author: {
      "@type": "Person",
      name: "Udara Nalawansa"
    },
    inLanguage: "en-US"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProfilePageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Udara Nalawansa",
      alternateName: "Udara Kavishka Nalawansa",
      description: "DevOps Engineer and Full Stack Developer",
      image: "https://udaradev.me/profile.jpg",
      sameAs: [
        "https://github.com/udaraKavishka",
        "https://www.linkedin.com/in/udaranalawansa/"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type ArticleSchemaProps = {
  title: string;
  publishedAt: string;
  excerpt?: string;
  imageUrl?: string;
  tags?: string[];
  slug: string;
};

export function ArticleSchema({ title, publishedAt, excerpt, imageUrl, tags, slug }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt || title,
    datePublished: publishedAt,
    author: {
      "@type": "Person",
      name: "Udara Nalawansa",
      url: "https://udaradev.me"
    },
    publisher: {
      "@type": "Person",
      name: "Udara Nalawansa",
      url: "https://udaradev.me",
      logo: {
        "@type": "ImageObject",
        url: "https://udaradev.me/favicon.png"
      }
    },
    image: imageUrl || "https://udaradev.me/screenshot.png",
    url: `https://udaradev.me/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://udaradev.me/blog/${slug}`
    },
    keywords: tags?.join(", ") || "DevOps, Cloud Engineering, Software Development"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

