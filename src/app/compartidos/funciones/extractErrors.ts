export function extractErrors(object:any): string[] {
  const error = object.error.errors;
  let messages: string[] = [];

  if (error) {
    for (const fieldName in error) {
      let field = fieldName;
      let messageErrors = error[field].map((message: string) => {
        `${field}: ${message}`;
      });
      messages = messages.concat(messageErrors);
    }
  }
  return messages;
}
