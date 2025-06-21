// src/utils/caseConverter.ts
/**
 * Case conversion utilities
 * Convert between camelCase and snake_case naming conventions
 */

/**
 * Convert camelCase string to snake_case
 * Special handling for consecutive uppercase letters like "PP"
 * @example
 * camelToSnake('boardingDate') // 'boarding_date'
 * camelToSnake('earnedPP') // 'earned_pp'
 * camelToSnake('ppUnitPrice') // 'pp_unit_price'
 */
export function camelToSnake(str: string): string {
  // Step 1: Insert underscore between lowercase and uppercase
  let result = str.replace(/([a-z])([A-Z])/g, '$1_$2');

  // Step 2: Insert underscore between multiple uppercase letters and lowercase
  // This handles cases like "XMLParser" -> "XML_Parser"
  result = result.replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2');

  // Step 3: Convert to lowercase
  return result.toLowerCase();
}

/**
 * Convert snake_case string to camelCase
 * @example
 * snakeToCamel('boarding_date') // 'boardingDate'
 * snakeToCamel('earned_pp') // 'earnedPP'
 * snakeToCamel('pp_unit_price') // 'ppUnitPrice'
 */
export function snakeToCamel(str: string): string {
  // Special handling for known acronyms
  const acronyms = ['pp', 'api', 'url', 'id', 'ip'];

  return str.replace(/_([a-z]+)/g, (_, group) => {
    // Check if the group is a known acronym
    if (acronyms.includes(group.toLowerCase())) {
      return group.toUpperCase();
    }
    // Otherwise, just capitalize the first letter
    return group.charAt(0).toUpperCase() + group.slice(1).toLowerCase();
  });
}

/**
 * Alternative snakeToCamel without special acronym handling
 * Use this if you prefer consistent behavior
 */
export function snakeToCamelSimple(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Deep convert object keys from camelCase to snake_case
 */
export function objectCamelToSnake<T = any>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => objectCamelToSnake(item)) as any;
  }

  if (typeof obj === 'object') {
    const converted: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeKey = camelToSnake(key);
        converted[snakeKey] = objectCamelToSnake(obj[key]);
      }
    }

    return converted;
  }

  return obj;
}

/**
 * Deep convert object keys from snake_case to camelCase
 */
export function objectSnakeToCamel<T = any>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj as any;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => objectSnakeToCamel(item)) as any;
  }

  if (typeof obj === 'object') {
    const converted: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Use the simple version for consistent behavior
        const camelKey = snakeToCamelSimple(key);
        converted[camelKey] = objectSnakeToCamel(obj[key]);
      }
    }

    return converted;
  }

  return obj;
}

/**
 * Export additional utilities
 */
export function formDataCamelToSnake(formData: FormData): FormData {
  const newFormData = new FormData();

  formData.forEach((value, key) => {
    const snakeKey = camelToSnake(key);
    newFormData.append(snakeKey, value);
  });

  return newFormData;
}

export function arrayToSnakeCase<T = any>(array: any[]): T[] {
  return array.map(item => objectCamelToSnake(item));
}

export function arrayToCamelCase<T = any>(array: any[]): T[] {
  return array.map(item => objectSnakeToCamel(item));
}

export function toSnakeCase<T>(data: T): any {
  return objectCamelToSnake(data);
}

export function toCamelCase<T>(data: any): T {
  return objectSnakeToCamel(data);
}