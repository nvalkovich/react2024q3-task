export default function useLocalStorage(key: string) {
  function setLocalStorageValue(searchQuery: string) {
    localStorage.setItem(key, searchQuery);
  }
  console.log('вызывают');

  return [localStorage.getItem(key) || '', setLocalStorageValue] as [
    string,
    (searchQuery: string) => void,
  ];
}
