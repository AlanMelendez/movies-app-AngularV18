export function extractErrors(object:any): string[] {
  const error = object.error.errors;
  let messages: string[] = [];

    for (const fieldName in error) {
      let field = fieldName;
      let messageErrors = error[fieldName].map((message: string) => `${field}: ${message}`);
      messages = messages.concat(messageErrors);
    }

  return messages;
}
