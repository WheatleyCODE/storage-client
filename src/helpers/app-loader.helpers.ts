export const setAppLoader = (boolean: boolean) => {
  const loader = document.querySelector('#app-loader') as HTMLDivElement;
  loader.style.display = boolean ? 'flex' : 'none';
};
