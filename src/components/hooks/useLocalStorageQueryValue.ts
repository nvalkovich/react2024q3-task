export default function useLocalStorageQueryValue() {
  const key = 'searchQuery';

  function setLocalStorageQueryValue(searchQuery: string) {
    localStorage.setItem(key, searchQuery);
  }

  return [localStorage.getItem(key) || '', setLocalStorageQueryValue] as [
    string,
    (searchQuery: string) => void,
  ];
}
