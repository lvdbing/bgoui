export class RespError {
	code    !: number   // 错误码
	msg     !: string   // 错误消息
	details ?: string[] // 错误详情
}
