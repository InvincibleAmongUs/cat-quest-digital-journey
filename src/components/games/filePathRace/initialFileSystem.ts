
import { FolderItemType } from './FolderItem';

export const initialFileSystem: FolderItemType = {
  name: 'Root',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'Documents',
      type: 'folder',
      path: '/Documents',
      children: [
        { name: 'School', type: 'folder', path: '/Documents/School' },
        { name: 'Personal', type: 'folder', path: '/Documents/Personal' },
      ],
    },
    { name: 'Downloads', type: 'folder', path: '/Downloads' },
    { name: 'ImportantFile.txt', type: 'file', path: '/ImportantFile.txt' },
  ],
};
