async function createDemoBoard() {
  var boards = await storageService.query(STORAGE_KEY)

  if (!boards || boards.length === 0) {
    const board1 = {
      _id: 'b101',
      title: 'Sombrello project',
      style: {
        background:
          'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80',
        backgroundColor: '#f3f3f3',
        thumbnail:
          'https://images.unsplash.com/photo-1532703108233-69111d554cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjU5OTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQwMzQ0ODI&ixlib=rb-1.2.1&q=80&w=400',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Kfir Shaked',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'Ofek Rashti',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
        {
          _id: 'u103',
          fullname: 'Omer Hassin',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
        },
      ],
      groups: [
        {
          title: 'Backlog-Server',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Create backend services',
              id: 't101',
              members: [
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: [],
              comments: [],
            },
            {
              title: 'Routing Directory',
              id: 't102',
              members: [
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['https://unsplash.com/photos/6hLQxM3RDQ0'],
              comments: [],
            },
            {
              title: 'Socket Implementation',
              id: 't103',
              members: [],
              style: { coverColor: '#ef7564' },
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l105',
                  title: 'Label 5',
                  color: '#9f8fef',
                  //purple
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'Database Implementation',
              id: 't104',
              members: [],
              style: { coverColor: '#ef7564' },
              desc: '',
              dueDate: '',
              labels: [],
              attachments: [],
              comments: [],
            },
            {
              title: 'data model approval',
              id: 't105',
              members: [
                {
                  _id: 'u102',
                  fullname: 'Ofek Rashti',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: 1672608000000,
              labels: [],
              attachments: [],
              comments: [],
            },
            {
              title: 'Create a server with express',
              id: 't106',
              members: [],
              style: {},
              desc: '',
              dueDate: 1672608000000,
              labels: [],
              attachments: ['../assets/img/all assets/asset 6.jpeg'],
              comments: [],
            },
          ],
          style: {},
        },
        {
          title: 'Backlog-client',
          id: 'g102',
          tasks: [
            {
              title: 'Planning the components tree',
              id: 't201',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Kfir Shaked',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                },
                {
                  _id: 'u102',
                  fullname: 'Ofek Rashti',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                },
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: 1706668800000,
              labels: [
                {
                  id: 'l101',
                  title: 'Label 1',
                  color: '#4bce97',
                  //green
                },
                {
                  id: 'l102',
                  title: 'Label 2',
                  color: '#e2b203',
                  //yellow
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'Add TaskDetails',
              id: 't202',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l101',
                  title: 'Label 1',
                  color: '#4bce97',
                  //green
                },
                {
                  id: 'l102',
                  title: 'Label 2',
                  color: '#e2b203',
                  //yellow
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'Adding npm libraries',
              id: 't203',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l101',
                  title: 'Label 1',
                  color: '#4bce97',
                  //green
                },
                {
                  id: 'l102',
                  title: 'Label 2',
                  color: '#e2b203',
                  //yellow
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
                {
                  id: 'l106',
                  title: 'Label 6',
                  color: '#579dff',
                  //blue
                },
              ],
              attachments: ['../assets/img/all assets/asset 7.png'],
              comments: [],
            },
            {
              title: 'Build basin template',
              id: 't204',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l103',
                  title: 'Label 3',
                  color: '#faa53d',
                  //orange
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'implement Sass',
              id: 't205',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['../assets/img/all assets/asset 8.jpeg'],
              comments: [],
            },
            {
              title: '-',
              id: 't206',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['../assets/img/all assets/asset 9.jpeg'],
              comments: [],
            },
          ],
          style: {},
        },
        {
          title: 'In development',
          id: 'g103',
          tasks: [
            {
              title: 'Sanity test for new component',
              id: 't301',
              members: [
                {
                  _id: 'u102',
                  fullname: 'Ofek Rashti',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                },
              ],
              style: { coverColor: '#4bce97' },
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l102',
                  title: 'Label 2',
                  color: '#e2b203',
                  //yellow
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'functional testing for app header',
              id: 't302',
              members: [],
              style: { coverColor: '#e2b203' },
              desc: 'we need to add descriptions',
              dueDate: 1685760000000,
              labels: [
                {
                  id: 'l102',
                  title: 'Label 2',
                  color: '#e2b203',
                  //yellow
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'Connecting to PWA',
              id: 't303',
              members: [],
              style: {},
              desc: '',
              dueDate: 1685760000000,
              labels: [],
              attachments: ['../assets/img/all assets/asset 10.jpeg'],
              comments: [],
            },
          ],
          style: {},
        },
        {
          title: 'Done',
          id: 'g104',
          tasks: [
            {
              title: 'CSS variables',
              id: 't401',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Kfir Shaked',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                },
              ],
              style: { coverColor: '#579dff' },
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l101',
                  title: 'Label 1',
                  color: '#4bce97',
                  //green
                },
                {
                  id: 'l103',
                  title: 'Label 3',
                  color: '#faa53d',
                  //orange
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'making functions and mixins',
              id: 't402',
              members: [
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: [],
              comments: [],
            },
            {
              title: 'CSS directory',
              id: '403',
              members: [],
              style: {},
              desc: '',
              dueDate: 1693440000000,
              labels: [],
              attachments: [],
              comments: [],
            },
            {
              title: 'Checking bugs',
              id: '404',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['../assets/img/all assets/asset 12.jpeg'],
              comments: [],
            },
            {
              title: 'Creating node js server',
              id: '405',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Kfir Shaked',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                },
                {
                  _id: 'u102',
                  fullname: 'Ofek Rashti',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                },
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
                {
                  id: 'l106',
                  title: 'Label 6',
                  color: '#579dff',
                  //blue
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: '',
              id: '406',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['../assets/img/all assets/asset 7.png'],
              comments: [],
            },
            {
              title: 'Enter UserName',
              id: '407',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [],
              attachments: ['../assets/img/all assets/asset 11.jpeg'],
              comments: [],
            },
          ],
          style: {},
        },
        {
          title: 'QA',
          id: 'g105',
          tasks: [
            {
              title: 'Meeting with head manager for planning the code progress',
              id: 't501',
              members: [],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l103',
                  title: 'Label 3',
                  color: '#faa53d',
                  //orange
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'End day code review with all members',
              id: 't502',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Kfir Shaked',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                },
                {
                  _id: 'u102',
                  fullname: 'Ofek Rashti',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
                },
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: { coverColor: '#579dff' },
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l103',
                  title: 'Label 3',
                  color: '#faa53d',
                  //orange
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: [],
              comments: [],
            },
            {
              title: 'Advices from head manager',
              id: 't503',
              members: [],
              style: { coverColor: '#579dff' },
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l103',
                  title: 'Label 3',
                  color: '#faa53d',
                  //orange
                },
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
              ],
              attachments: ['../assets/img/all assets/asset 13.jpeg'],
              comments: [],
            },
            {
              title: 'test this code snippet',
              id: 't504',
              members: [
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: { coverColor: '#faa53d' },
              desc: '',
              dueDate: 1691049600000,
              labels: [
                {
                  id: 'l105',
                  title: 'Label 5',
                  color: '#9f8fef',
                  //purple
                },
              ],
              attachments: [],
              comments: [],
            },
          ],
          style: {},
        },
        {
          title: 'Ready for production',
          id: 'g106',
          tasks: [
            {
              title: 'Creating data base with mongo',
              id: 't601',
              members: [
                {
                  _id: 'u101',
                  fullname: 'Kfir Shaked',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
                },
                {
                  _id: 'u103',
                  fullname: 'Omer Hassin',
                  imgUrl:
                    'https://trello-members.s3.amazonaws.com/64770c06c6132f81928b9788/efeedf2ef41cde391f77cd8dbeca21e8/original.png',
                },
              ],
              style: {},
              desc: '',
              dueDate: '',
              labels: [
                {
                  id: 'l104',
                  title: 'Label 4',
                  color: '#f87462',
                  //red
                },
                {
                  id: 'l106',
                  title: 'Label 6',
                  color: '#579dff',
                  //blue
                },
              ],
              attachments: ['../assets/img/all assets/asset 14.jpeg'],
              comments: [],
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Replace Logo',
          },
        },
      ],
      labels: [
        {
          id: 'l101',
          title: 'Label 1',
          color: '#4bce97',
          //green
        },
        {
          id: 'l102',
          title: 'Label 2',
          color: '#e2b203',
          //yellow
        },
        {
          id: 'l103',
          title: 'Label 3',
          color: '#faa53d',
          //orange
        },
        {
          id: 'l104',
          title: 'Label 4',
          color: '#f87462',
          //red
        },
        {
          id: 'l105',
          title: 'Label 5',
          color: '#9f8fef',
          //purple
        },
        {
          id: 'l106',
          title: 'Label 6',
          color: '#579dff',
          //blue
        },
      ],
    }
    const board2 = {
      _id: 'b103',
      title: 'Design project',
      style: {
        background:
          'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        backgroundColor: '#edaabc',
        thumbnail:
          'https://images.unsplash.com/photo-1685556636541-b141d0a09746?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
      ],
      groups: [
        {
          title: 'Group 1',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Design logo',
              id: 'c101',
              style: {},
            },
            {
              title: 'Create mockups',
              id: 'c102',
              style: {},
            },
            {
              title: 'Finalize design',
              id: 'c103',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 2',
          id: 'g102',
          tasks: [
            {
              title: 'Implement changes',
              id: 'c104',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Review feedback',
              id: 'c105',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Refine design',
              id: 'c106',
              status: 'in-progress',
              style: {},
            },
          ],
          style: {},
        },
        {
          title: 'Group 3',
          id: 'g103',
          tasks: [
            {
              title: 'Get client approval',
              id: 'c107',
              status: 'done',
              style: {},
            },
            {
              title: 'Prepare assets',
              id: 'c108',
              status: 'done',
              style: {},
            },
            {
              title: 'Deliver final files',
              id: 'c109',
              status: 'done',
              style: {},
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Design Logo',
          },
        },
      ],
      labels: [
        {
          class: 'light-red-opacity',
          title: '',
          color: 'light-red',
          id: 'sCCYjO',
        },
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
    }

    const board3 = {
      _id: 'b102',
      title: 'Design project',
      style: {
        background:
          'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        backgroundColor: '#eef3ef',
        thumbnail:
          'https://images.unsplash.com/photo-1684265915928-ddcfee1df6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      isStarred: false,
      members: [
        {
          _id: 'u101',
          fullname: 'Tal Tarablus',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/647734a4a5064966da66d1ff/fe934ab149781128aee1cf07052df42a/original.png',
        },
        {
          _id: 'u102',
          fullname: 'John Smith',
          imgUrl:
            'https://trello-members.s3.amazonaws.com/6477341a7c73ea6a6522a0bf/e4ccab819753313eb1cad1c7d6158cd7/original.png',
        },
      ],
      groups: [
        {
          title: 'Group 1',
          id: 'g101',
          archivedAt: 1589983468418,
          tasks: [
            {
              title: 'Design logo',
              id: 'c101',
              title: 'Replace logo',
            },
            {
              title: 'Create mockups',
              id: 'c102',
              style: {},
              labels: ['l101', 'l102'],
              description: 'This task is here to remind me to add samples',
            },
            {
              title: 'Finalize design',
              id: 'c103',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          title: 'Group 2',
          id: 'g102',
          tasks: [
            {
              title: 'Implement changes',
              id: 'c104',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Review feedback',
              id: 'c105',
              status: 'in-progress',
              style: {},
            },
            {
              title: 'Refine design',
              id: 'c106',
              status: 'in-progress',
              style: {},
            },
            {
              id: 'c111',
              title: 'Complete task 1',
            },
          ],
          style: {},
        },
        {
          title: 'Group 3',
          id: 'g103',
          tasks: [
            {
              title: 'Get client approval',
              id: 'c107',
              status: 'done',
              style: {},
            },
            {
              title: 'Prepare assets',
              id: 'c108',
              status: 'done',
              style: {},
            },
            {
              title: 'Deliver final files',
              id: 'c109',
              status: 'done',
              style: {},
            },
          ],
          style: {},
        },
      ],
      activities: [
        {
          id: 'a101',
          txt: 'Changed Color',
          createdAt: 154514,
          byMember: {
            fullname: 'Abi Abambi',
            username: 'Abi Abambi',
            imgUrl: 'http://some-img',
            _id: 'u101',
          },
          task: {
            id: 'c101',
            title: 'Design Logo',
          },
        },
      ],
      labels: [
        {
          class: 'light-red-opacity',
          title: '',
          color: 'light-red',
          id: 'sCCYjO',
        },
        {
          id: 'l101',
          title: 'Done',
          color: '#61bd4f',
        },
        {
          id: 'l102',
          title: 'Progress',
          color: '#61bd33',
        },
      ],
    }

    await storageService.post(STORAGE_KEY, board1)
    await storageService.post(STORAGE_KEY, board2)
    await storageService.post(STORAGE_KEY, board3)
    // storageService.post(STORAGE_KEY, board);
  }
}
