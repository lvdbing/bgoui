export class RespError {
	Code    !: number   // 错误码
	Msg     !: string   // 错误消息
	Details ?: string[] // 错误详情
}
