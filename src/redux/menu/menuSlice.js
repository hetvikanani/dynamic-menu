import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMenus: [
    {
      key: 'first',

      children: [
        {
          key: 'pizza',
          label: 'Pizza',
        },
        {
          key: 'burger',
          label: 'Burger',
        },
      ],
      label: 'Food Item',
    },
    {
      key: 'second',
      children: [
        {
          key: 'usa',
          label: 'USA',
        },
        {
          key: 'pakistan',
          label: 'Pakistan',
        },
        {
          key: 'india',
          label: 'India',
          children: [
            {
              key: '7',
              label: 'Gujarat',
              children: [
                {
                  key: '70',
                  label: 'Rajkot',
                },
                {
                  key: '80',
                  label: 'Ahmedabad',
                  children: [
                    {
                      key: '780',
                      label: 'Sg road',
                    },
                    {
                      key: '880',
                      label: 'cg road',
                    },
                  ],
                },
              ],
            },
            {
              key: '81231',
              label: 'Maharastra',
            },
          ],
        },
      ],
      label: 'Country State City',
    },
    {
      key: 'sub4',
      children: [
        {
          key: '9',
          label: 'About us',
        },
        {
          key: '10',
          label: 'Contact us',
        },
        {
          key: '11',
          label: 'Home page',
        },
        {
          key: '12',
          label: 'Settings',
        },
      ],
      label: 'Web pages',
    },
  ],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateMenu(state, action) {
      const { label, parentKey } = action.payload;

      const newMenuItem = {
        key: Date.now().toString(),
        label: label,
      };

      const findParentMenuItem = (items, key) => {
        for (const item of items) {
          if (item.key === key) {
            return item;
          }
          if (item.children) {
            const foundItem = findParentMenuItem(item.children, key);
            if (foundItem) {
              return foundItem;
            }
          }
        }
        return null;
      };

      if (parentKey) {
        const parentItem = findParentMenuItem(state.allMenus, parentKey);
        if (parentItem) {
          parentItem.children = parentItem.children || [];
          parentItem.children.push(newMenuItem);
        }
      } else {
        state.allMenus.push(newMenuItem);
      }
      // console.log(updatedMenuItems);
      // return { allMenus: { ...updatedMenuItems } };
    },
  },
});

export const { updateMenu } = menuSlice.actions;

export default menuSlice.reducer;
