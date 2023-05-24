interface ConvertCallback {
  (key: string, value: string): { key: string; value: string };
}

export default abstract class TableDataGateway {
  protected toSnakeCaseObject(obj: any): any {
    return this.convertObject(obj, (key, value) => ({ key: this.toSnakeCase(key), value }));
  }
  protected toCamelCaseObject(obj: any): any {
    return this.convertObject(obj, (key, value) => ({ key: this.toCamel(key), value }));
  }
  protected toInsertObject(obj: any): any {
    return {
      ...this.toSnakeCaseObject(obj),
      created_at: new Date().toISOString(),
    };
  }
  protected toUpdateObject(obj: any): any {
    return {
      ...this.toSnakeCaseObject(obj),
      modified_at: new Date().toISOString(),
    };
  }
  protected toTableDataObject<T>(row: any): T {
    delete row.created_at;
    delete row.modified_at;
    return this.toCamelCaseObject(row) as T;
  }

  private convertObject(obj: any, callback: ConvertCallback): any {
    const keys = Object.keys(obj);
    const result: any = {};

    keys.forEach((k) => {
      const { key, value } = callback(k, obj[k]);
      result[key] = this.cast(this.nullSafety(value));
    });

    return result;
  }
  private toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  private toCamel(str: string): string {
    return str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
  }
  private nullSafety(value?: any): undefined {
    if (value === null) return undefined;
    if (value === undefined) return undefined;
    return value;
  }
  private cast(value?: any): any {
    if (typeof value === "string" && !isNaN(value as any)) {
      if (value.trim().length === 0) return value.trim();
      if (value.indexOf(".") === -1) return parseInt(value);
      return parseFloat(value);
    }
    return value;
  }
}
