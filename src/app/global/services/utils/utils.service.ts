import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // getyyyyMMddByDate 根据date获取格式为20190101的数值。
  getyyyyMMddByDate(date: Date): number {
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  }

  // getDateByyyyyMMdd 根据格式为20190101的数值获取Date类型数据。
  getDateByyyyyMMdd(yyyyMMdd: number): Date {
    let year = yyyyMMdd / 10000;
    let month = (yyyyMMdd % 10000) / 100 - 1;
    let day = yyyyMMdd % 100;
    return new Date(year, month, day);
  }

  // formatDateTimeByUnix 根据unix时间戳，获取格式为yyyy-MM-dd hh-mm-ss的字符串。
  formatDateTimeByUnix(unix: number): string {
    if (unix === 0) {
      return '';
    }
    let t = new Date(unix * 1000);
    return this.formatDateTimeByDate(t);
  }

  // formatDateTimeByDate 根据Date，获取格式为yyyy-MM-dd hh-mm-ss的字符串。
  formatDateTimeByDate(date: Date): string {
    let t, yyyy, mm, dd, h, m, s;
    t = date;
    yyyy = t.getFullYear();
    mm = t.getMonth()+1;
    dd = t.getDate();
    h = t.getHours();
    m = t.getMinutes();
    s = t.getSeconds();
    
    return yyyy + 
      '-' + this.prefixZero(mm, 2) + 
      '-' + this.prefixZero(dd, 2) + 
      ' ' + this.prefixZero(h, 2) + 
      ':' + this.prefixZero(m, 2) + 
      ':' + this.prefixZero(s, 2);
  }

  prefixZero(num: number, len: number) {
    return (Array(len).join('0') + num).slice(-len);
  }

  // clone 实现对传入对象的深层复制。
  clone(old: any): any {
    return JSON.parse(JSON.stringify(old));
  }

  // checkEmail 检查邮箱。
  checkEmail(email: string): boolean {
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return reg.test(email);
  }

  // checkMobile 检查手机号。
  checkMobile(mobileNo: string): boolean {
    const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
    // const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(mobileNo);
  }

  // subString 截取字符串长度，超出部分用省略号代替。
  // 只有超过最大长度时，才截取给定长度的字符串，并在后面加省略号。
  // @param str 待截取字符串；
  // @param maxLen 最大长度；
  // @param subLen 截取的长度。
  subString(str: string, maxLen: number, subLen: number): string {
    return str.length > maxLen ? str.substr(0, subLen) + '...' : str;
  }

  // formatThousandsNumStr 根据给定数值，获取每千位用,分隔的字符串。
  formatThousandsNumStr(numStr: string): string {
    let num = '', result = '';
    var temp = parseInt(numStr);
    if (temp < 0) {
      num = (-temp).toString();
    } else {
      num = temp.toString();
    }
    
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    if (temp < 0) {
      result = '-' + result;
    }
    return result;
  }

  // formatDateByUnknown 根据给定的数，计算日期（给定的可能是时间戳或其他数值）。
  formatDateByUnknown(num: number): string {
    // 简单的判断时间戳。
    if (num >= 631123200 && num <= 3786883200) {
      // 如果数值区间在时间戳范围1990-01-01 00:00:00至2090-01-01 00:00:00内，则按时间戳进行处理。
      const datetime = this.formatDateTimeByUnix(num);
      const index = datetime.indexOf(" ");
      const date = datetime.substr(0, index);
      return date;
    }

    // 其他的情况暂不处理。
    return num.toString();
  }

  // formatDateTimeByUnknown 根据给定的数，计算日期（给定的可能是时间戳或其他数值）。
  formatDateTimeByUnknown(num: number): string {
    // 简单的判断时间戳。
    if (num >= 631123200 && num <= 3786883200) {
      // 如果数值区间在时间戳范围1990-01-01 00:00:00至2090-01-01 00:00:00内，则按时间戳进行处理。
      const datetime = this.formatDateTimeByUnix(num);
      return datetime;
    }

    // 其他的情况暂不处理。
    return num.toString();
  }
  
  // setBitwise 设置位数。
  // @param baseNum: 要设置的原始值；
  // @param bitNum: 设置的位数；
  // @param flag: 将位数设置为0或者1。
  // return 设置后的值。
  setBitwise(baseNum: number, bitNum: number, flag: number): number {
    if (flag === 1) {
      return baseNum | bitNum;
    } else {
      return baseNum &~ bitNum;
    }
  }

  // replaceBitwise 按位替换。
  // @param oldNum 被替换的数值；
  // @param newNum 新的数值；
  // return 替换后的新值。
  replaceBitwise(oldNum: number, newNum: number): number {
    let newStr = newNum.toString(2);
    for (let i=0; i< newStr.length; i++) {
      let bitNum = 1 << (newStr.length - i - 1);
      oldNum = this.setBitwise(oldNum, bitNum, parseInt(newStr[i]));
    }
    return oldNum
  }

  // checkBitwise 判断位数是否为1。
  // @param baseNum: 要判断的原始值；
  // @param bitNum: 判断的位数；
  // return 位数是否为1。
  checkBitwise(baseNum: number, bitNum: number): boolean {
    return (baseNum & bitNum) === bitNum;
  }
}
