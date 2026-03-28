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
  modifiedAt?: string;
  excerpt?: string;
  imageUrl?: string;
  tags?: string[];
  slug: string;
};

export function ArticleSchema({ title, publishedAt, modifiedAt, excerpt, imageUrl, tags, slug }: ArticleSchemaProps) {
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
    keywords: tags?.join(", ") || "DevOps, Cloud Engineering, Software Development",
    dateModified: modifiedAt || publishedAt,
  };
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
  // JSON.stringify with unicode escaping for < prevents </script> injection
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export function ProjectsSchema({ projects }: { projects: ProjectItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Projects by Udara Nalawansa",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.title,
        description: project.description,
        programmingLanguage: project.techStack,
        codeRepository: project.githubUrl,
        ...(project.liveUrl && { url: project.liveUrl }),
        author: {
          "@type": "Person",
          name: "Udara Nalawansa",
          url: "https://udaradev.me"
        }
      }
    }))
  };
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export function BlogListingSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://udaradev.me/blog",
    name: "DevOps & Cloud Engineering Blog",
    description: "Technical articles about DevOps, cloud infrastructure, Kubernetes, Docker, CI/CD, and MLOps by Udara Nalawansa",
    url: "https://udaradev.me/blog",
    author: {
      "@type": "Person",
      name: "Udara Nalawansa",
      url: "https://udaradev.me"
    },
    isPartOf: {
      "@type": "WebSite",
      url: "https://udaradev.me"
    }
  };
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
