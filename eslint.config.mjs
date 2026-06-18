import next from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...next,
  {
    rules: {
      '@next/next/no-img-element': 'error',
    },
  },
]

export default eslintConfig
