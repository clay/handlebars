'use strict';
/**
 * The server-side `read` helper: a file's contents, for inlining icons, logos and small scripts or styles in the HTML.
 *
 * Reading them from disk on every render was a large share of render time, so contents are cached by resolved path.
 * A cached file is trusted for REVALIDATE_MS; after that its size and modified time are checked (a cheap stat) and it
 * is read again only if either changed. In production nothing changes while the server runs; in development an
 * edited file shows up within a second. A file that can't be read is never cached: every call fails, and is logged
 * by the caller, as before.
 *
 * CLAYHANDLEBARS_READ_CACHE=false reads from disk on every call.
 */
const fs = require('fs'),
  path = require('path'),
  REVALIDATE_MS = 1000,
  MAX_ENTRIES = 5000,
  cache = new Map();

/**
 * @param {string} file
 * @returns {?fs.Stats} the file's stats, or null if there is no such file
 */
function statOrNull(file) {
  try {
    return fs.statSync(file);
  } catch (e) {
    return null;
  }
}

/**
 * The cached contents of a file, if they're still current.
 * @param {string} key resolved path
 * @param {number} now
 * @returns {string|undefined}
 */
function fresh(key, now) {
  const hit = cache.get(key);

  if (!hit) {
    return undefined;
  }

  if (now - hit.checked < REVALIDATE_MS) {
    return hit.contents;
  }

  const stat = statOrNull(key);

  if (stat && stat.mtimeMs === hit.mtimeMs && stat.size === hit.size) {
    hit.checked = now;

    return hit.contents;
  }

  cache.delete(key); // changed or gone: the caller reads it again (and fails like before if it's gone)

  return undefined;
}

/**
 * @param {string} filename as passed to the helper (relative to the working directory)
 * @returns {string} the file's contents, utf-8
 * @throws whatever fs.readFileSync throws for this filename
 */
function read(filename) {
  const useCache = process.env.CLAYHANDLEBARS_READ_CACHE !== 'false',
    key = path.resolve(filename),
    now = Date.now(),
    cached = useCache ? fresh(key, now) : undefined;
  if (cached !== undefined) {
    return cached;
  }

  // read with the filename exactly as given, so errors (and their messages) are unchanged
  const contents = fs.readFileSync(filename, 'utf-8');

  if (useCache) {
    const stat = statOrNull(key);

    if (stat) {
      if (cache.size >= MAX_ENTRIES) {
        cache.delete(cache.keys().next().value); // oldest first
      }

      cache.set(key, { contents, mtimeMs: stat.mtimeMs, size: stat.size, checked: now });
    }
  }

  return contents;
}

read.clear = () => cache.clear();
read.size = () => cache.size;
read.REVALIDATE_MS = REVALIDATE_MS;
read.MAX_ENTRIES = MAX_ENTRIES;

module.exports = read;
