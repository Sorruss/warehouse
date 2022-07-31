export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: 'light',
  properties: {
    '--foreground-1': '#2d2c32',
    '--foreground-2': '#F9F5EB',
    '--foreground-3': '#11101d',
    '--background': '#f5f4f0',
    '--text-color': '#000',
    '--text-color-hover': 'lightslategrey',
  },
};

export const dark: Theme = {
  name: 'dark',
  properties: {
    '--foreground-1': '#2d2c32',
    '--foreground-2': '#1d1b31',
    '--foreground-3': '#11101d',
    '--background': '#222',
    '--text-color': '#fff',
    '--text-color-hover': 'lightgray',
  },
};
