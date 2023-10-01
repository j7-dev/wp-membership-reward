export const wpResources = [
  {
    name: 'posts',
    list: '/posts',
    create: '/posts/create',
    edit: '/posts/edit/:id',
    show: '/posts/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    name: 'member_lv',
    list: '/member_lv',
    create: '/member_lv/create',
    edit: '/member_lv/edit/:id',
    show: '/member_lv/show/:id',
    meta: {
      canDelete: true,
    },
  },
  {
    name: 'media',
    list: '/media',
    create: '/media/create',
    edit: '/media/edit/:id',
    show: '/media/show/:id',
    meta: {
      canDelete: true,
    },
  },
]
