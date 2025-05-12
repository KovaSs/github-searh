type DefaultValueType = string | number | boolean;

interface OptionSettings {
  type: 'string' | 'number' | 'boolean';
  defaultValue?: DefaultValueType;
}

export interface Options {
  [key: string]: OptionSettings;
}

function transformValueToCorrectType(
	value: string,
	type: 'string' | 'number' | 'boolean',
): string | number | boolean {
	const types = {
		boolean: value === 'true',
		number: Number(value),
		string: value,
	};
	return types[type];
}

/**
 * Функция получения search параметров из строки запроса в URL
 * @param params
 */
export function getQueryParams<T extends Record<string, DefaultValueType>>(params: Options): T {
  const searchParams = new URLSearchParams(window.location.search);

	return Object.entries(params).reduce((acc: T, [key, options]) => {
		const value = searchParams.get(key);

		if (value) {
			acc[key as keyof T] = transformValueToCorrectType(value, options.type) as T[keyof T];
		} else if (options.defaultValue) {
			acc[key as keyof T] = options.defaultValue as T[keyof T];
		}

		return acc;
	}, {} as T);
}
