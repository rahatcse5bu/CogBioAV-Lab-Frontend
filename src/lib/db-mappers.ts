type AnyRecord = Record<string, any>;

const RESERVED_FIELDS = new Set(['_id', 'id', 'createdAt', 'updatedAt', '__v']);

export function toClientDoc<T extends AnyRecord>(record: T): T & { _id: string } {
  return {
    ...record,
    _id: String(record.id),
  };
}

export function normalizeArray(value: unknown): any[] {
  return Array.isArray(value) ? value : [];
}

export function sanitizePrismaPayload<T extends AnyRecord>(
  payload: T,
  extraReserved: string[] = []
): AnyRecord {
  const reserved = new Set([...RESERVED_FIELDS, ...extraReserved]);
  const result: AnyRecord = {};

  Object.entries(payload || {}).forEach(([key, value]) => {
    if (reserved.has(key)) return;
    result[key] = value;
  });

  return result;
}

export function parseOptionalDate(value: unknown): Date | null | undefined {
  if (value === undefined) return undefined;
  if (value === null || value === '') return null;

  if (value instanceof Date) return value;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
      ? `${trimmed}T00:00:00.000Z`
      : trimmed;
    const parsed = new Date(normalized);
    if (!Number.isNaN(parsed.getTime())) return parsed;
    return null;
  }

  return null;
}
