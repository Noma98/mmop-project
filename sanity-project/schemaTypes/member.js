export default {
  title: 'Member',
  name: 'member',
  type: 'document',
  fields: [
    {
      title: 'UserId',
      name: 'userId',
      type: 'string',
    },
    {
      title: 'UserName',
      name: 'userName',
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
      validation: (Rule) => Rule.optional(),
    },
    {
      title: 'GoogleProfile',
      name: 'googleProfile',
      type: 'string',
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
      validation: (Rule) => Rule.unique(),
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
      title: 'userId',
      subtitle: 'email',
    },
    prepare(selection) {
      return selection
    },
  },
}
