import path from 'node:path';

const DEFAULT_OPTIONS = {
  alias: '@',
  srcDir: 'src',
  featureDepth: 2,
};

const toPosix = p => p.split(path.sep).join('/');

const isInside = (target, dir) =>
  target === dir || target.startsWith(dir + path.sep);

function featureRootOf(filePath, srcRoot, depth) {
  const rel = path.relative(srcRoot, filePath);
  if (rel.startsWith('..')) return null;
  const parts = rel.split(path.sep);
  return parts.length > depth
    ? path.join(srcRoot, ...parts.slice(0, depth))
    : null;
}

function toRelative(fromFile, target) {
  const rel = toPosix(path.relative(path.dirname(fromFile), target)) || '.';
  return rel.startsWith('.') ? rel : './' + rel;
}

function toAlias(srcRoot, target, alias) {
  const rel = toPosix(path.relative(srcRoot, target));
  return rel === '' ? alias : `${alias}/${rel}`;
}

export default {
  meta: {
    type: 'layout',
    docs: {
      description:
        'Use relative imports within the same feature folder; use the path alias across feature folders.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          alias: { type: 'string' },
          srcDir: { type: 'string' },
          featureDepth: { type: 'integer', minimum: 1 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useRelative:
        "Import '{{source}}' is inside the current feature folder '{{feature}}'. Use a relative path ('{{suggestion}}') instead.",
      useAlias:
        "Import '{{source}}' leaves the current feature folder '{{feature}}'. Use the alias path ('{{suggestion}}') instead.",
      useAliasNoFeature:
        "Relative parent import '{{source}}' is not allowed here. Use the alias path ('{{suggestion}}') instead.",
    },
  },

  create(context) {
    const options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };
    const cwd = context.cwd ?? context.getCwd();
    const srcRoot = path.resolve(cwd, options.srcDir);
    const filePath = context.filename ?? context.getFilename();

    if (!filePath || filePath === '<input>' || filePath === '<text>') return {};
    if (!isInside(filePath, srcRoot)) return {};

    const featureRoot = featureRootOf(filePath, srcRoot, options.featureDepth);
    const aliasPrefix = options.alias + '/';

    function resolve(raw) {
      if (raw === options.alias) return { target: srcRoot, kind: 'alias' };
      if (raw.startsWith(aliasPrefix))
        return { target: path.resolve(srcRoot, raw.slice(aliasPrefix.length)), kind: 'alias' };
      if (raw === '.' || raw === '..' || raw.startsWith('./') || raw.startsWith('../'))
        return { target: path.resolve(path.dirname(filePath), raw), kind: 'relative' };
      return null;
    }

    function report(node, messageId, suggestion, extra = {}) {
      context.report({
        node,
        messageId,
        data: { source: node.value, suggestion, ...extra },
        fix: fixer => fixer.replaceText(node, JSON.stringify(suggestion)),
      });
    }

    function checkSource(node) {
      if (!node || node.type !== 'Literal' || typeof node.value !== 'string') return;
      const resolved = resolve(node.value);
      if (!resolved) return;
      const { target, kind } = resolved;
      if (!isInside(target, srcRoot)) return;

      const feature = featureRoot && toPosix(path.relative(srcRoot, featureRoot));
      const inFeature = featureRoot && isInside(target, featureRoot);

      if (kind === 'alias') {
        if (inFeature) report(node, 'useRelative', toRelative(filePath, target), { feature });
        return;
      }

      if (featureRoot && !inFeature) {
        report(node, 'useAlias', toAlias(srcRoot, target, options.alias), { feature });
      }
      else if (!featureRoot && (node.value === '..' || node.value.startsWith('../'))) {
        report(node, 'useAliasNoFeature', toAlias(srcRoot, target, options.alias));
      }
    }

    const visit = node => checkSource(node.source);
    return {
      ImportDeclaration: visit,
      ImportExpression: visit,
      ExportAllDeclaration: visit,
      ExportNamedDeclaration: visit,
    };
  },
};
