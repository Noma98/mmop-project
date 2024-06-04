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
      type: 'object',
      fields: [
        {
          name: 'left',
          title: 'Left',
          type: 'string',
        },
        {
          name: 'right',
          title: 'Right',
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
