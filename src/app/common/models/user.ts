export class User {
	ID         !: number // ID
	CreatedAt  ?: number // 创建时间
	CreatedBy  ?: string // 创建人
	ModifiedAt ?: number // 修改时间
	ModifiedBy ?: string // 修改人
	IsDel      ?: number // 是否已删除
	DeletedAt  ?: number // 删除时间
	Username   ?: string // 用户名
	Password   ?: string // 密码
	Nickname   ?: string // 昵称
	Phone      ?: string // 电话
	Email      ?: string // 邮箱
	Status     ?: number // 状态
}

export class RegisterReq {
	Username !: string // 用户名
	Password !: string // 密码
	Phone    ?: string // 电话
}

export class LoginReq {
	Username !: string // 用户名
	Password !: string // 密码
}
