const fs = require('fs')
const path = require('path')
// The previous lines should trigger a `A `require()` style import is forbidden.` warning/error. It should be ok.

const outputPath = path.join(process.cwd(), 'types', 'strapi-types.ts')

async function main() {
  const res = await fetch('http://localhost:1337/api/get-types')
  const { content } = await res.json()

  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(outputPath, content || '', 'utf-8')
  console.log(`✅ Types écrits dans ${outputPath}`)
}

main().catch(console.error)
