export default {
  title: 'Setting',
  name: 'setting',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'SubTitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Introduction',
      name: 'introduction',
      type: 'string',
    },
    {
      title: 'BgColors',
      name: 'bgColors',
      type: 'array',
      of: [
        {
          title: 'BgColor',
          name: 'bgColor',
          type: 'string',
        },
      ],
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      return selection
    },
  },
}
