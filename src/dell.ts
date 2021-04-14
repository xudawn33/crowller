import cheerio from 'cheerio'//服务器端操作dom
import fs from 'fs'
import { Analyze } from './crowller'//引入接口

interface Arr {
  title: string,
  img: string
}

interface Course {
  time: number,
  list: Arr[]
}

interface Content{
  [propName: number]: Arr[];
}
export default class Dell implements Analyze {

  // 单例模式
  private static instance: Dell
  static getInstance() {
    if (!Dell.instance) {
      Dell.instance = new Dell()
    }
    return Dell.instance
  }

  // 获取具体数据
  private getHtmlInfo(html: string) {
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')//获取到class为course-item的dom元素
    let arr: Arr[] = []
    courseItems.map((index, item) => {
      const descs = $(item).find('.course-desc')
      const img = $(item).find('.course-img').attr('src') || ''
      const title = descs.eq(0).text()
      arr.push({
        title,
        img
      })
    })
    return {
      time: new Date().getTime(),
      list: arr
    }
  }

  // 处理数据文件
  private generateJsonContent(arr: Course, filePath: string) {
    let fileContent: Content = {}
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    fileContent[arr.time] = arr.list;
    return fileContent
  }

  public analyze(html: string, filePath: string) {
    const result = this.getHtmlInfo(html)
    const fileContent = this.generateJsonContent(result, filePath)
    return JSON.stringify(fileContent)
  }

  private constructor () {

  }
}