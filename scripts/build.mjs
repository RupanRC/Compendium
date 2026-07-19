import { rmSync, cpSync } from 'node:fs'

rmSync('dist', { recursive: true, force: true })
cpSync('site', 'dist', { recursive: true })
// keep the old /Rupan_Resume_Jul_2026.pdf URL alive (linked from resume + README)
cpSync('site/assets/Rupan_Resume_Jul_2026.pdf', 'dist/Rupan_Resume_Jul_2026.pdf')
