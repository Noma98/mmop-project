export default {
  title: 'Member',
  name: 'member',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'PhoneNum',
      name: 'phoneNum',
      type: 'string',
    },
    {
      title: 'Profile',
      name: 'profile',
      type: 'image',
    },
    {
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
    },
    {
      title: 'Setting',
      name: 'setting',
      type: 'reference',
      to: [{type: 'setting'}],
    },
    {
      title: 'Skills',
      name: 'skills',
      type: 'array',
      of: [
        {
          title: 'Skill',
          name: 'skill',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'username',
      media: 'profile',
      text: 'introduction',
    },
    prepare(selection) {
      const {title, media, text} = selection
      return {
        title,
        media,
        subtitle: text,
      }
    },
  },
}
