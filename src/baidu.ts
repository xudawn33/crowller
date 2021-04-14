import cheerio from 'cheerio'//服务器端操作dom
import fs from 'fs'
import { Analyze } from './crowller'

export default class Dell implements Analyze {

  // 获取具体数据
  getHtmlInfo(html: string) {
  }

  // 处理数据文件
  generateJsonContent() {
    
  }

  public analyze(html: string, filePath: string) {
    return html
  }
}