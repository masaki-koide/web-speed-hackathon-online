import cp from 'child_process'
import mkdirp from 'mkdirp'
import puppeteer from 'puppeteer'

const pages = {
  top: '/',
  blog: '/b0000',
  entry: '/b0000/entry/e0000',
  404: '/hoge/404'
}

async function capture() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  
  const promises = Object.keys(pages).map(async pageKey => {
    const page = await browser.newPage()
    await page.goto(`http://localhost:${process.env.PORT || 3000}${pages[pageKey]}`, { waitUntil: 'networkidle0' })
    await page.screenshot({ path: `screenshot/${pageKey}.png`, fullPage: true })
    await page.close()
  })

  await Promise.all(promises)
  await browser.close()
}

async function main() {
  let childProcess

  try {
    mkdirp.sync('screenshot')
    childProcess = cp.spawn('npm run serve', [], { shell: true })
    await new Promise(res => setTimeout(() => res(), 5000))
    await capture()
  } catch (error) {
    console.error(error)
  } finally {
    if (childProcess) {
      childProcess.kill('SIGINT')
    }
  }
}

try {
  await main()
} catch {
  // processのkillによるエラーは握り潰す
} finally {
  process.exit(0) // 明示的に呼ばないとCI上で終了しないため
}
