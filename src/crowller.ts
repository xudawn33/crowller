import superagent from 'superagent'//轻量的Ajax API

import fs from 'fs'
import path from 'path'

import Dell from './dell'

export interface Analyze {
  analyze: (html: string, filePath: string) => string
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json')

  // 获取整个页面html
  private async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }

  // 写入数据
  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyzer.analyze(html, this.filePath)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyze) {
    this.initSpiderProcess()
  }
}

const url = 'http://www.dell-lee.com/'

// const analyzer = new Dell()
const analyzer = Dell.getInstance()
new Crowller(url, analyzer)
console.log(233)