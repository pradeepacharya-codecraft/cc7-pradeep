/**
 * @description Unit tests for async await promise task .
 */

import { describe, it, expect } from 'vitest';
import { getFileSize, getFileContents, getFileType } from '../promise3.ts';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filepath = fileURLToPath(import.meta.url);
const __dirpath = path.dirname(__filepath);

describe('getFileType', () => {
  it('should return FILE for a file', async () => {
    const result = await getFileType(__filepath);
    expect(result).toBe('File');
  });
});

describe('getFileType', () => {
  it('should return FILE for a file', async () => {
    const result = await getFileType(__dirpath);
    expect(result).toBe('Directory');
  });
});

describe('getFileContents', () => {
  it('should return folder contents', async () => {
    const result = await getFileContents(__dirpath);
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('getFileSize', () => {
  it('should return size for a file', async () => {
    const size = await getFileSize(__filepath);

    expect(typeof size).toBe('number');
    expect(size).toBeGreaterThan(0);
  });

  it('should return size for a directory', async () => {
    const size = await getFileSize(__dirpath);

    expect(typeof size).toBe('number');
    expect(size).toBeGreaterThan(0);
  });
});
