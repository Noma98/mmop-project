export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
    {
      title: 'StartDate',
      name: 'startDate',
      type: 'date',
    },
    {
      title: 'EndDate',
      name: 'endDate',
      type: 'date',
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
    {
      title: 'WebLink',
      name: 'webLink',
      type: 'string',
    },
    {
      title: 'StoreLink',
      name: 'storeLink',
      type: 'string',
    },
    {
      title: 'GithubLink',
      name: 'githubLink',
      type: 'string',
    },
    {
      title: 'Type',
      name: 'type',
      type: 'string',
    },
    {
      title: 'AuthorId',
      name: 'authorId',
      type: 'string',
    },
    {
      title: 'Achievements',
      name: 'achievements',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      thumbnail: 'images.0',
    },
    prepare(selection) {
      const {title, description, thumbnail} = selection
      return {
        title,
        subtitle: description,
        media: thumbnail,
      }
    },
  },
}
