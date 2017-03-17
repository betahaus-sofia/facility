export function get<T extends {}>(propertyName: keyof T) {
  return (obj: T) => obj[propertyName];
}

export function groupBy<T>(propertyName: keyof T) {
  const valueOfProperty = get<T>(propertyName);

  return (items: T[]) => {
    const result: Record<string, T[]> = {};
    items.forEach((item) => {
      const value: any = valueOfProperty(item);
      if (!result[value]) {
        result[value] = <T[]>[];
      }
      result[value].push(item);
    });

    return result;
  };
}

export function keys<T extends {}>(obj: T) {
  return Object.keys(obj);
}
