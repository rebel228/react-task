const validExtensions = ['png', 'jpeg'];

export function isValidFileType(fileName: string) {
  const ext = fileName.split('.').pop();
  return ext ? validExtensions.indexOf(ext) > -1 : false;
}
