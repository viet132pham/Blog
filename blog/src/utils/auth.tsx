const users = [
  { username: 'test', password: 'test' },
  { username: 'test1', password: 'test1' }, 
  { username: 'test2', password: 'test2' }, 
];

export function authenticate(username: string, password: string): boolean {
  const user = users.find((user) => user.username === username);

  if (!user || user.password !== password) {
    return false;
  }
  
  localStorage.setItem('user', user.username);

  return true;
}