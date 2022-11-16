interface IImages {
  [key: string]: 'string';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function importAll(r: any) {
  const images: IImages = {};
  r.keys().forEach((item: string) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images: IImages = importAll(
  require.context('../assets', false, /\.(png|jpe?g|svg)$/)
);

export default images;
