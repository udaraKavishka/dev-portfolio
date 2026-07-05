import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(120),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Optional search result title. Keep it concise and specific.',
      validation: Rule => Rule.max(60),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary used on blog cards, metadata, and structured data.',
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Optional meta description. Falls back to the excerpt.',
      validation: Rule => Rule.max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Describe the image for accessibility and image search.',
          validation: Rule => Rule.required().max(140),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      description: 'e.g., 5 min read',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: Rule => Rule.unique().max(8),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {
        ...selection,
        subtitle: author ? `by ${author}` : '',
      }
    },
  },
})
